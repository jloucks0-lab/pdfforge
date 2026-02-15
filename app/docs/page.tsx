export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50 py-16">
      <div className="container mx-auto px-4 max-w-4xl">
        <h1 className="text-4xl font-bold mb-8">API Documentation</h1>

        {/* Introduction */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-600 mb-4">
            PdfForge is a professional PDF generation service that converts HTML and URLs to high-quality PDF documents.
            Our API is built for developers who need reliable, scalable PDF generation.
          </p>
          <div className="bg-blue-50 border-l-4 border-blue-600 p-4">
            <p className="text-blue-900">
              <strong>Base URL:</strong> <code className="bg-blue-100 px-2 py-1 rounded">https://api.pdfforge.io/v1</code>
            </p>
          </div>
        </div>

        {/* Authentication */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p className="text-gray-600 mb-4">
            All API requests require authentication using your API key. Include your key in the Authorization header:
          </p>
          <div className="bg-gray-900 text-white p-4 rounded-lg mb-4">
            <code className="text-sm">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          <p className="text-gray-600">
            You can find your API key in your <a href="/dashboard" className="text-blue-600 hover:underline">dashboard</a>.
          </p>
        </div>

        {/* Quick Start */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Quick Start</h2>
          <p className="text-gray-600 mb-4">
            Here's a simple example to generate a PDF from HTML:
          </p>
          <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
            <pre className="text-sm">
              {`curl -X POST https://api.pdfforge.io/v1/generate \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<h1>Hello World</h1><p>This is a PDF</p>",
    "format": "A4",
    "printBackground": true
  }'`}
            </pre>
          </div>
        </div>

        {/* API Endpoints */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">API Endpoints</h2>

          <div className="mb-6">
            <h3 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <span className="bg-green-600 text-white px-2 py-1 rounded text-xs">POST</span>
              /generate
            </h3>
            <p className="text-gray-600 mb-4">Generate a PDF from HTML or URL.</p>

            <h4 className="font-semibold mb-2">Request Body:</h4>
            <div className="bg-gray-50 p-4 rounded-lg mb-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-2">Parameter</th>
                    <th className="text-left py-2">Type</th>
                    <th className="text-left py-2">Required</th>
                    <th className="text-left py-2">Description</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b">
                    <td className="py-2"><code>html</code></td>
                    <td>string</td>
                    <td>*</td>
                    <td>HTML content to convert</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>url</code></td>
                    <td>string</td>
                    <td>*</td>
                    <td>URL to convert to PDF</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>format</code></td>
                    <td>string</td>
                    <td>No</td>
                    <td>Page format: A4, Letter, Legal (default: A4)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>printBackground</code></td>
                    <td>boolean</td>
                    <td>No</td>
                    <td>Include background graphics (default: true)</td>
                  </tr>
                  <tr className="border-b">
                    <td className="py-2"><code>margin</code></td>
                    <td>object</td>
                    <td>No</td>
                    <td>Page margins (top, right, bottom, left)</td>
                  </tr>
                  <tr>
                    <td className="py-2"><code>landscape</code></td>
                    <td>boolean</td>
                    <td>No</td>
                    <td>Landscape orientation (default: false)</td>
                  </tr>
                </tbody>
              </table>
              <p className="text-xs text-gray-500 mt-2">* Either html or url is required</p>
            </div>

            <h4 className="font-semibold mb-2">Response:</h4>
            <div className="bg-gray-900 text-white p-4 rounded-lg">
              <pre className="text-sm">
                {`{
  "success": true,
  "pdfUrl": "https://cdn.pdfforge.io/pdfs/abc123.pdf",
  "pages": 1,
  "fileSize": 45678,
  "timestamp": "2024-02-14T10:30:00Z"
}`}
              </pre>
            </div>
          </div>
        </div>

        {/* Code Examples */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Code Examples</h2>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">JavaScript (Node.js)</h3>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                {`const axios = require('axios');

const response = await axios.post(
  'https://api.pdfforge.io/v1/generate',
  {
    html: '<h1>Invoice</h1><p>Total: $100</p>',
    format: 'A4',
    printBackground: true
  },
  {
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY',
      'Content-Type': 'application/json'
    }
  }
);

console.log(response.data.pdfUrl);`}
              </pre>
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-3">Python</h3>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                {`import requests

response = requests.post(
    'https://api.pdfforge.io/v1/generate',
    headers={
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
    },
    json={
        'html': '<h1>Invoice</h1><p>Total: $100</p>',
        'format': 'A4',
        'printBackground': True
    }
)

data = response.json()
print(data['pdfUrl'])`}
              </pre>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-3">PHP</h3>
            <div className="bg-gray-900 text-white p-4 rounded-lg overflow-x-auto">
              <pre className="text-sm">
                {`<?php
$ch = curl_init('https://api.pdfforge.io/v1/generate');

curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer YOUR_API_KEY',
    'Content-Type: application/json'
]);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode([
    'html' => '<h1>Invoice</h1><p>Total: $100</p>',
    'format' => 'A4',
    'printBackground' => true
]));

$response = curl_exec($ch);
$data = json_decode($response, true);
echo $data['pdfUrl'];
?>`}
              </pre>
            </div>
          </div>
        </div>

        {/* Error Handling */}
        <div className="bg-white p-8 rounded-lg shadow-md mb-6">
          <h2 className="text-2xl font-semibold mb-4">Error Handling</h2>
          <p className="text-gray-600 mb-4">
            The API uses standard HTTP response codes:
          </p>
          <table className="w-full text-sm mb-4">
            <thead>
              <tr className="border-b bg-gray-50">
                <th className="text-left py-2 px-4">Code</th>
                <th className="text-left py-2 px-4">Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b">
                <td className="py-2 px-4"><code>200</code></td>
                <td>Success</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4"><code>400</code></td>
                <td>Bad Request - Invalid HTML or parameters</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4"><code>401</code></td>
                <td>Unauthorized - Invalid API key</td>
              </tr>
              <tr className="border-b">
                <td className="py-2 px-4"><code>429</code></td>
                <td>Rate Limit Exceeded</td>
              </tr>
              <tr>
                <td className="py-2 px-4"><code>500</code></td>
                <td>Server Error</td>
              </tr>
            </tbody>
          </table>

          <h4 className="font-semibold mb-2">Error Response Format:</h4>
          <div className="bg-gray-900 text-white p-4 rounded-lg">
            <pre className="text-sm">
              {`{
  "success": false,
  "error": {
    "code": "invalid_html",
    "message": "The provided HTML is malformed"
  }
}`}
            </pre>
          </div>
        </div>

        {/* Rate Limits */}
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold mb-4">Rate Limits</h2>
          <p className="text-gray-600 mb-4">
            Rate limits depend on your subscription plan:
          </p>
          <ul className="list-disc list-inside text-gray-600 space-y-2">
            <li><strong>Starter:</strong> 1,000 requests/month, 10 requests/minute</li>
            <li><strong>Professional:</strong> 10,000 requests/month, 50 requests/minute</li>
            <li><strong>Enterprise:</strong> 100,000 requests/month, 200 requests/minute</li>
          </ul>
          <div className="bg-yellow-50 border-l-4 border-yellow-600 p-4 mt-4">
            <p className="text-yellow-900">
              <strong>Tip:</strong> Check the <code>X-RateLimit-Remaining</code> header in responses to monitor your usage.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}