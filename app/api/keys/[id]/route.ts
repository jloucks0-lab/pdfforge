import { NextRequest, NextResponse } from 'next/server'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id: keyId } = await params

        // Check if key belongs to user
        const { data: keyData } = await supabase
            .from('api_keys')
            .select('user_id')
            .eq('id', keyId)
            .single()

        if (!keyData || keyData.user_id !== authResult.userId) {
            return NextResponse.json({ error: 'API key not found or unauthorized' }, { status: 404 })
        }

        // Check if user has at least one other active key
        const { data: activeKeys } = await supabase
            .from('api_keys')
            .select('id')
            .eq('user_id', authResult.userId)
            .eq('is_active', true)

        if (activeKeys && activeKeys.length <= 1) {
            return NextResponse.json({
                error: 'Cannot delete your only active API key. Create a new key first.'
            }, { status: 400 })
        }

        // Delete the key
        const { error } = await supabase
            .from('api_keys')
            .delete()
            .eq('id', keyId)

        if (error) {
            console.error('Error deleting API key:', error)
            return NextResponse.json({ error: 'Failed to delete API key' }, { status: 500 })
        }

        return NextResponse.json({ message: 'API key deleted successfully' })
    } catch (error) {
        console.error('Error in delete API key:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
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

        const { id: keyId } = await params
        const { name, is_active } = await request.json()

        // Check if key belongs to user
        const { data: keyData } = await supabase
            .from('api_keys')
            .select('user_id, is_active')
            .eq('id', keyId)
            .single()

        if (!keyData || keyData.user_id !== authResult.userId) {
            return NextResponse.json({ error: 'API key not found or unauthorized' }, { status: 404 })
        }

        // If deactivating, ensure at least one other key remains active
        if (is_active === false && keyData.is_active === true) {
            const { data: activeKeys } = await supabase
                .from('api_keys')
                .select('id')
                .eq('user_id', authResult.userId)
                .eq('is_active', true)

            if (activeKeys && activeKeys.length <= 1) {
                return NextResponse.json({
                    error: 'Cannot deactivate your only active API key'
                }, { status: 400 })
            }
        }

        const updates: any = {}
        if (name !== undefined) updates.name = name
        if (is_active !== undefined) updates.is_active = is_active

        const { error } = await supabase
            .from('api_keys')
            .update(updates)
            .eq('id', keyId)

        if (error) {
            console.error('Error updating API key:', error)
            return NextResponse.json({ error: 'Failed to update API key' }, { status: 500 })
        }

        return NextResponse.json({ message: 'API key updated successfully' })
    } catch (error) {
        console.error('Error in update API key:', error)
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
    }
}