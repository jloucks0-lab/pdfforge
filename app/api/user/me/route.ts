import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'
import { validateApiKey } from '@/lib/auth'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
    try {
        // Validate API key
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        // Get user data
        const { data: user } = await supabase
            .from('users')
            .select('id, email')
            .eq('id', authResult.userId)
            .single()

        // Get subscription data
        const { data: subscription } = await supabase
            .from('subscriptions')
            .select('plan, status')
            .eq('user_id', authResult.userId)
            .eq('status', 'active')
            .single()

        // Get API key
        const { data: apiKey } = await supabase
            .from('api_keys')
            .select('key, name')
            .eq('user_id', authResult.userId)
            .eq('is_active', true)
            .single()

        // Get usage this month
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count: usageCount } = await supabase
            .from('api_usage')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', authResult.userId)
            .gte('created_at', startOfMonth.toISOString())

        // Get recent activity
        const { data: recentActivity } = await supabase
            .from('api_usage')
            .select('endpoint, status, created_at')
            .eq('user_id', authResult.userId)
            .order('created_at', { ascending: false })
            .limit(10)

        // Plan limits
        const planLimits = {
            starter: 1000,
            professional: 10000,
            enterprise: 100000
        }

        const planLimit = planLimits[subscription?.plan as keyof typeof planLimits] || 1000

        return NextResponse.json({
            user: {
                email: user?.email,
                plan: subscription?.plan || 'starter',
                apiKey: apiKey?.key,
            },
            usage: {
                current: usageCount || 0,
                limit: planLimit,
                remaining: planLimit - (usageCount || 0)
            },
            recentActivity: recentActivity || []
        })
    } catch (error: any) {
        console.error('User data fetch error:', error)
        return NextResponse.json(
            { error: 'Failed to fetch user data' },
            { status: 500 }
        )
    }
}