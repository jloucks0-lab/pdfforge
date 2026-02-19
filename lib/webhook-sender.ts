import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface WebhookPayload {
    event: string
    data: any
    timestamp: string
}

export async function sendWebhook(userId: string, eventType: string, data: any) {
    try {
        // Get user's webhook configuration
        const { data: user } = await supabase
            .from('users')
            .select('webhook_url, webhook_enabled, webhook_secret')
            .eq('id', userId)
            .single()

        if (!user || !user.webhook_enabled || !user.webhook_url) {
            return // Webhooks not configured
        }

        const payload: WebhookPayload = {
            event: eventType,
            data,
            timestamp: new Date().toISOString()
        }

        // Create signature for webhook verification
        const signature = crypto
            .createHmac('sha256', user.webhook_secret || '')
            .update(JSON.stringify(payload))
            .digest('hex')

        // Send webhook
        const response = await fetch(user.webhook_url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Webhook-Signature': signature,
                'User-Agent': 'PdfForge-Webhooks/1.0'
            },
            body: JSON.stringify(payload),
            signal: AbortSignal.timeout(10000) // 10 second timeout
        })

        const success = response.ok
        const responseBody = await response.text().catch(() => '')

        // Log delivery attempt
        await supabase
            .from('webhook_deliveries')
            .insert({
                user_id: userId,
                event_type: eventType,
                payload,
                response_status: response.status,
                response_body: responseBody.substring(0, 500),
                success
            })

        return { success, status: response.status }
    } catch (error: any) {
        console.error('Webhook delivery error:', error)

        // Log failed attempt
        await supabase
            .from('webhook_deliveries')
            .insert({
                user_id: userId,
                event_type: eventType,
                payload: { event: eventType, data, timestamp: new Date().toISOString() },
                response_status: 0,
                response_body: error.message,
                success: false
            })

        return { success: false, error: error.message }
    }
}