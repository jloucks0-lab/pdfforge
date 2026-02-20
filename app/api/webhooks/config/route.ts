import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
    try {
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json({ error: authResult.error || 'Invalid API key' }, { status: authResult.status || 401 })
        }

        const { data: user } = await supabase
            .from('users')
            .select('webhook_url, webhook_enabled, webhook_secret')
            .eq('id', authResult.userId)
            .single()

        return NextResponse.json({
            webhook_url: user?.webhook_url || null,
            webhook_enabled: user?.webhook_enabled || false,
            webhook_secret: user?.webhook_secret || null
        })
    } catch (error) {
        console.error('Error fetching webhook config:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function POST(request: NextRequest) {
    try {
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json({ error: authResult.error || 'Invalid API key' }, { status: authResult.status || 401 })
        }

        // Check if plan supports webhooks (Professional and Enterprise only)
        const plan = authResult.plan || 'starter'
        if (plan === 'starter') {
            return NextResponse.json({
                error: 'Webhooks are not available on the Starter plan',
                message: 'Please upgrade to Professional or Enterprise to use webhooks'
            }, { status: 403 })
        }

        const { webhook_url, webhook_enabled } = await request.json()

        // Validate webhook URL
        if (webhook_url) {
            try {
                const url = new URL(webhook_url)
                if (url.protocol !== 'https:') {
                    return NextResponse.json({ error: 'Webhook URL must use HTTPS' }, { status: 400 })
                }
            } catch {
                return NextResponse.json({ error: 'Invalid webhook URL' }, { status: 400 })
            }
        }

        // Generate webhook secret if enabling for first time
        let webhookSecret = null
        if (webhook_enabled && webhook_url) {
            const { data: existingUser } = await supabase
                .from('users')
                .select('webhook_secret')
                .eq('id', authResult.userId)
                .single()

            webhookSecret = existingUser?.webhook_secret || crypto.randomBytes(32).toString('hex')
        }

        const updates: any = {}
        if (webhook_url !== undefined) updates.webhook_url = webhook_url
        if (webhook_enabled !== undefined) updates.webhook_enabled = webhook_enabled
        if (webhookSecret) updates.webhook_secret = webhookSecret

        const { error } = await supabase
            .from('users')
            .update(updates)
            .eq('id', authResult.userId)

        if (error) {
            console.error('Error updating webhook config:', error)
            return NextResponse.json({ error: 'Failed to update webhook configuration' }, { status: 500 })
        }

        return NextResponse.json({
            message: 'Webhook configuration updated',
            webhook_secret: webhookSecret || undefined
        })
    } catch (error) {
        console.error('Error updating webhook config:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function DELETE(request: NextRequest) {
    try {
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json({ error: authResult.error || 'Invalid API key' }, { status: authResult.status || 401 })
        }

        const { error } = await supabase
            .from('users')
            .update({
                webhook_url: null,
                webhook_enabled: false,
                webhook_secret: null
            })
            .eq('id', authResult.userId)

        if (error) {
            console.error('Error deleting webhook config:', error)
            return NextResponse.json({ error: 'Failed to delete webhook configuration' }, { status: 500 })
        }

        return NextResponse.json({ message: 'Webhook configuration deleted' })
    } catch (error) {
        console.error('Error deleting webhook config:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}