export default function Docs() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white py-16">
        <div className="container mx-auto px-4 max-w-5xl">
          <h1 className="text-5xl font-bold mb-4">API Documentation</h1>
          <p className="text-xl text-blue-100">
            Everything you need to integrate PDF generation into your application
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 max-w-5xl py-12">
        {/* Quick Navigation */}
        <div className="bg-white p-6 rounded-xl shadow-lg mb-8 border border-gray-100">
          <h3 className="text-lg font-semibold mb-4">Jump to:</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <a href="#intro" className="text-blue-600 hover:text-blue-700 hover:underline">Introduction</a>
            <a href="#auth" className="text-blue-600 hover:text-blue-700 hover:underline">Authentication</a>
            <a href="#quickstart" className="text-blue-600 hover:text-blue-700 hover:underline">Quick Start</a>
            <a href="#endpoints" className="text-blue-600 hover:text-blue-700 hover:underline">Endpoints</a>
            <a href="#examples" className="text-blue-600 hover:text-blue-700 hover:underline">Code Examples</a>
            <a href="#errors" className="text-blue-600 hover:text-blue-700 hover:underline">Error Handling</a>
            <a href="#limits" className="text-blue-600 hover:text-blue-700 hover:underline">Rate Limits</a>
            <a href="#support" className="text-blue-600 hover:text-blue-700 hover:underline">Support</a>
          </div>
        </div>

        {/* Introduction */}
        <div id="intro" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">📘</span>
            <div>
              <h2 className="text-3xl font-bold mb-3">Introduction</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                PdfForge is a professional PDF generation service that converts HTML and URLs to high-quality PDF documents.
                Our API is built for developers who need reliable, scalable PDF generation with pixel-perfect rendering.
              </p>
            </div>
          </div>
          <div className="bg-gradient-to-r from-blue-50 to-blue-100 border-l-4 border-blue-600 p-5 rounded-r-lg">
            <p className="text-blue-900 text-lg">
              <strong>Base URL:</strong> <code className="bg-white px-3 py-1 rounded font-mono text-sm ml-2">https://pdfforge-production.up.railway.app</code>
            </p>
          </div>
        </div>

        {/* Authentication */}
        <div id="auth" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">🔐</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">Authentication</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                All API requests require authentication using your API key. Include your key in the Authorization header with Bearer authentication.
              </p>
            </div>
          </div>
          <div className="bg-gray-900 text-gray-100 p-5 rounded-lg mb-4 font-mono text-sm overflow-x-auto">
            <div className="text-green-400 mb-1">// Request Header</div>
            <code>Authorization: Bearer YOUR_API_KEY</code>
          </div>
          <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg">
            <p className="text-blue-900">
              💡 <strong>Find your API key:</strong> Visit your <a href="/dashboard" className="text-blue-600 hover:text-blue-700 underline font-semibold">dashboard</a> to copy your unique API key.
            </p>
          </div>
        </div>

        {/* Quick Start */}
        <div id="quickstart" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-4">
            <span className="text-4xl">⚡</span>
            <div className="flex-1">
              <h2 className="text-3xl font-bold mb-3">Quick Start</h2>
              <p className="text-gray-600 text-lg leading-relaxed mb-4">
                Generate your first PDF in seconds with this simple example:
              </p>
            </div>
          </div>
          <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto">
            <pre className="font-mono text-sm leading-relaxed">
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
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-green-900">✅ <strong>Success!</strong> Your PDF will be downloaded as <code className="bg-white px-2 py-1 rounded">output.pdf</code></p>
          </div>
        </div>

        {/* API Endpoints */}
        <div id="endpoints" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">🔌</span>
            <div>
              <h2 className="text-3xl font-bold mb-3">API Endpoints</h2>
            </div>
          </div>

          <div className="border-l-4 border-green-500 pl-6 mb-6">
            <h3 className="text-2xl font-bold mb-3 flex items-center gap-3">
              <span className="bg-green-600 text-white px-3 py-1 rounded-lg text-sm font-bold">POST</span>
              <code className="text-gray-700">/api/generate-pdf</code>
            </h3>
            <p className="text-gray-600 text-lg mb-6">Generate a PDF from HTML content or a public URL.</p>

            <h4 className="text-xl font-bold mb-3">Request Parameters:</h4>
            <div className="overflow-x-auto">
              <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="text-left py-3 px-4 font-semibold">Parameter</th>
                    <th className="text-left py-3 px-4 font-semibold">Type</th>
                    <th className="text-left py-3 px-4 font-semibold">Required</th>
                    <th className="text-left py-3 px-4 font-semibold">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-1 rounded text-sm">html</code></td>
                    <td className="py-3 px-4 text-gray-600">string</td>
                    <td className="py-3 px-4 text-amber-600 font-semibold">*</td>
                    <td className="py-3 px-4 text-gray-600">HTML content to convert to PDF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-1 rounded text-sm">url</code></td>
                    <td className="py-3 px-4 text-gray-600">string</td>
                    <td className="py-3 px-4 text-amber-600 font-semibold">*</td>
                    <td className="py-3 px-4 text-gray-600">Public URL to convert to PDF</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-1 rounded text-sm">options.format</code></td>
                    <td className="py-3 px-4 text-gray-600">string</td>
                    <td className="py-3 px-4 text-gray-400">Optional</td>
                    <td className="py-3 px-4 text-gray-600">Page format: A4, Letter, Legal (default: A4)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-1 rounded text-sm">options.printBackground</code></td>
                    <td className="py-3 px-4 text-gray-600">boolean</td>
                    <td className="py-3 px-4 text-gray-400">Optional</td>
                    <td className="py-3 px-4 text-gray-600">Include background graphics (default: true)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-1 rounded text-sm">options.landscape</code></td>
                    <td className="py-3 px-4 text-gray-600">boolean</td>
                    <td className="py-3 px-4 text-gray-400">Optional</td>
                    <td className="py-3 px-4 text-gray-600">Landscape orientation (default: false)</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="py-3 px-4"><code className="bg-gray-100 px-2 py-1 rounded text-sm">options.margin</code></td>
                    <td className="py-3 px-4 text-gray-600">object</td>
                    <td className="py-3 px-4 text-gray-400">Optional</td>
                    <td className="py-3 px-4 text-gray-600">Page margins: top, right, bottom, left</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-sm text-amber-600 mt-3">* Either <code>html</code> or <code>url</code> is required (not both)</p>
            </div>

            <h4 className="text-xl font-bold mb-3 mt-6">Response:</h4>
            <p className="text-gray-600 mb-3">Returns the PDF file as a binary stream with <code className="bg-gray-100 px-2 py-1 rounded text-sm">Content-Type: application/pdf</code></p>
          </div>
        </div>

        {/* Code Examples */}
        <div id="examples" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">💻</span>
            <div>
              <h2 className="text-3xl font-bold mb-3">Code Examples</h2>
              <p className="text-gray-600 text-lg">Get started quickly with these language-specific examples</p>
            </div>
          </div>

          <div className="space-y-6">
            {/* JavaScript */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-yellow-500">🟨</span> JavaScript (Node.js)
              </h3>
              <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
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

            {/* Python */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-blue-500">🐍</span> Python
              </h3>
              <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
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

            {/* PHP */}
            <div>
              <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                <span className="text-purple-500">🐘</span> PHP
              </h3>
              <div className="bg-gray-900 text-gray-100 p-5 rounded-lg overflow-x-auto">
                <pre className="font-mono text-sm leading-relaxed">
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
        </div>

        {/* Error Handling */}
        <div id="errors" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">⚠️</span>
            <div>
              <h2 className="text-3xl font-bold mb-3">Error Handling</h2>
              <p className="text-gray-600 text-lg mb-6">The API uses standard HTTP response codes to indicate success or failure.</p>
            </div>
          </div>

          <div className="overflow-x-auto mb-6">
            <table className="w-full border border-gray-200 rounded-lg overflow-hidden">
              <thead className="bg-gray-50">
                <tr>
                  <th className="text-left py-3 px-4 font-semibold">Status Code</th>
                  <th className="text-left py-3 px-4 font-semibold">Meaning</th>
                  <th className="text-left py-3 px-4 font-semibold">Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4"><code className="bg-green-100 text-green-700 px-2 py-1 rounded font-bold">200</code></td>
                  <td className="py-3 px-4 font-semibold text-green-700">Success</td>
                  <td className="py-3 px-4 text-gray-600">PDF generated successfully</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4"><code className="bg-yellow-100 text-yellow-700 px-2 py-1 rounded font-bold">400</code></td>
                  <td className="py-3 px-4 font-semibold text-yellow-700">Bad Request</td>
                  <td className="py-3 px-4 text-gray-600">Invalid HTML or parameters</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4"><code className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">401</code></td>
                  <td className="py-3 px-4 font-semibold text-red-700">Unauthorized</td>
                  <td className="py-3 px-4 text-gray-600">Invalid or missing API key</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4"><code className="bg-orange-100 text-orange-700 px-2 py-1 rounded font-bold">429</code></td>
                  <td className="py-3 px-4 font-semibold text-orange-700">Rate Limit Exceeded</td>
                  <td className="py-3 px-4 text-gray-600">Monthly limit reached</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="py-3 px-4"><code className="bg-red-100 text-red-700 px-2 py-1 rounded font-bold">500</code></td>
                  <td className="py-3 px-4 font-semibold text-red-700">Server Error</td>
                  <td className="py-3 px-4 text-gray-600">Internal server error</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h4 className="text-xl font-bold mb-3">Error Response Format:</h4>
          <div className="bg-gray-900 text-gray-100 p-5 rounded-lg">
            <pre className="font-mono text-sm leading-relaxed">
              {`{
  "error": "Monthly limit exceeded",
  "current": 1000,
  "limit": 1000,
  "message": "You've reached your plan limit of 1000 PDFs per month..."
}`}
            </pre>
          </div>
        </div>

        {/* Rate Limits */}
        <div id="limits" className="bg-white p-8 rounded-xl shadow-lg mb-8 border border-gray-100">
          <div className="flex items-start gap-4 mb-6">
            <span className="text-4xl">📊</span>
            <div>
              <h2 className="text-3xl font-bold mb-3">Rate Limits</h2>
              <p className="text-gray-600 text-lg mb-6">API limits are based on your subscription plan:</p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition">
              <h3 className="text-xl font-bold mb-2">Starter</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">1,000</p>
              <p className="text-gray-600">PDFs per month</p>
            </div>
            <div className="border-2 border-blue-500 rounded-xl p-6 bg-blue-50">
              <div className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-bold inline-block mb-2">POPULAR</div>
              <h3 className="text-xl font-bold mb-2">Professional</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">10,000</p>
              <p className="text-gray-600">PDFs per month</p>
            </div>
            <div className="border-2 border-gray-200 rounded-xl p-6 hover:border-blue-400 transition">
              <h3 className="text-xl font-bold mb-2">Enterprise</h3>
              <p className="text-3xl font-bold text-blue-600 mb-4">100,000</p>
              <p className="text-gray-600">PDFs per month</p>
            </div>
          </div>

          <div className="bg-amber-50 border-l-4 border-amber-500 p-5 rounded-r-lg">
            <p className="text-amber-900 text-lg">
              <strong>💡 Pro Tip:</strong> Monitor your usage in real-time through your <a href="/dashboard" className="text-amber-700 hover:text-amber-800 underline font-semibold">dashboard</a>. You'll be notified when you reach 90% of your monthly limit.
            </p>
          </div>
        </div>

        {/* Support */}
        <div id="support" className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-xl">
          <div className="flex items-start gap-4">
            <span className="text-4xl">💬</span>
            <div>
              <h2 className="text-3xl font-bold mb-3">Need Help?</h2>
              <p className="text-blue-100 text-lg mb-6">
                Have questions or need assistance? We're here to help!
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="mailto:support@pdfforge.io" className="bg-white text-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition">
                  Email Support
                </a>
                <a href="/dashboard" className="bg-blue-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-400 transition">
                  View Dashboard
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}