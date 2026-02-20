import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

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

        const { searchParams } = new URL(request.url)
        const limit = parseInt(searchParams.get('limit') || '50')
        const offset = parseInt(searchParams.get('offset') || '0')
        const status = searchParams.get('status') // 'success', 'error', or null for all

        // Plan-based log retention
        const logRetentionDays: Record<string, number> = {
            starter: 7,
            professional: 30,
            enterprise: 90
        }

        const retentionDays = logRetentionDays[authResult.plan || 'starter'] || 7
        const cutoffDate = new Date()
        cutoffDate.setDate(cutoffDate.getDate() - retentionDays)

        let query = supabase
            .from('request_logs')
            .select('*', { count: 'exact' })
            .eq('user_id', authResult.userId)
            .gte('created_at', cutoffDate.toISOString())
            .order('created_at', { ascending: false })
            .range(offset, offset + limit - 1)

        if (status === 'success') {
            query = query.gte('status_code', 200).lt('status_code', 300)
        } else if (status === 'error') {
            query = query.or('status_code.gte.400,status_code.lt.200')
        }

        const { data: logs, error, count } = await query

        if (error) {
            console.error('Error fetching request logs:', error)
            return NextResponse.json({ error: 'Failed to fetch logs' }, { status: 500 })
        }

        return NextResponse.json({
            logs,
            total: count,
            limit,
            offset
        })
    } catch (error) {
        console.error('Error in request logs:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}