export default function Docs() {
  return (
    <div className="min-h-screen bg-gray-50 py-16" >
      <div className="container mx-auto px-4 max-w-4xl" >
        <h1 className="text-4xl font-bold mb-8" > API Documentation </h1>
        < div className="bg-white p-8 rounded-lg shadow-md" >
          <h2 className="text-2xl font-semibold mb-4" > Getting Started </h2>
          < p className="text-gray-600 mb-4" >
            Welcome to PdfForge API documentation.Learn how to integrate PDF generation into your applications.
          </p>
          < div className="bg-gray-900 text-white p-4 rounded-lg" >
            <code>
              {`POST /api/generate-pdf
{
  "html": "<h1>Hello World</h1>",
  "options": {
    "format": "A4"
  }
}`}
            </code>
          </div>
        </div>
      </div>
    </div>
  )
}
;