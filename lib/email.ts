import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY!)

interface WelcomeEmailData {
    email: string
    apiKey: string
    plan: string
}

interface UsageWarningData {
    email: string
    current: number
    limit: number
    percentage: number
}

interface PaymentFailedData {
    email: string
    plan: string
}

export async function sendWelcomeEmail(data: WelcomeEmailData) {
    try {
        const { email, apiKey, plan } = data

        const planDetails = {
            starter: { name: 'Starter', limit: '1,000', price: '$19' },
            professional: { name: 'Professional', limit: '10,000', price: '$49' },
            enterprise: { name: 'Enterprise', limit: '100,000', price: '$100' }
        }

        const planInfo = planDetails[plan as keyof typeof planDetails] || planDetails.starter

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: email,
            subject: 'Welcome to PdfForge! 🚀',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #2563eb 0%, #1e40af 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">Welcome to PdfForge!</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hi there! 👋</p>
            
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px;">
              Thank you for subscribing to the <strong>${planInfo.name} Plan</strong>! You're all set to start generating professional PDFs.
            </p>

            <div style="background: #f9fafb; border-left: 4px solid #2563eb; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
              <h3 style="margin: 0 0 10px 0; color: #111827; font-size: 18px;">Your Plan Details</h3>
              <ul style="margin: 0; padding-left: 20px; color: #4b5563;">
                <li><strong>Plan:</strong> ${planInfo.name}</li>
                <li><strong>Price:</strong> ${planInfo.price}/month</li>
                <li><strong>Monthly Limit:</strong> ${planInfo.limit} PDFs</li>
              </ul>
            </div>

            <div style="background: #eff6ff; border: 1px solid #bfdbfe; padding: 20px; margin-bottom: 30px; border-radius: 8px;">
              <h3 style="margin: 0 0 15px 0; color: #1e40af; font-size: 18px;">🔑 Your API Key</h3>
              <div style="background: white; padding: 15px; border-radius: 4px; font-family: monospace; font-size: 14px; word-break: break-all; color: #1f2937;">
                ${apiKey}
              </div>
              <p style="margin: 15px 0 0 0; font-size: 14px; color: #4b5563;">
                ⚠️ <strong>Keep this secure!</strong> Never share your API key publicly.
              </p>
            </div>

            <h3 style="color: #111827; margin-bottom: 15px;">Quick Start Guide</h3>
            <ol style="color: #4b5563; padding-left: 20px; margin-bottom: 30px;">
              <li style="margin-bottom: 10px;">Copy your API key above</li>
              <li style="margin-bottom: 10px;">Check out our <a href="https://pdfforge-production.up.railway.app/docs" style="color: #2563eb; text-decoration: none;">API documentation</a></li>
              <li style="margin-bottom: 10px;">Make your first API call</li>
              <li>Monitor your usage in the <a href="https://pdfforge-production.up.railway.app/dashboard?key=${apiKey}" style="color: #2563eb; text-decoration: none;">dashboard</a></li>
            </ol>

            <div style="text-align: center; margin-top: 40px;">
              <a href="https://pdfforge-production.up.railway.app/docs" style="display: inline-block; background: #2563eb; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                View Documentation
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">

            <p style="font-size: 14px; color: #6b7280; margin: 0;">
              Need help? Reply to this email or check out our <a href="https://pdfforge-production.up.railway.app/docs" style="color: #2563eb;">documentation</a>.
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© 2026 PdfForge. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
        })

        console.log(`Welcome email sent to ${email}`)
        return { success: true }
    } catch (error) {
        console.error('Failed to send welcome email:', error)
        return { success: false, error }
    }
}

export async function sendUsageWarningEmail(data: UsageWarningData) {
    try {
        const { email, current, limit, percentage } = data

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: email,
            subject: `⚠️ You've used ${percentage}% of your monthly PDF limit`,
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">⚠️ Usage Alert</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hi there,</p>
            
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px;">
              You've used <strong>${current.toLocaleString()}</strong> out of <strong>${limit.toLocaleString()}</strong> PDFs this month (${percentage}%).
            </p>

            <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
              <p style="margin: 0; color: #92400e; font-size: 16px;">
                <strong>What happens when you reach your limit?</strong><br>
                API requests will return a 429 error and PDF generation will stop until your monthly limit resets or you upgrade your plan.
              </p>
            </div>

            <h3 style="color: #111827; margin-bottom: 15px;">Options to continue:</h3>
            <ul style="color: #4b5563; padding-left: 20px; margin-bottom: 30px;">
              <li style="margin-bottom: 10px;"><strong>Upgrade your plan</strong> - Get more PDFs per month</li>
              <li style="margin-bottom: 10px;"><strong>Wait for reset</strong> - Your limit resets on the 1st of next month</li>
              <li>Monitor usage in real-time from your dashboard</li>
            </ul>

            <div style="text-align: center; margin-top: 40px;">
              <a href="https://pdfforge-production.up.railway.app/pricing" style="display: inline-block; background: #2563eb; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; margin-right: 10px;">
                Upgrade Plan
              </a>
              <a href="https://pdfforge-production.up.railway.app/dashboard" style="display: inline-block; background: white; color: #2563eb; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px; border: 2px solid #2563eb;">
                View Dashboard
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">

            <p style="font-size: 14px; color: #6b7280; margin: 0;">
              Questions? Reply to this email and we'll help you out.
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© 2026 PdfForge. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
        })

        console.log(`Usage warning email sent to ${email}`)
        return { success: true }
    } catch (error) {
        console.error('Failed to send usage warning email:', error)
        return { success: false, error }
    }
}

export async function sendPaymentFailedEmail(data: PaymentFailedData) {
    try {
        const { email, plan } = data

        await resend.emails.send({
            from: process.env.RESEND_FROM_EMAIL!,
            to: email,
            subject: '⚠️ Payment Failed - Update your payment method',
            html: `
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #dc2626 0%, #991b1b 100%); padding: 40px 20px; text-align: center; border-radius: 8px 8px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 32px;">⚠️ Payment Failed</h1>
          </div>
          
          <div style="background: white; padding: 40px 30px; border: 1px solid #e5e7eb; border-top: none; border-radius: 0 0 8px 8px;">
            <p style="font-size: 18px; color: #111827; margin-bottom: 20px;">Hi there,</p>
            
            <p style="font-size: 16px; color: #4b5563; margin-bottom: 30px;">
              We were unable to process your payment for the <strong>${plan}</strong> plan.
            </p>

            <div style="background: #fee2e2; border-left: 4px solid #dc2626; padding: 20px; margin-bottom: 30px; border-radius: 4px;">
              <p style="margin: 0; color: #7f1d1d; font-size: 16px;">
                <strong>Action Required:</strong><br>
                Your subscription will be cancelled if payment is not received within 3 days. Update your payment method to continue using PdfForge.
              </p>
            </div>

            <h3 style="color: #111827; margin-bottom: 15px;">What you need to do:</h3>
            <ol style="color: #4b5563; padding-left: 20px; margin-bottom: 30px;">
              <li style="margin-bottom: 10px;">Check your card details in your payment provider</li>
              <li style="margin-bottom: 10px;">Ensure you have sufficient funds</li>
              <li>Update your payment method if needed</li>
            </ol>

            <div style="text-align: center; margin-top: 40px;">
              <a href="https://pdfforge-production.up.railway.app/dashboard" style="display: inline-block; background: #dc2626; color: white; padding: 14px 30px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
                Update Payment Method
              </a>
            </div>

            <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 40px 0;">

            <p style="font-size: 14px; color: #6b7280; margin: 0;">
              Need help? Reply to this email or contact support.
            </p>
          </div>

          <div style="text-align: center; padding: 20px; color: #9ca3af; font-size: 12px;">
            <p style="margin: 0;">© 2026 PdfForge. All rights reserved.</p>
          </div>
        </body>
        </html>
      `
        })

        console.log(`Payment failed email sent to ${email}`)
        return { success: true }
    } catch (error) {
        console.error('Failed to send payment failed email:', error)
        return { success: false, error }
    }
}