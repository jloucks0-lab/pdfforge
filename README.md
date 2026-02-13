# PdfForge - Professional PDF Generation API

**Your second SaaS product - Double your passive income**

A complete, production-ready PDF Generation API built with Next.js 14, Puppeteer, Stripe, and Supabase.

## 🎯 Project Overview

PdfForge is a micro-SaaS that converts HTML and URLs to professional PDFs via API. Built for developers and businesses who need automated document generation.

**Revenue Model:** Subscription-based (Freemium + Paid Tiers)  
**Target Market:** Developers, SaaS Companies, E-commerce, Agencies  
**Potential Revenue:** $4,000-10,000/month with 100+ customers

## ✨ Features

- **HTML to PDF:** Convert any HTML to pixel-perfect PDFs
- **URL to PDF:** Turn websites into PDFs instantly
- **Professional Templates:** Invoice, receipt, report, letter templates included
- **Custom Branding:** Headers, footers, logos, watermarks
- **Batch Generation:** Process hundreds of PDFs in parallel
- **All Paper Formats:** A4, Letter, Legal, A3
- **Full CSS Support:** Inline styles, external stylesheets
- **Usage Tracking:** Real-time API monitoring
- **Stripe Billing:** Automated subscription management

## 🏗️ Tech Stack

- **Framework:** Next.js 14 (App Router)
- **PDF Engine:** Puppeteer + Chrome
- **Templates:** Handlebars + Juice (inline CSS)
- **Database:** PostgreSQL via Supabase
- **Payments:** Stripe
- **Hosting:** Vercel

## 💰 Pricing Tiers

- **Free:** 100 PDFs/month - $0
- **Starter:** 1,000 PDFs/month - $20
- **Pro:** 5,000 PDFs/month - $50
- **Business:** 20,000 PDFs/month - $100

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- Supabase account (free)
- Stripe account (free)
- Vercel account (free)

### 1. Install Dependencies

```bash
npm install
```

### 2. Set Up Database

Use the same Supabase database as SnapAPI:
- Same tables (users, api_usage, subscriptions)
- Just tracks PDFs instead of screenshots
- No schema changes needed

### 3. Configure Environment

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key

STRIPE_SECRET_KEY=sk_test_your_key
STRIPE_WEBHOOK_SECRET=whsec_your_secret
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_your_key

NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 4. Run Development Server

```bash
npm run dev
```

## 📝 API Usage

### Basic HTML to PDF

```bash
curl -X POST "https://pdfforge.dev/api/pdf" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{"html": "<h1>Hello PDF</h1>"}' \
  -o document.pdf
```

### URL to PDF

```bash
curl "https://pdfforge.dev/api/pdf?url=https://example.com" \
  -H "X-API-Key: YOUR_API_KEY" \
  -o webpage.pdf
```

### Invoice Template

```bash
curl -X POST "https://pdfforge.dev/api/pdf" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "template": "invoice",
    "data": {
      "invoiceNumber": "INV-001",
      "companyName": "Your Company",
      "clientName": "Client Name",
      "items": [
        {
          "description": "Web Development",
          "quantity": 40,
          "rate": 150,
          "amount": 6000
        }
      ],
      "subtotal": 6000,
      "total": 6000
    }
  }' \
  -o invoice.pdf
```

### Custom Headers & Footers

```bash
curl -X POST "https://pdfforge.dev/api/pdf" \
  -H "X-API-Key: YOUR_API_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "html": "<h1>Annual Report</h1>",
    "displayHeaderFooter": true,
    "headerTemplate": "<div style=\"font-size:10px;text-align:center;width:100%;\">Company Confidential</div>",
    "footerTemplate": "<div style=\"font-size:10px;text-align:center;width:100%;\">Page <span class=\"pageNumber\"></span> of <span class=\"totalPages\"></span></div>"
  }' \
  -o report.pdf
```

## 📊 File Structure

```
pdfforge/
├── app/
│   ├── api/
│   │   └── pdf/
│   │       └── route.ts          # Main PDF API endpoint
│   ├── dashboard/                # User dashboard
│   ├── pricing/                  # Pricing page
│   ├── docs/                     # API documentation
│   ├── templates/                # Template showcase
│   ├── page.tsx                  # Landing page
│   └── layout.tsx                # Root layout
├── lib/
│   ├── pdf.ts                    # PDF generation engine
│   └── database.ts               # Database operations
├── templates/
│   ├── invoice/
│   │   └── template.html         # Invoice template
│   ├── receipt/                  # Receipt template
│   ├── report/                   # Report template
│   └── letter/                   # Letter template
├── package.json
├── next.config.js
└── README.md
```

## 🎨 Templates

### Invoice Template

Professional invoices with:
- Line items with quantities and rates
- Automatic subtotal/tax/discount calculations
- Company and client information
- Payment terms and notes
- Custom branding

### Receipt Template

Simple purchase receipts with:
- Transaction details
- Itemized purchases
- Total amount
- Merchant information

### Report Template

Data-driven reports with:
- Charts and graphs
- Tables and data visualization
- Custom layouts
- Multi-page support

### Letter Template

Professional correspondence:
- Letterhead support
- Signatures
- Formal formatting

## 💡 Use Cases

### 1. Automated Invoicing
Generate invoices for your SaaS customers automatically. Send via email or allow download.

```javascript
const invoice = await fetch('https://pdfforge.dev/api/pdf', {
  method: 'POST',
  headers: {
    'X-API-Key': process.env.PDFFORGE_API_KEY,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    template: 'invoice',
    data: {
      invoiceNumber: `INV-${orderId}`,
      items: orderItems,
      total: orderTotal
    }
  })
});
```

### 2. E-commerce Receipts
Send purchase receipts instantly after checkout.

### 3. Dynamic Reports
Generate reports from your database data. Perfect for dashboards and analytics.

### 4. Contract Generation
Create NDAs, service agreements, and contracts from templates.

## 📈 Revenue Strategy

**Conversion Funnel:**
1. Free tier → 5% convert to paid
2. Starter → 30% upgrade to Pro
3. Pro → 20% upgrade to Business

**Monthly Revenue Projection:**
- 500 free users → 25 Starter ($500)
- 25 Starter → 8 Pro ($400)
- 50 Pro directly ($2,500)
- 10 Business directly ($1,000)
- **Total: $4,400/month**

## 🚀 Launch Strategy

### Week 1: Build & Deploy
- ✅ Complete development
- Deploy to Vercel
- Set up Stripe products
- Create documentation

### Week 2: Soft Launch
- Product Hunt launch
- Share on Twitter/X
- Post on Reddit (r/SideProject)
- Reach out to dev communities

### Month 2: Content Marketing
- Write "How to Generate PDFs" tutorial
- Create integration guides
- SEO optimization
- Developer outreach

### Month 3+: Growth
- Partner with no-code tools (Zapier, Make)
- Sponsored newsletter ads
- Case studies from customers
- Referral program

## 🎯 Marketing Channels

**Free:**
- Product Hunt
- Hacker News
- Reddit (r/webdev, r/SideProject)
- Twitter/X dev community
- Dev.to articles
- GitHub repos with examples

**Paid (once profitable):**
- Google Ads ("PDF API", "HTML to PDF")
- Sponsored dev newsletters
- Conference sponsorships

## 🔗 Integration Examples

### Zapier Integration
Users can create Zaps to generate PDFs from:
- Google Sheets rows
- Airtable records
- Form submissions
- CRM contacts

### Make.com Integration
Visual automation for generating:
- Monthly invoices
- Weekly reports
- Batch documents

## 💻 Advanced Features (Future)

**v2.0 Roadmap:**
- PDF merging/splitting
- Digital signatures
- Form filling
- OCR text extraction
- Watermark templates
- Webhook callbacks
- S3/Cloud storage integration

## 🔐 Security

- API keys encrypted at rest
- Rate limiting per key
- Webhook signature verification
- No PDF storage (generated on-demand)
- SOC 2 compliance ready

## 📦 Deploy to Production

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables
vercel env add NEXT_PUBLIC_SUPABASE_URL
vercel env add STRIPE_SECRET_KEY
# ... add all env vars

# Deploy production
vercel --prod
```

## 🎉 Dual SaaS Strategy

**Run Both Products:**
- SnapAPI (Screenshots) + PdfForge (PDFs)
- Share the same database and infrastructure
- Cross-promote to customers
- Bundle pricing available
- 2x revenue potential: $8,000-20,000/month

**Shared Costs:**
- One Supabase database
- One Stripe account
- One marketing effort
- Doubled output

## 🆘 Support

- Documentation: https://pdfforge.dev/docs
- Email: support@pdfforge.dev
- Twitter: @pdfforge

## 📄 License

MIT License - Use this code to build your SaaS empire!

---

**Built by:** Josh's Web Services  
**Related Projects:** SnapAPI (Screenshot API)  

**Ready to double your SaaS revenue?** Launch PdfForge today! 🚀
