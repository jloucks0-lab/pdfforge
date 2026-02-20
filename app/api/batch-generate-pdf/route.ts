import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'
import { checkRateLimit } from '@/lib/rate-limiter'
import { logRequest } from '@/lib/request-logger'
import JSZip from 'jszip'

const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
)

interface BatchItem {
    html?: string
    url?: string
    options?: any
    filename?: string
}

const PLAN_LIMITS = {
    starter: 1000,
    professional: 10000,
    enterprise: 100000
}

export async function POST(request: NextRequest) {
    const startTime = Date.now()
    let userId: string | undefined
    let apiKey: string | undefined

    try {
        // Validate API key
        const authResult = await validateApiKey(request)

        if (!authResult.valid) {
            return NextResponse.json({ error: authResult.error || 'Invalid API key' }, { status: authResult.status || 401 })
        }

        userId = authResult.userId!
        apiKey = request.headers.get('authorization')?.replace('Bearer ', '') || ''

        // Check rate limit
        const rateLimit = checkRateLimit(userId, authResult.plan || 'starter')
        if (!rateLimit.allowed) {
            await logRequest({
                userId,
                apiKey,
                endpoint: '/api/batch-generate-pdf',
                method: 'POST',
                statusCode: 429,
                responseTimeMs: Date.now() - startTime,
                errorMessage: 'Rate limit exceeded',
                ipAddress: request.headers.get('x-forwarded-for') || undefined,
                userAgent: request.headers.get('user-agent') || undefined
            })

            return NextResponse.json(
                {
                    error: 'Rate limit exceeded',
                    limit: rateLimit.limit,
                    resetIn: rateLimit.resetIn
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

        const { batch } = await request.json()

        if (!batch || !Array.isArray(batch) || batch.length === 0) {
            return NextResponse.json({ error: 'batch array is required and must not be empty' }, { status: 400 })
        }

        if (batch.length > 100) {
            return NextResponse.json({ error: 'Maximum 100 PDFs per batch request' }, { status: 400 })
        }

        // Check monthly usage limit
        const planLimit = PLAN_LIMITS[authResult.plan as keyof typeof PLAN_LIMITS] || 1000

        const { count: usageCount } = await supabase
            .from('api_usage')
            .select('*', { count: 'exact', head: true })
            .eq('user_id', userId)
            .gte('created_at', new Date(new Date().setDate(1)).toISOString())

        const newUsage = (usageCount || 0) + batch.length

        if (newUsage > planLimit) {
            await logRequest({
                userId,
                apiKey,
                endpoint: '/api/batch-generate-pdf',
                method: 'POST',
                statusCode: 429,
                responseTimeMs: Date.now() - startTime,
                errorMessage: 'Monthly limit exceeded',
                requestParams: { batchSize: batch.length },
                ipAddress: request.headers.get('x-forwarded-for') || undefined,
                userAgent: request.headers.get('user-agent') || undefined
            })

            return NextResponse.json(
                {
                    error: 'Monthly limit exceeded',
                    current: usageCount || 0,
                    limit: planLimit,
                    requested: batch.length,
                    message: `You've reached your plan limit. Current usage: ${usageCount}/${planLimit}. Requested: ${batch.length} PDFs.`
                },
                { status: 429 }
            )
        }

        // Launch browser
        const browser = await puppeteer.launch({
            headless: true,
            args: [
                '--no-sandbox',
                '--disable-setuid-sandbox',
                '--disable-dev-shm-usage',
                '--disable-gpu'
            ]
        })

        const results: Array<{ filename: string; pdf: Buffer; success: boolean; error?: string }> = []

        // Generate each PDF
        for (let i = 0; i < batch.length; i++) {
            const item: BatchItem = batch[i]
            const filename = item.filename || `document_${i + 1}.pdf`

            try {
                const page = await browser.newPage()

                if (item.html) {
                    await page.setContent(item.html, { waitUntil: 'networkidle0' })
                } else if (item.url) {
                    await page.goto(item.url, { waitUntil: 'networkidle0' })
                } else {
                    results.push({
                        filename,
                        pdf: Buffer.from(''),
                        success: false,
                        error: 'Either html or url is required'
                    })
                    await page.close()
                    continue
                }

                const pdfBuffer = await page.pdf({
                    format: item.options?.format || 'A4',
                    printBackground: item.options?.printBackground !== false,
                    landscape: item.options?.landscape || false,
                    margin: item.options?.margin || { top: '1cm', right: '1cm', bottom: '1cm', left: '1cm' }
                })

                results.push({
                    filename,
                    pdf: Buffer.from(pdfBuffer),
                    success: true
                })

                await page.close()

                // Log successful generation
                await supabase
                    .from('api_usage')
                    .insert({
                        user_id: userId,
                        api_key: apiKey,
                        endpoint: '/api/batch-generate-pdf',
                        status: 200
                    })

            } catch (error: any) {
                results.push({
                    filename,
                    pdf: Buffer.from(''),
                    success: false,
                    error: error.message
                })

                // Log failed generation
                await supabase
                    .from('api_usage')
                    .insert({
                        user_id: userId,
                        api_key: apiKey,
                        endpoint: '/api/batch-generate-pdf',
                        status: 500
                    })
            }
        }

        await browser.close()

        // Create ZIP file with all PDFs
        const zip = new JSZip()

        results.forEach(result => {
            if (result.success) {
                zip.file(result.filename, result.pdf)
            }
        })

        const zipBuffer = await zip.generateAsync({ type: 'nodebuffer' })

        // Log request
        await logRequest({
            userId,
            apiKey,
            endpoint: '/api/batch-generate-pdf',
            method: 'POST',
            statusCode: 200,
            responseTimeMs: Date.now() - startTime,
            requestParams: { batchSize: batch.length },
            ipAddress: request.headers.get('x-forwarded-for') || undefined,
            userAgent: request.headers.get('user-agent') || undefined
        })

        const successCount = results.filter(r => r.success).length
        const failureCount = results.filter(r => !r.success).length

        return new NextResponse(zipBuffer, {
            headers: {
                'Content-Type': 'application/zip',
                'Content-Disposition': 'attachment; filename="pdfs.zip"',
                'X-Batch-Total': batch.length.toString(),
                'X-Batch-Success': successCount.toString(),
                'X-Batch-Failed': failureCount.toString()
            }
        })

    } catch (error: any) {
        console.error('Batch PDF generation error:', error)

        if (userId && apiKey) {
            await logRequest({
                userId,
                apiKey,
                endpoint: '/api/batch-generate-pdf',
                method: 'POST',
                statusCode: 500,
                responseTimeMs: Date.now() - startTime,
                errorMessage: error.message,
                ipAddress: request.headers.get('x-forwarded-for') || undefined,
                userAgent: request.headers.get('user-agent') || undefined
            })
        }

        return NextResponse.json(
            { error: 'Failed to generate PDFs', message: error.message },
            { status: 500 }
        )
    }
}