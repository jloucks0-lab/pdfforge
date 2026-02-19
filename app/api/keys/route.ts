import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
    try {
        const authHeader = request.headers.get('authorization')
        if (!authHeader) {
            return NextResponse.json({ error: 'Missing authorization header' }, { status: 401 })
        }

        const apiKey = authHeader.replace('Bearer ', '')
        const authResult = await validateApiKey(apiKey)

        if (!authResult.valid) {
            return NextResponse.json({ error: 'Invalid API key' }, { status: 401 })
        }

        // Get all API keys for this user
        const { data: keys, error } = await supabase
            .from('api_keys')
            .select('id, name, key, is_active, created_at, last_used_at')
            .eq('user_id', authResult.userId)
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching API keys:', error)
            return NextResponse.json({ error: 'Failed to fetch API keys' }, { status: 500 })
        }

        // Mask API keys (show only first 8 and last 4 characters)
        const maskedKeys = keys.map(key => ({
            ...key,
            key: `${key.key.slice(0, 8)}...${key.key.slice(-4)}`
        }))

        return NextResponse.json({ keys: maskedKeys })
    } catch (error) {
        console.error('Error in list API keys:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}