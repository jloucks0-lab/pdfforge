import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'
import { validateApiKey } from '@/lib/auth'
import { createClient } from '@supabase/supabase-js'

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