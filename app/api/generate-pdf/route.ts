import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { sendUsageWarningEmail } from '@/lib/email'
import { checkRateLimit } from '@/lib/rate-limiter'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
    let userId: string | undefined
    let apiKey: string | undefined

    try {
        // Validate API key
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json(
                { error: authResult.error },
                { status: authResult.status }
            )
        }

        userId = authResult.userId
        apiKey = request.headers.get('authorization')?.replace('Bearer ', '')

        // Check per-minute rate limit
        const rateLimit = checkRateLimit(userId, authResult.plan || 'starter')

        if (!rateLimit.allowed) {
            return NextResponse.json(
                {
                    error: 'Rate limit exceeded',
                    limit: rateLimit.limit,
                    resetIn: rateLimit.resetIn,
                    message: `Too many requests. Limit: ${rateLimit.limit} requests per minute. Try again in ${rateLimit.resetIn} seconds.`
                },
                {
                    status: 429,
                    headers: {
                        'X-RateLimit-Limit': rateLimit.limit.toString(),
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': rateLimit.resetIn.toString()
                    }
                }
            )
        }

        // Check usage limits
        const startOfMonth = new Date()
        startOfMonth.setDate(1)
        startOfMonth.setHours(0, 0, 0, 0)

        const { count: usageCount } = await supabase
            .from('api_usage')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .gte('created_at', startOfMonth.toISOString())

        // Plan limits
        const planLimits: Record<string, number> = {
            starter: 1000,
            professional: 10000,
            enterprise: 100000
        }

        const userPlan = authResult.plan || 'starter'
        const planLimit = planLimits[userPlan] || 1000

        if ((usageCount || 0) >= planLimit) {
            return NextResponse.json(
                {
                    error: 'Monthly limit exceeded',
                    current: usageCount,
                    limit: planLimit,
                    message: `You've reached your plan limit of ${planLimit} PDFs per month. Please upgrade your plan.`
                },
                { status: 429 }
            )
        }

        const { html, url, options } = await request.json()

        if (!html && !url) {
            return NextResponse.json(
                { error: 'Either html or url is required' },
                { status: 400 }
            )
        }

        const browser = await puppeteer.launch({
            args: ['--no-sandbox', '--disable-setuid-sandbox'],
            ignoreDefaultArgs: ['--disable-extensions'],
            headless: true,
        })

        const page = await browser.newPage()

        if (url) {
            await page.goto(url, { waitUntil: 'networkidle0' })
        } else {
            await page.setContent(html, { waitUntil: 'networkidle0' })
        }

        const pdf = await page.pdf({
            format: options?.format || 'A4',
            printBackground: options?.printBackground ?? true,
            margin: options?.margin || { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' },
        })

        await browser.close()

        // Log successful usage (status: 200 = success)
        if (userId && apiKey) {
            await supabase
                .from('api_usage')
                .insert({
                    user_id: userId,
                    api_key: apiKey,
                    endpoint: '/api/generate-pdf',
                    status: 200
                })

            // Check if user hit 90% threshold and send warning
            const newUsageCount = (usageCount || 0) + 1
            const percentage = Math.round((newUsageCount / planLimit) * 100)

            if (percentage === 90 || percentage === 95) {
                // Get user email
                const { data: user } = await supabase
                    .from('users')
                    .select('email')
                    .eq('id', userId)
                    .single()

                if (user?.email) {
                    await sendUsageWarningEmail({
                        email: user.email,
                        current: newUsageCount,
                        limit: planLimit,
                        percentage
                    })
                }
            }
        }

        return new NextResponse(Buffer.from(pdf), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="document.pdf"',
            },
        })
    } catch (error) {
        console.error('PDF generation error:', error)

        // Log failed usage (status: 500 = error)
        if (userId && apiKey) {
            await supabase
                .from('api_usage')
                .insert({
                    user_id: userId,
                    api_key: apiKey,
                    endpoint: '/api/generate-pdf',
                    status: 500
                })
        }

        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        )
    }
}