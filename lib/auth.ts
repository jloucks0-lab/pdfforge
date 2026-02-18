import { createClient } from '@supabase/supabase-js'
import { NextRequest } from 'next/server'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY! // Use service role key for server-side
)

export async function validateApiKey(request: NextRequest) {
    // Get API key from Authorization header
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            valid: false,
            error: 'Missing or invalid Authorization header',
            status: 401
        }
    }

    const apiKey = authHeader.replace('Bearer ', '')

    // Check if API key exists and is active
    const { data: keyData, error } = await supabase
        .from('api_keys')
        .select('id, user_id, is_active')
        .eq('key', apiKey)
        .single()

    if (error || !keyData) {
        return {
            valid: false,
            error: 'Invalid API key',
            status: 401
        }
    }

    if (!keyData.is_active) {
        return {
            valid: false,
            error: 'API key is disabled',
            status: 403
        }
    }

    // Update last_used_at timestamp
    await supabase
        .from('api_keys')
        .update({ last_used_at: new Date().toISOString() })
        .eq('id', keyData.id)

    // Check if user has an active subscription
    const { data: subscription } = await supabase
        .from('subscriptions')
        .select('status, plan_id')
        .eq('user_id', keyData.user_id)
        .eq('status', 'active')
        .single()

    if (!subscription) {
        return {
            valid: false,
            error: 'No active subscription found',
            status: 403
        }
    }

    return {
        valid: true,
        userId: keyData.user_id,
        planId: subscription.plan_id
    }
}