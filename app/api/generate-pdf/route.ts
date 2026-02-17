import { NextRequest, NextResponse } from 'next/server'
import puppeteer from 'puppeteer'

export async function POST(request: NextRequest) {
    try {
        const { html, url, options } = await request.json()

        if (!html && !url) {
            return NextResponse.json(
                { error: 'Either html or url is required' },
                { status: 400 }
            )
        }

        // Set LD_LIBRARY_PATH to avoid missing library errors
        const executablePath = await chromium.executablePath()
        process.env.LD_LIBRARY_PATH = executablePath.substring(0, executablePath.lastIndexOf('/'))

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

        return new NextResponse(Buffer.from(pdf), {
            headers: {
                'Content-Type': 'application/pdf',
                'Content-Disposition': 'attachment; filename="document.pdf"',
            },
        })
    } catch (error) {
        console.error('PDF generation error:', error)
        return NextResponse.json(
            { error: 'Failed to generate PDF' },
            { status: 500 }
        )
    }
}