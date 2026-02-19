import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'
import { createClient } from '@supabase/supabase-js'
import Stripe from 'stripe'
import { sendWelcomeEmail, sendPaymentFailedEmail } from '@/lib/email'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!

export async function POST(request: NextRequest) {
    const body = await request.text()
    const signature = request.headers.get('stripe-signature')!

    let event: Stripe.Event

    try {
        event = stripe.webhooks.constructEvent(body, signature, webhookSecret)
    } catch (err: any) {
        console.error('Webhook signature verification failed:', err.message)
        return NextResponse.json({ error: 'Invalid signature' }, { status: 400 })
    }

    try {
        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session

                // Create user if doesn't exist
                const email = session.customer_email || session.customer_details?.email
                if (!email) break

                let userId: string

                // Check if user exists
                const { data: existingUser } = await supabase
                    .from('users')
                    .select('id')
                    .eq('email', email)
                    .single()

                if (existingUser) {
                    userId = existingUser.id
                } else {
                    // Create new user
                    const { data: newUser, error } = await supabase
                        .from('users')
                        .insert({
                            email,
                            stripe_customer_id: session.customer as string
                        })
                        .select('id')
                        .single()

                    if (error || !newUser) {
                        console.error('Failed to create user:', error)
                        break
                    }
                    userId = newUser.id
                }

                // Create subscription
                const planId = session.metadata?.plan_id || 'starter'

                await supabase
                    .from('subscriptions')
                    .insert({
                        user_id: userId,
                        plan: planId,
                        status: 'active',
                        stripe_subscription_id: session.subscription as string,
                        stripe_customer_id: session.customer as string,
                        current_period_start: new Date(),
                        current_period_end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000) // 30 days
                    })

                // Generate API key
                const apiKey = 'pk_live_' + require('crypto').randomBytes(32).toString('hex')

                await supabase
                    .from('api_keys')
                    .insert({
                        user_id: userId,
                        key: apiKey,
                        name: 'Production API Key',
                        is_active: true
                    })

                // Send welcome email
                await sendWelcomeEmail({
                    email,
                    apiKey,
                    plan: planId
                })

                console.log(`Subscription created for user ${userId}`)
                break
            }

            case 'customer.subscription.updated': {
                const subscription = event.data.object as Stripe.Subscription

                await supabase
                    .from('subscriptions')
                    .update({
                        status: subscription.status,
                        current_period_start: new Date(subscription.current_period_start * 1000),
                        current_period_end: new Date(subscription.current_period_end * 1000)
                    })
                    .eq('stripe_subscription_id', subscription.id)

                console.log(`Subscription updated: ${subscription.id}`)
                break
            }

            case 'customer.subscription.deleted': {
                const subscription = event.data.object as Stripe.Subscription

                await supabase
                    .from('subscriptions')
                    .update({ status: 'cancelled' })
                    .eq('stripe_subscription_id', subscription.id)

                console.log(`Subscription cancelled: ${subscription.id}`)
                break
            }

            case 'invoice.payment_failed': {
                const invoice = event.data.object as Stripe.Invoice

                // Get user from customer ID
                const { data: user } = await supabase
                    .from('users')
                    .select('email')
                    .eq('stripe_customer_id', invoice.customer as string)
                    .single()

                if (user?.email) {
                    // Get subscription to find plan
                    const { data: subscription } = await supabase
                        .from('subscriptions')
                        .select('plan')
                        .eq('stripe_customer_id', invoice.customer as string)
                        .single()

                    await sendPaymentFailedEmail({
                        email: user.email,
                        plan: subscription?.plan || 'starter'
                    })
                }

                console.log(`Payment failed for invoice: ${invoice.id}`)
                break
            }

            default:
                console.log(`Unhandled event type: ${event.type}`)
        }

        return NextResponse.json({ received: true })
    } catch (err: any) {
        console.error('Webhook processing error:', err)
        return NextResponse.json({ error: 'Webhook processing failed' }, { status: 500 })
    }
}