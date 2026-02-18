import { NextRequest, NextResponse } from 'next/server'
import { stripe } from '@/lib/stripe'

const PLANS = {
    starter: {
        priceId: process.env.STRIPE_STARTER_PRICE_ID!,
        name: 'Starter Plan'
    },
    professional: {
        priceId: process.env.STRIPE_PROFESSIONAL_PRICE_ID!,
        name: 'Professional Plan'
    },
    enterprise: {
        priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID!,
        name: 'Enterprise Plan'
    }
}

export async function POST(request: NextRequest) {
    try {
        const { planId, email } = await request.json()

        if (!planId || !PLANS[planId as keyof typeof PLANS]) {
            return NextResponse.json(
                { error: 'Invalid plan ID' },
                { status: 400 }
            )
        }

        const plan = PLANS[planId as keyof typeof PLANS]

        const session = await stripe.checkout.sessions.create({
            mode: 'subscription',
            payment_method_types: ['card'],
            line_items: [
                {
                    price: plan.priceId,
                    quantity: 1,
                },
            ],
            success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?success=true`,
            cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/pricing?canceled=true`,
            customer_email: email,
            metadata: {
                plan_id: planId
            }
        })

        return NextResponse.json({ url: session.url })
    } catch (error: any) {
        console.error('Checkout error:', error)
        return NextResponse.json(
            { error: error.message },
            { status: 500 }
        )
    }
}