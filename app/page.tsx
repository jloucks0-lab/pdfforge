import Link from 'next/link'

export default function Home() {
    return (
        <main className="min-h-screen bg-gradient-to-b from-gray-50 to-white" >
            <div className="container mx-auto px-4 py-16" >
                <div className="text-center max-w-4xl mx-auto" >
                    <h1 className="text-5xl font-bold text-gray-900 mb-6" >
                        PdfForge
                    </h1>
                    < p className="text-xl text-gray-600 mb-8" >
                        Professional PDF Generation API - Convert HTML and URLs to high - quality PDFs
                    </p>
                    < div className="flex gap-8 justify-center" >
                        <Link
                            href="/pricing"
                            className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition"
                        >
                            Get Started
                        </Link>
                        < Link
                            href="/docs"
                            className="bg-gray-200 text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-300 transition"
                        >
                            View Docs
                        </Link>
                    </div>
                </div>

                < div className="mt-20 grid md:grid-cols-3 gap-8" >
                    <div className="p-6 bg-white rounded-lg shadow-sm" >
                        <h3 className="text-xl font-semibold mb-3" > Fast & Reliable </h3>
                        < p className="text-gray-600" > Generate PDFs in seconds with our optimized infrastructure </p>
                    </div>
                    < div className="p-6 bg-white rounded-lg shadow-sm" >
                        <h3 className="text-xl font-semibold mb-3" > Simple API </h3>
                        < p className="text-gray-600" > Easy - to - use REST API with comprehensive documentation </p>
                    </div>
                    < div className="p-6 bg-white rounded-lg shadow-sm" >
                        <h3 className="text-xl font-semibold mb-3" > Flexible Pricing </h3>
                        < p className="text-gray-600" > Pay - as - you - go plans that scale with your needs </p>
                    </div>
                </div>
            </div>
        </main>
    )
}