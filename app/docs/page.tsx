'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function Docs() {
  const [activeSection, setActiveSection] = useState<string>('introduction')

  const scrollToSection = (id: string) => {
    setActiveSection(id)
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const navigationItems = [
    { id: 'introduction', label: 'Introduction', icon: '📖' },
    { id: 'authentication', label: 'Authentication', icon: '🔐' },
    { id: 'quick-start', label: 'Quick Start', icon: '⚡' },
    { id: 'rate-limits', label: 'Rate Limits', icon: '🚦' },
    { id: 'api-keys', label: 'API Key Management', icon: '🔑' },
    { id: 'endpoints', label: 'API Endpoints', icon: '🔌' },
    { id: 'batch-generation', label: 'Batch Generation', icon: '📦' },
    { id: 'webhooks', label: 'Webhooks', icon: '🔗' },
    { id: 'request-logs', label: 'Request Logs', icon: '📝' },
    { id: 'examples', label: 'Code Examples', icon: '💻' },
    { id: 'errors', label: 'Error Handling', icon: '⚠️' },
    { id: 'plans', label: 'Plan Comparison', icon: '📊' },
    { id: 'faq', label: 'FAQ', icon: '❓' },
    { id: 'support', label: 'Support', icon: '💬' }
  ]

  const codeExamples = {
    curl: `curl -X POST https://pdfforge-production.up.railway.app/api/generate-pdf \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<h1>Hello World</h1><p>This is a PDF</p>",
    "options": {
      "format": "A4",
      "printBackground": true,
      "margin": {
        "top": "1cm",
        "right": "1cm",
        "bottom": "1cm",
        "left": "1cm"
      }
    }
  }' \\
  -o document.pdf`,
    javascript: `const response = await fetch('https://pdfforge-production.up.railway.app/api/generate-pdf', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    html: '<h1>Hello World</h1><p>This is a PDF</p>',
    options: {
      format: 'A4',
      printBackground: true,
      margin: {
        top: '1cm',
        right: '1cm',
        bottom: '1cm',
        left: '1cm'
      }
    }
  })
});

const blob = await response.blob();
const url = URL.createObjectURL(blob);
const a = document.createElement('a');
a.href = url;
a.download = 'document.pdf';
a.click();`,
    python: `import requests

url = 'https://pdfforge-production.up.railway.app/api/generate-pdf'
headers = {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
}
data = {
    'html': '<h1>Hello World</h1><p>This is a PDF</p>',
    'options': {
        'format': 'A4',
        'printBackground': True,
        'margin': {
            'top': '1cm',
            'right': '1cm',
            'bottom': '1cm',
            'left': '1cm'
        }
    }
}

response = requests.post(url, headers=headers, json=data)

with open('document.pdf', 'wb') as f:
    f.write(response.content)`,
    php: `<?php
$ch = curl_init('https://pdfforge-production.up.railway.app/api/generate-pdf');

curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);

curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'html' => '<h1>Hello World</h1><p>This is a PDF</p>',
    'options' => [
        'format' => 'A4',
        'printBackground' => true,
        'margin' => [
            'top' => '1cm',
            'right' => '1cm',
            'bottom' => '1cm',
            'left' => '1cm'
        ]
    ]
]));

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$pdf = curl_exec($ch);
curl_close($ch);

file_put_contents('document.pdf', $pdf);
?>`
  }

  const batchExample = {
    curl: `curl -X POST https://pdfforge-production.up.railway.app/api/batch-generate-pdf \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "batch": [
      {
        "html": "<h1>Invoice #001</h1>",
        "filename": "invoice-001.pdf"
      },
      {
        "url": "https://example.com/report",
        "filename": "report.pdf"
      },
      {
        "html": "<h1>Receipt</h1>",
        "filename": "receipt.pdf"
      }
    ]
  }' \\
  -o pdfs.zip`,
    javascript: `const response = await fetch('https://pdfforge-production.up.railway.app/api/batch-generate-pdf', {
  method: 'POST',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    batch: [
      { html: '<h1>Invoice #001</h1>', filename: 'invoice-001.pdf' },
      { url: 'https://example.com/report', filename: 'report.pdf' },
      { html: '<h1>Receipt</h1>', filename: 'receipt.pdf' }
    ]
  })
});

const blob = await response.blob();
// Returns a ZIP file containing all PDFs`
  }

  const webhookExample = {
    setup: `curl -X POST https://pdfforge-production.up.railway.app/api/webhooks/config \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "webhook_url": "https://your-app.com/webhooks/pdfforge",
    "webhook_enabled": true
  }'`,
    verify: `const crypto = require('crypto');

function verifyWebhookSignature(payload, signature, secret) {
  const hmac = crypto.createHmac('sha256', secret);
  hmac.update(JSON.stringify(payload));
  const expectedSignature = hmac.digest('hex');
  
  return signature === expectedSignature;
}

// In your webhook endpoint
app.post('/webhooks/pdfforge', (req, res) => {
  const signature = req.headers['x-webhook-signature'];
  const secret = 'YOUR_WEBHOOK_SECRET';
  
  if (!verifyWebhookSignature(req.body, signature, secret)) {
    return res.status(401).send('Invalid signature');
  }
  
  // Process the webhook event
  const { event, data } = req.body;
  console.log('Event:', event, 'Data:', data);
  
  res.status(200).send('OK');
});`
  }

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)' }}>
      {/* Header */}
      <div style={{ backgroundColor: 'white', borderBottom: '1px solid #e5e7eb', padding: '1.5rem 0', position: 'sticky', top: 0, zIndex: 50, boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '0 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#2563eb', textDecoration: 'none' }}>
            PdfForge API
          </Link>
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <Link href="/pricing" style={{ color: '#374151', textDecoration: 'none', fontWeight: '500' }}>Pricing</Link>
            <Link href="/dashboard" style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}>
              Dashboard
            </Link>
          </div>
        </div>
      </div>

      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem 1rem', display: 'grid', gridTemplateColumns: '250px 1fr', gap: '2rem' }}>
        {/* Sidebar Navigation */}
        <div style={{ position: 'sticky', top: '100px', height: 'fit-content' }}>
          <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
            <h3 style={{ fontSize: '0.875rem', fontWeight: 'bold', color: '#6b7280', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Navigation</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              {navigationItems.map(item => (
                <button
                  key={item.id}
                  onClick={() => scrollToSection(item.id)}
                  style={{
                    textAlign: 'left',
                    padding: '0.75rem',
                    borderRadius: '0.5rem',
                    border: 'none',
                    cursor: 'pointer',
                    backgroundColor: activeSection === item.id ? '#eff6ff' : 'transparent',
                    color: activeSection === item.id ? '#2563eb' : '#374151',
                    fontWeight: activeSection === item.id ? '600' : '500',
                    transition: 'all 0.2s',
                    fontSize: '0.875rem'
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.backgroundColor = '#f3f4f6'
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== item.id) {
                      e.currentTarget.style.backgroundColor = 'transparent'
                    }
                  }}
                >
                  {item.icon} {item.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div style={{ maxWidth: '900px' }}>
          {/* Introduction */}
          <section id="introduction" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>📖 API Documentation</h1>
            <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '1.5rem' }}>
              Welcome to the PdfForge API documentation. Convert HTML and URLs to high-quality PDFs with a simple REST API.
            </p>
            <div style={{ background: 'linear-gradient(to right, #eff6ff, #dbeafe)', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe' }}>
              <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '0.5rem' }}>Base URL</h3>
              <code style={{ backgroundColor: 'white', padding: '0.75rem 1rem', borderRadius: '0.5rem', display: 'block', fontFamily: 'monospace', fontSize: '0.875rem', color: '#1e3a8a' }}>
                https://pdfforge-production.up.railway.app
              </code>
            </div>
          </section>

          {/* Authentication */}
          <section id="authentication" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>🔐 Authentication</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              All API requests require authentication using your API key in the Authorization header:
            </p>
            <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '1.5rem', overflow: 'auto' }}>
              <code style={{ color: '#10b981', fontFamily: 'monospace', fontSize: '0.875rem', whiteSpace: 'pre' }}>
                Authorization: Bearer YOUR_API_KEY
              </code>
            </div>
            <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '1rem', borderRadius: '0.5rem' }}>
              <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                <strong>⚠️ Security:</strong> Never expose your API key in client-side code or public repositories. Always keep it secure on your server.
              </p>
            </div>
          </section>

          {/* Quick Start */}
          <section id="quick-start" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>⚡ Quick Start</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>Generate your first PDF in 30 seconds:</p>
            <ol style={{ color: '#374151', fontSize: '1rem', lineHeight: '1.8', marginLeft: '1.5rem', marginBottom: '1.5rem' }}>
              <li style={{ marginBottom: '0.5rem' }}>Get your API key from the <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'underline' }}>dashboard</Link></li>
              <li style={{ marginBottom: '0.5rem' }}>Make a POST request to <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>/api/generate-pdf</code></li>
              <li>Download your PDF</li>
            </ol>
            <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto' }}>
              <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {codeExamples.curl}
              </pre>
            </div>
          </section>

          {/* Rate Limits */}
          <section id="rate-limits" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>🚦 Rate Limits</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              PdfForge enforces both per-minute and monthly rate limits based on your plan:
            </p>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Per-Minute Limits</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem', marginBottom: '1.5rem' }}>
                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Starter</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>10</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>requests/min</p>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Professional</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#10b981' }}>50</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>requests/min</p>
                </div>
                <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                  <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '0.5rem' }}>Enterprise</p>
                  <p style={{ fontSize: '2rem', fontWeight: 'bold', color: '#8b5cf6' }}>200</p>
                  <p style={{ fontSize: '0.875rem', color: '#9ca3af' }}>requests/min</p>
                </div>
              </div>
            </div>

            <div style={{ backgroundColor: '#eff6ff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe', marginBottom: '1.5rem' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#1e40af', marginBottom: '0.75rem' }}>Rate Limit Headers</h4>
              <p style={{ color: '#1e40af', fontSize: '0.875rem', marginBottom: '1rem' }}>Each response includes rate limit information:</p>
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>
                X-RateLimit-Limit: 50<br />
                X-RateLimit-Remaining: 45<br />
                X-RateLimit-Reset: 42
              </div>
            </div>

            <div style={{ backgroundColor: '#fee2e2', border: '1px solid #fca5a5', padding: '1rem', borderRadius: '0.5rem' }}>
              <p style={{ color: '#991b1b', fontSize: '0.875rem' }}>
                <strong>⚠️ Rate Limit Exceeded:</strong> When you exceed the limit, you'll receive a <code style={{ backgroundColor: 'white', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>429 Too Many Requests</code> error with retry information.
              </p>
            </div>
          </section>

          {/* API Key Management */}
          <section id="api-keys" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>🔑 API Key Management</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Create and manage multiple API keys for different environments (production, staging, development).
            </p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Key Limits by Plan</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <ul style={{ color: '#374151', lineHeight: '2', marginLeft: '1.5rem' }}>
                <li><strong>Starter:</strong> 1 API key</li>
                <li><strong>Professional:</strong> 5 API keys</li>
                <li><strong>Enterprise:</strong> 10 API keys</li>
              </ul>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Managing Keys</h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              You can create, view, and revoke API keys from your <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'underline' }}>dashboard</Link>.
            </p>
            <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '1rem', borderRadius: '0.5rem' }}>
              <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                <strong>💡 Best Practice:</strong> Use separate API keys for each environment and application. This allows you to revoke compromised keys without affecting other services.
              </p>
            </div>
          </section>

          {/* API Endpoints */}
          <section id="endpoints" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>🔌 API Endpoints</h2>

            {/* Generate PDF */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>POST</span>
                <code style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#374151' }}>/api/generate-pdf</code>
              </div>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Generate a single PDF from HTML or URL</p>

              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>Request Body</h4>
              <div style={{ backgroundColor: '#1f2937', padding: '1rem', borderRadius: '0.5rem', overflow: 'auto', marginBottom: '1rem' }}>
                <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0 }}>
                  {`{
  "html": "<h1>Document</h1>",  // HTML string (required if no url)
  "url": "https://...",          // URL to convert (required if no html)
  "options": {
    "format": "A4",              // Paper format
    "printBackground": true,     // Include background graphics
    "landscape": false,          // Orientation
    "margin": {                  // Page margins
      "top": "1cm",
      "right": "1cm",
      "bottom": "1cm",
      "left": "1cm"
    }
  }
}`}
                </pre>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>Response</h4>
              <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Returns PDF file as binary data</p>
            </div>

            {/* Batch Generate */}
            <div style={{ marginBottom: '2rem', padding: '1.5rem', backgroundColor: '#f9fafb', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
                <span style={{ backgroundColor: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold' }}>POST</span>
                <code style={{ fontFamily: 'monospace', fontSize: '1rem', color: '#374151' }}>/api/batch-generate-pdf</code>
              </div>
              <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Generate multiple PDFs in a single request, returned as a ZIP file</p>

              <div style={{ backgroundColor: '#eff6ff', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #bfdbfe', marginBottom: '1rem' }}>
                <p style={{ color: '#1e40af', fontSize: '0.875rem', fontWeight: '600' }}>Batch Limits:</p>
                <ul style={{ color: '#1e40af', fontSize: '0.875rem', marginLeft: '1.5rem', marginTop: '0.5rem' }}>
                  <li>Starter: 10 PDFs per batch</li>
                  <li>Professional: 50 PDFs per batch</li>
                  <li>Enterprise: 100 PDFs per batch</li>
                </ul>
              </div>

              <h4 style={{ fontSize: '1rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>Response Headers</h4>
              <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem', marginBottom: '1rem' }}>
                X-Batch-Total: 3<br />
                X-Batch-Success: 3<br />
                X-Batch-Failed: 0
              </div>
            </div>
          </section>

          {/* Batch Generation */}
          <section id="batch-generation" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>📦 Batch PDF Generation</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Generate multiple PDFs in a single API call. All PDFs are returned as a ZIP file.
            </p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Example Request</h3>
            <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto', marginBottom: '1.5rem' }}>
              <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {batchExample.curl}
              </pre>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>JavaScript Example</h3>
            <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto', marginBottom: '1.5rem' }}>
              <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {batchExample.javascript}
              </pre>
            </div>

            <div style={{ backgroundColor: '#fef3c7', border: '1px solid #fbbf24', padding: '1rem', borderRadius: '0.5rem' }}>
              <p style={{ color: '#92400e', fontSize: '0.875rem' }}>
                <strong>💡 Tip:</strong> Each PDF in the batch counts toward your monthly usage limit. Batch generation is more efficient than making individual requests.
              </p>
            </div>
          </section>

          {/* Webhooks */}
          <section id="webhooks" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>🔗 Webhooks</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Receive real-time notifications for PDF generation events, usage warnings, and API errors.
            </p>

            <div style={{ backgroundColor: '#eff6ff', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #bfdbfe', marginBottom: '1.5rem' }}>
              <p style={{ color: '#1e40af', fontWeight: '600', marginBottom: '0.5rem' }}>📋 Availability</p>
              <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>Webhooks are available on Professional and Enterprise plans only.</p>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Webhook Events</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.75rem', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>✅ pdf.generated</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Triggered when a PDF is successfully generated</p>
              </div>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.75rem', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>⚠️ usage.warning</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Triggered when you reach 90% of your monthly limit</p>
              </div>
              <div style={{ backgroundColor: '#f9fafb', padding: '1rem', borderRadius: '0.5rem', marginBottom: '0.75rem', border: '1px solid #e5e7eb' }}>
                <h4 style={{ fontSize: '1rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>❌ api.error</h4>
                <p style={{ color: '#6b7280', fontSize: '0.875rem' }}>Triggered when an API request fails</p>
              </div>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Setup</h3>
            <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto', marginBottom: '1.5rem' }}>
              <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {webhookExample.setup}
              </pre>
            </div>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Signature Verification</h3>
            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>
              All webhooks include an <code style={{ backgroundColor: '#f3f4f6', padding: '0.25rem 0.5rem', borderRadius: '0.25rem' }}>X-Webhook-Signature</code> header with HMAC-SHA256 signature.
            </p>
            <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto' }}>
              <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                {webhookExample.verify}
              </pre>
            </div>
          </section>

          {/* Request Logs */}
          <section id="request-logs" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>📝 Request Logs</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              View detailed logs of all API requests including endpoint, status code, response time, and error messages.
            </p>

            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Log Retention</h3>
            <div style={{ marginBottom: '1.5rem' }}>
              <ul style={{ color: '#374151', lineHeight: '2', marginLeft: '1.5rem' }}>
                <li><strong>Starter:</strong> 7 days</li>
                <li><strong>Professional:</strong> 30 days</li>
                <li><strong>Enterprise:</strong> 90 days</li>
              </ul>
            </div>

            <p style={{ color: '#6b7280' }}>
              Access your request logs from the <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'underline' }}>dashboard</Link> with filtering options for success/error status.
            </p>
          </section>

          {/* Code Examples */}
          <section id="examples" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>💻 Code Examples</h2>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>JavaScript / Node.js</h3>
              <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto' }}>
                <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {codeExamples.javascript}
                </pre>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>Python</h3>
              <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto' }}>
                <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {codeExamples.python}
                </pre>
              </div>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#374151' }}>PHP</h3>
              <div style={{ backgroundColor: '#1f2937', padding: '1.5rem', borderRadius: '0.75rem', overflow: 'auto' }}>
                <pre style={{ color: '#d1d5db', fontFamily: 'monospace', fontSize: '0.875rem', margin: 0, whiteSpace: 'pre-wrap' }}>
                  {codeExamples.php}
                </pre>
              </div>
            </div>
          </section>

          {/* Error Handling */}
          <section id="errors" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>⚠️ Error Handling</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              The API uses standard HTTP status codes to indicate success or failure:
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ backgroundColor: '#d1fae5', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #6ee7b7' }}>
                <code style={{ fontWeight: 'bold', color: '#065f46' }}>200 OK</code>
                <p style={{ color: '#047857', fontSize: '0.875rem', marginTop: '0.5rem' }}>PDF generated successfully</p>
              </div>
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
                <code style={{ fontWeight: 'bold', color: '#7f1d1d' }}>400 Bad Request</code>
                <p style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Invalid request parameters (missing html/url, invalid options)</p>
              </div>
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
                <code style={{ fontWeight: 'bold', color: '#7f1d1d' }}>401 Unauthorized</code>
                <p style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Invalid or missing API key</p>
              </div>
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
                <code style={{ fontWeight: 'bold', color: '#7f1d1d' }}>403 Forbidden</code>
                <p style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Feature not available on your plan (e.g., webhooks on Starter)</p>
              </div>
              <div style={{ backgroundColor: '#fef3c7', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fbbf24' }}>
                <code style={{ fontWeight: 'bold', color: '#78350f' }}>429 Too Many Requests</code>
                <p style={{ color: '#92400e', fontSize: '0.875rem', marginTop: '0.5rem' }}>Rate limit or monthly limit exceeded</p>
              </div>
              <div style={{ backgroundColor: '#fee2e2', padding: '1rem', borderRadius: '0.5rem', border: '1px solid #fca5a5' }}>
                <code style={{ fontWeight: 'bold', color: '#7f1d1d' }}>500 Internal Server Error</code>
                <p style={{ color: '#991b1b', fontSize: '0.875rem', marginTop: '0.5rem' }}>Server error during PDF generation</p>
              </div>
            </div>
          </section>

          {/* Plan Comparison */}
          <section id="plans" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>📊 Plan Comparison</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Compare features across all plans:
            </p>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '1rem', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold' }}>Feature</th>
                    <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold' }}>Starter</th>
                    <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold' }}>Professional</th>
                    <th style={{ textAlign: 'center', padding: '1rem', borderBottom: '2px solid #e5e7eb', fontWeight: 'bold' }}>Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>Monthly PDFs</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>1,000</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>10,000</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>100,000</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>Rate Limit (per min)</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>10</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>50</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>200</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>API Keys</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>1</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>5</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>10</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>Batch Size (PDFs)</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>10</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>50</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>100</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>Log Retention</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>7 days</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>30 days</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>90 days</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>Webhooks</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>❌</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>✅</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>✅</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem' }}>Email Notifications</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>✅</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>✅</td>
                    <td style={{ textAlign: 'center', padding: '1rem' }}>✅</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '1rem', fontWeight: 'bold' }}>Price</td>
                    <td style={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold', color: '#2563eb' }}>$19/mo</td>
                    <td style={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold', color: '#10b981' }}>$49/mo</td>
                    <td style={{ textAlign: 'center', padding: '1rem', fontWeight: 'bold', color: '#8b5cf6' }}>$100/mo</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div style={{ marginTop: '2rem', textAlign: 'center' }}>
              <Link href="/pricing" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                View Detailed Pricing
              </Link>
            </div>
          </section>

          {/* FAQ */}
          <section id="faq" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1.5rem', color: '#111827' }}>❓ Frequently Asked Questions</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>What happens if I exceed my rate limit?</h3>
                <p style={{ color: '#6b7280' }}>You'll receive a 429 status code with headers indicating when the limit resets. Your request will not be processed, and you'll need to retry after the reset time.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Can I upgrade or downgrade my plan?</h3>
                <p style={{ color: '#6b7280' }}>Yes! You can change your plan at any time from your dashboard. Changes take effect immediately, and you'll be charged/credited on a prorated basis.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>What happens to my API keys if I downgrade?</h3>
                <p style={{ color: '#6b7280' }}>If you downgrade to a plan with fewer API keys (e.g., Professional → Starter), your existing keys will continue to work, but you won't be able to create new keys until you delete enough to meet your plan's limit.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>How long are request logs stored?</h3>
                <p style={{ color: '#6b7280' }}>Log retention depends on your plan: 7 days (Starter), 30 days (Professional), or 90 days (Enterprise). Logs older than your retention period are automatically deleted.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Do batch PDFs count toward my monthly limit?</h3>
                <p style={{ color: '#6b7280' }}>Yes, each PDF in a batch request counts as one PDF toward your monthly limit. For example, a batch of 10 PDFs uses 10 of your monthly allocation.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Can I test the API before subscribing?</h3>
                <p style={{ color: '#6b7280' }}>Yes! All new users start with 1,000 free PDFs on the Starter plan. You can test all features (except webhooks) during this period.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>How do I verify webhook signatures?</h3>
                <p style={{ color: '#6b7280' }}>Each webhook includes an X-Webhook-Signature header containing an HMAC-SHA256 hash. Use your webhook secret to verify the signature matches the payload. See the Webhooks section for code examples.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>What happens if a batch generation partially fails?</h3>
                <p style={{ color: '#6b7280' }}>The ZIP file will contain all successfully generated PDFs. Response headers indicate the total, successful, and failed counts. Each PDF still counts toward your monthly usage, even if it fails.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Is there a file size limit for generated PDFs?</h3>
                <p style={{ color: '#6b7280' }}>Individual PDFs are limited to reasonable sizes based on content complexity. For very large documents, consider splitting them into multiple pages or using batch generation.</p>
              </div>

              <div>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#374151', marginBottom: '0.5rem' }}>Can I use custom fonts in my PDFs?</h3>
                <p style={{ color: '#6b7280' }}>Yes! Include @font-face rules in your HTML/CSS. Make sure font URLs are publicly accessible or use base64-encoded fonts.</p>
              </div>
            </div>
          </section>

          {/* Support */}
          <section id="support" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '1rem', color: '#111827' }}>💬 Support</h2>
            <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
              Need help? We're here for you!
            </p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
              <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>📧 Email Support</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>Get help via email</p>
                <a href="mailto:support@pdfforge.com" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '600' }}>
                  support@pdfforge.com
                </a>
              </div>

              <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>📖 Documentation</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>Browse our guides</p>
                <a href="#introduction" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '600' }}>
                  View Docs
                </a>
              </div>

              <div style={{ backgroundColor: '#f9fafb', padding: '1.5rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#374151' }}>💻 Dashboard</h3>
                <p style={{ color: '#6b7280', fontSize: '0.875rem', marginBottom: '1rem' }}>Manage your account</p>
                <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '600' }}>
                  Go to Dashboard
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}