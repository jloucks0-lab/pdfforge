import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import crypto from 'crypto'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
    try {
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json({ error: authResult.error || 'Invalid API key' }, { status: authResult.status || 401 })
        }

        const { name } = await request.json()

        if (!name || name.trim().length === 0) {
            return NextResponse.json({ error: 'API key name is required' }, { status: 400 })
        }

        // Plan-based API key limits
        const keyLimits: Record<string, number> = {
            starter: 1,
            professional: 5,
            enterprise: 10
        }

        const maxKeys = keyLimits[authResult.plan || 'starter'] || 1

        // Check if user already has max keys for their plan
        const { count } = await supabase
            .from('api_keys')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', authResult.userId)

        if (count && count >= maxKeys) {
            return NextResponse.json({
                error: `Maximum API keys reached for your plan (${maxKeys} ${maxKeys === 1 ? 'key' : 'keys'})`,
                limit: maxKeys,
                current: count
            }, { status: 400 })
        }

        // Generate new API key
        const newKey = 'pk_live_' + crypto.randomBytes(32).toString('hex')

        const { data, error } = await supabase
            .from('api_keys')
            .insert({
                user_id: authResult.userId,
                key: newKey,
                name: name.trim(),
                is_active: true
            })
            .select()
            .single()

        if (error) {
            console.error('Error creating API key:', error)
            return NextResponse.json({ error: 'Failed to create API key' }, { status: 500 })
        }

        return NextResponse.json({
            message: 'API key created successfully',
            key: data
        })
    } catch (error) {
        console.error('Error in create API key:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}