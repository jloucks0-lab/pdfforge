import Link from 'next/link'

export default function Docs() {
  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)' }}>
      {/* Hero Section */}
      <div style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)', color: 'white', padding: '4rem 1rem' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 1rem' }}>
          <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>API Documentation</h1>
          <p style={{ fontSize: '1.25rem', color: '#dbeafe' }}>
            Everything you need to integrate PDF generation into your application
          </p>
        </div>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1rem' }}>
        {/* Quick Navigation */}
        <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Jump to:</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '0.75rem' }}>
            <a href="#intro" style={{ color: '#2563eb', textDecoration: 'none' }}>Introduction</a>
            <a href="#auth" style={{ color: '#2563eb', textDecoration: 'none' }}>Authentication</a>
            <a href="#quickstart" style={{ color: '#2563eb', textDecoration: 'none' }}>Quick Start</a>
            <a href="#endpoints" style={{ color: '#2563eb', textDecoration: 'none' }}>Endpoints</a>
            <a href="#examples" style={{ color: '#2563eb', textDecoration: 'none' }}>Code Examples</a>
            <a href="#errors" style={{ color: '#2563eb', textDecoration: 'none' }}>Error Handling</a>
            <a href="#limits" style={{ color: '#2563eb', textDecoration: 'none' }}>Rate Limits</a>
            <a href="#support" style={{ color: '#2563eb', textDecoration: 'none' }}>Support</a>
          </div>
        </div>

        {/* Introduction */}
        <div id="intro" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📘</span>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Introduction</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
                PdfForge is a professional PDF generation service that converts HTML and URLs to high-quality PDF documents.
                Our API is built for developers who need reliable, scalable PDF generation with pixel-perfect rendering.
              </p>
            </div>
          </div>
          <div style={{ background: 'linear-gradient(to right, #eff6ff, #dbeafe)', borderLeft: '4px solid #2563eb', padding: '1.25rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
            <p style={{ color: '#1e40af', fontSize: '1.125rem', margin: 0 }}>
              <strong>Base URL:</strong> <code style={{ backgroundColor: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontFamily: 'monospace', fontSize: '0.875rem', marginLeft: '0.5rem' }}>https://pdfforge-production.up.railway.app</code>
            </p>
          </div>
        </div>

        {/* Authentication */}
        <div id="auth" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🔐</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Authentication</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
                All API requests require authentication using your API key. Include your key in the Authorization header with Bearer authentication.
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: '#1f2937', color: '#e5e7eb', padding: '1.25rem', borderRadius: '0.5rem', marginBottom: '1rem', fontFamily: 'monospace', fontSize: '0.875rem', overflowX: 'auto' }}>
            <div style={{ color: '#10b981', marginBottom: '0.25rem' }}>// Request Header</div>
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </div>
          <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '1rem', borderRadius: '0.5rem' }}>
            <p style={{ color: '#1e40af', margin: 0 }}>
              💡 <strong>Find your API key:</strong> Visit your <Link href="/dashboard" style={{ color: '#2563eb', textDecoration: 'underline', fontWeight: '600' }}>dashboard</Link> to copy your unique API key.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div id="quickstart" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>⚡</span>
            <div style={{ flex: 1 }}>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Quick Start</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', lineHeight: '1.75', marginBottom: '1rem' }}>
                Generate your first PDF in seconds with this simple example:
              </p>
            </div>
          </div>
          <div style={{ backgroundColor: '#1f2937', color: '#e5e7eb', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto', marginBottom: '1rem' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
              {`curl -X POST https://pdfforge-production.up.railway.app/api/generate-pdf \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<h1>Hello World</h1><p>This is a PDF</p>",
    "options": {
      "format": "A4",
      "printBackground": true
    }
  }' -o output.pdf`}
            </pre>
          </div>
          <div style={{ padding: '1rem', backgroundColor: '#d1fae5', border: '1px solid #6ee7b7', borderRadius: '0.5rem' }}>
            <p style={{ color: '#065f46', margin: 0 }}>✅ <strong>Success!</strong> Your PDF will be downloaded as <code style={{ backgroundColor: 'white', padding: '0.125rem 0.5rem', borderRadius: '0.25rem' }}>output.pdf</code></p>
          </div>
        </div>

        {/* API Endpoints */}
        <div id="endpoints" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>🔌</span>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>API Endpoints</h2>
            </div>
          </div>

          <div style={{ borderLeft: '4px solid #10b981', paddingLeft: '1.5rem', marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
              <span style={{ backgroundColor: '#10b981', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '0.5rem', fontSize: '0.875rem', fontWeight: 'bold' }}>POST</span>
              <code style={{ color: '#374151' }}>/api/generate-pdf</code>
            </h3>
            <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>Generate a PDF from HTML content or a public URL.</p>

            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Request Parameters:</h4>
            <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
              <table style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '0.5rem', borderCollapse: 'collapse' }}>
                <thead style={{ backgroundColor: '#f9fafb' }}>
                  <tr>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Parameter</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Type</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Required</th>
                    <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>html</code></td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>string</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#f59e0b', fontWeight: '600' }}>*</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>HTML content to convert to PDF</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>url</code></td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>string</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#f59e0b', fontWeight: '600' }}>*</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Public URL to convert to PDF</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>options.format</code></td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>string</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Optional</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Page format: A4, Letter, Legal (default: A4)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>options.printBackground</code></td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>boolean</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Optional</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Include background graphics (default: true)</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>options.landscape</code></td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>boolean</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Optional</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Landscape orientation (default: false)</td>
                  </tr>
                  <tr>
                    <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>options.margin</code></td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>object</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#9ca3af' }}>Optional</td>
                    <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Page margins: top, right, bottom, left</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: '0.875rem', color: '#f59e0b', marginTop: '0.75rem' }}>* Either <code>html</code> or <code>url</code> is required (not both)</p>
            </div>

            <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Response:</h4>
            <p style={{ color: '#6b7280', marginBottom: '0.75rem' }}>Returns the PDF file as a binary stream with <code style={{ backgroundColor: '#f3f4f6', padding: '0.125rem 0.5rem', borderRadius: '0.25rem', fontSize: '0.875rem' }}>Content-Type: application/pdf</code></p>
          </div>
        </div>

        {/* Code Examples - Continued in next message due to length */}
        <div id="examples" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>💻</span>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Code Examples</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem' }}>Get started quickly with these language-specific examples</p>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#f59e0b' }}>🟨</span> JavaScript (Node.js)
            </h3>
            <div style={{ backgroundColor: '#1f2937', color: '#e5e7eb', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto' }}>
              <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                {`const response = await fetch(
  'https://pdfforge-production.up.railway.app/api/generate-pdf',
  {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      html: '<h1>Invoice</h1><p>Total: $100</p>',
      options: { format: 'A4', printBackground: true }
    })
  }
);

const pdfBlob = await response.blob();
// Save or process the PDF blob`}
              </pre>
            </div>
          </div>

          <div style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#3b82f6' }}>🐍</span> Python
            </h3>
            <div style={{ backgroundColor: '#1f2937', color: '#e5e7eb', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto' }}>
              <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                {`import requests

response = requests.post(
    'https://pdfforge-production.up.railway.app/api/generate-pdf',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'html': '<h1>Invoice</h1><p>Total: $100</p>',
        'options': {'format': 'A4', 'printBackground': True}
    }
)

with open('output.pdf', 'wb') as f:
    f.write(response.content)`}
              </pre>
            </div>
          </div>

          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span style={{ color: '#a855f7' }}>🐘</span> PHP
            </h3>
            <div style={{ backgroundColor: '#1f2937', color: '#e5e7eb', padding: '1.25rem', borderRadius: '0.5rem', overflowX: 'auto' }}>
              <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
                {`<?php
$ch = curl_init('https://pdfforge-production.up.railway.app/api/generate-pdf');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'html' => '<h1>Invoice</h1><p>Total: $100</p>',
    'options' => ['format' => 'A4', 'printBackground' => true]
]));

$pdf = curl_exec($ch);
file_put_contents('output.pdf', $pdf);
?>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div id="errors" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>⚠️</span>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Error Handling</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>The API uses standard HTTP response codes to indicate success or failure.</p>
            </div>
          </div>

          <div style={{ overflowX: 'auto', marginBottom: '1.5rem' }}>
            <table style={{ width: '100%', border: '1px solid #e5e7eb', borderRadius: '0.5rem', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Status Code</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Meaning</th>
                  <th style={{ textAlign: 'left', padding: '0.75rem 1rem', fontWeight: '600', borderBottom: '1px solid #e5e7eb' }}>Description</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#d1fae5', color: '#065f46', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>200</code></td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#065f46' }}>Success</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>PDF generated successfully</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#fef3c7', color: '#92400e', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>400</code></td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#92400e' }}>Bad Request</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Invalid HTML or parameters</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#fee2e2', color: '#7f1d1d', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>401</code></td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#7f1d1d' }}>Unauthorized</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Invalid or missing API key</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#fed7aa', color: '#9a3412', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>429</code></td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#9a3412' }}>Rate Limit Exceeded</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Monthly limit reached</td>
                </tr>
                <tr>
                  <td style={{ padding: '0.75rem 1rem' }}><code style={{ backgroundColor: '#fee2e2', color: '#7f1d1d', padding: '0.25rem 0.5rem', borderRadius: '0.25rem', fontWeight: 'bold' }}>500</code></td>
                  <td style={{ padding: '0.75rem 1rem', fontWeight: '600', color: '#7f1d1d' }}>Server Error</td>
                  <td style={{ padding: '0.75rem 1rem', color: '#6b7280' }}>Internal server error</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Error Response Format:</h4>
          <div style={{ backgroundColor: '#1f2937', color: '#e5e7eb', padding: '1.25rem', borderRadius: '0.5rem' }}>
            <pre style={{ fontFamily: 'monospace', fontSize: '0.875rem', lineHeight: '1.5', margin: 0, whiteSpace: 'pre-wrap' }}>
              {`{
  "error": "Monthly limit exceeded",
  "current": 1000,
  "limit": 1000,
  "message": "You've reached your plan limit..."
}`}
            </pre>
          </div>
        </div>

        {/* Rate Limits */}
        <div id="limits" style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '2rem', border: '1px solid #e5e7eb' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1.5rem' }}>
            <span style={{ fontSize: '2.5rem' }}>📊</span>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Rate Limits</h2>
              <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '1.5rem' }}>API limits are based on your subscription plan:</p>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Starter</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>1,000</p>
              <p style={{ color: '#6b7280' }}>PDFs per month</p>
            </div>
            <div style={{ border: '2px solid #2563eb', borderRadius: '0.75rem', padding: '1.5rem', backgroundColor: '#eff6ff', textAlign: 'center' }}>
              <div style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', display: 'inline-block', marginBottom: '0.5rem' }}>POPULAR</div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Professional</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>10,000</p>
              <p style={{ color: '#6b7280' }}>PDFs per month</p>
            </div>
            <div style={{ border: '2px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem', textAlign: 'center' }}>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Enterprise</h3>
              <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '1rem' }}>100,000</p>
              <p style={{ color: '#6b7280' }}>PDFs per month</p>
            </div>
          </div>

          <div style={{ background: 'linear-gradient(to right, #fef3c7, #fde68a)', borderLeft: '4px solid #f59e0b', padding: '1.25rem', borderRadius: '0 0.5rem 0.5rem 0' }}>
            <p style={{ color: '#78350f', fontSize: '1.125rem', margin: 0 }}>
              <strong>💡 Pro Tip:</strong> Monitor your usage in real-time through your <Link href="/dashboard" style={{ color: '#92400e', textDecoration: 'underline', fontWeight: '600' }}>dashboard</Link>. You'll be notified when you reach 90% of your monthly limit.
            </p>
          </div>
        </div>

        {/* Support */}
        <div id="support" style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)', color: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)' }}>
          <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
            <span style={{ fontSize: '2.5rem' }}>💬</span>
            <div>
              <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.75rem' }}>Need Help?</h2>
              <p style={{ color: '#dbeafe', fontSize: '1.125rem', marginBottom: '1.5rem' }}>
                Have questions or need assistance? We're here to help!
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <a href="mailto:support@pdfforge.io" style={{ backgroundColor: 'white', color: '#2563eb', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}>
                  Email Support
                </a>
                <Link href="/dashboard" style={{ backgroundColor: '#1e40af', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}>
                  View Dashboard
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}