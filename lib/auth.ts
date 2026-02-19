import { NextRequest } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function validateApiKey(request: NextRequest) {
    const authHeader = request.headers.get('authorization')

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return {
            valid: false,
            error: 'Missing or invalid Authorization header',
            status: 401
        }
    }

    const apiKey = authHeader.replace('Bearer ', '')

    try {
        // Verify API key exists and is active
        const { data: keyData, error: keyError } = await supabase
            .from('api_keys')
            .select('user_id, is_active')
            .eq('key', apiKey)
            .single()

        if (keyError || !keyData || !keyData.is_active) {
            return {
                valid: false,
                error: 'Invalid or inactive API key',
                status: 401
            }
        }

        // Update last_used_at
        await supabase
            .from('api_keys')
            .update({ last_used_at: new Date().toISOString() })
            .eq('key', apiKey)

        // Check if user has active subscription
        const { data: subscription, error: subError } = await supabase
            .from('subscriptions')
            .select('plan, status')
            .eq('user_id', keyData.user_id)
            .eq('status', 'active')
            .single()

        if (subError || !subscription) {
            return {
                valid: false,
                error: 'No active subscription found',
                status: 403
            }
        }

        return {
            valid: true,
            userId: keyData.user_id,
            plan: subscription.plan
        }
    } catch (error) {
        console.error('API key validation error:', error)
        return {
            valid: false,
            error: 'Internal server error',
            status: 500
        }
    }
}