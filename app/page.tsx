import Link from 'next/link'

export default function Home() {
    return (
        <main style={{ minHeight: '100vh' }}>
            {/* Hero Section */}
            <div style={{ background: 'linear-gradient(to bottom, #eff6ff, white)', padding: '4rem 1rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
                    <h1 style={{ fontSize: '3.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem', lineHeight: '1.2' }}>
                        Convert HTML to PDF<br />in Seconds
                    </h1>
                    <p style={{ fontSize: '1.5rem', color: '#4b5563', marginBottom: '2rem', maxWidth: '42rem', margin: '0 auto 2rem' }}>
                        Professional PDF generation API for developers. Transform any HTML or URL into pixel-perfect PDFs instantly.
                    </p>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link
                            href="/pricing"
                            style={{ backgroundColor: '#2563eb', color: 'white', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', fontSize: '1.125rem' }}
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/docs"
                            style={{ backgroundColor: 'white', color: '#2563eb', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', border: '2px solid #2563eb', fontSize: '1.125rem' }}
                        >
                            View Documentation
                        </Link>
                    </div>
                    <p style={{ marginTop: '1.5rem', color: '#6b7280', fontSize: '0.875rem' }}>
                        Start generating PDFs in minutes with our developer-friendly API
                    </p>
                </div>
            </div>

            {/* Features Grid */}
            <div style={{ padding: '5rem 1rem', maxWidth: '1200px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
                    Everything you need to generate PDFs
                </h2>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>⚡</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Lightning Fast</h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Generate PDFs in under 2 seconds. Optimized infrastructure ensures minimal latency.</p>
                    </div>
                    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🎨</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Pixel-Perfect Rendering</h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Full CSS support including Flexbox, Grid, custom fonts, and background images.</p>
                    </div>
                    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔒</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Secure & Private</h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Your data is never stored. PDFs are generated and streamed directly to you.</p>
                    </div>
                    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📄</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Custom Formats</h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Support for A4, Letter, Legal, and custom page sizes with margin control.</p>
                    </div>
                    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🌐</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>URL to PDF</h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Convert any public URL to PDF. Perfect for archiving and documentation.</p>
                    </div>
                    <div style={{ padding: '2rem', backgroundColor: 'white', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📊</div>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Real-Time Analytics</h3>
                        <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Track usage, monitor API health, and view detailed activity logs.</p>
                    </div>
                </div>
            </div>

            {/* Use Cases */}
            <div style={{ backgroundColor: '#f9fafb', padding: '5rem 1rem' }}>
                <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
                        Built for modern applications
                    </h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>📧 Invoices & Receipts</h3>
                            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Generate professional invoices and email them to customers automatically.</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>📈 Reports & Analytics</h3>
                            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Export data visualizations and business reports with charts and tables.</p>
                        </div>
                        <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', border: '1px solid #e5e7eb' }}>
                            <h3 style={{ fontSize: '1.5rem', fontWeight: '600', marginBottom: '1rem' }}>📋 Contracts & Forms</h3>
                            <p style={{ color: '#6b7280', lineHeight: '1.6' }}>Create legally-binding documents with custom branding and signatures.</p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Code Example */}
            <div style={{ padding: '5rem 1rem', maxWidth: '1000px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '1rem' }}>
                    Simple to integrate
                </h2>
                <p style={{ textAlign: 'center', color: '#6b7280', fontSize: '1.125rem', marginBottom: '3rem' }}>
                    Get started with just a few lines of code
                </p>
                <div style={{ backgroundColor: '#1f2937', padding: '2rem', borderRadius: '0.75rem', overflow: 'auto' }}>
                    <pre style={{ color: '#e5e7eb', fontFamily: 'monospace', margin: 0, fontSize: '0.875rem' }}>
                        {`curl -X POST https://pdfforge-production.up.railway.app/api/generate-pdf \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "html": "<h1>Hello World</h1>",
    "options": {
      "format": "A4",
      "printBackground": true
    }
  }' -o document.pdf`}
                    </pre>
                </div>
            </div>

            {/* Social Proof Placeholder */}
            <div style={{ backgroundColor: '#eff6ff', padding: '4rem 1rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto', textAlign: 'center' }}>
                    <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '2rem' }}>
                        Trusted by developers worldwide
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '1.125rem', marginBottom: '2rem' }}>
                        Join hundreds of businesses automating their PDF generation
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '3rem', flexWrap: 'wrap', opacity: 0.6 }}>
                        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>Company Logo</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>Company Logo</div>
                        <div style={{ fontSize: '1.5rem', fontWeight: '600' }}>Company Logo</div>
                    </div>
                </div>
            </div>

            {/* FAQ */}
            <div style={{ padding: '5rem 1rem', maxWidth: '800px', margin: '0 auto' }}>
                <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', textAlign: 'center', marginBottom: '3rem' }}>
                    Frequently Asked Questions
                </h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>How fast is PDF generation?</h3>
                        <p style={{ color: '#6b7280' }}>Most PDFs are generated in under 2 seconds. Complex multi-page documents may take 3-5 seconds.</p>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Do you store my PDFs?</h3>
                        <p style={{ color: '#6b7280' }}>No. PDFs are generated on-demand and streamed directly to you. We never store your content.</p>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>What happens if I exceed my plan limit?</h3>
                        <p style={{ color: '#6b7280' }}>API requests will return a 429 error. You can upgrade your plan anytime from the dashboard.</p>
                    </div>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                        <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '0.5rem' }}>Can I cancel anytime?</h3>
                        <p style={{ color: '#6b7280' }}>Yes! No contracts or commitments. Cancel your subscription anytime from your dashboard.</p>
                    </div>
                </div>
            </div>

            {/* Final CTA */}
            <div style={{ backgroundColor: '#2563eb', padding: '5rem 1rem', textAlign: 'center', color: 'white' }}>
                <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                    <h2 style={{ fontSize: '2.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                        Ready to get started?
                    </h2>
                    <p style={{ fontSize: '1.25rem', marginBottom: '2rem', opacity: 0.9 }}>
                        Start generating PDFs in minutes with our developer-friendly API
                    </p>
                    <Link
                        href="/pricing"
                        style={{ backgroundColor: 'white', color: '#2563eb', padding: '1rem 2.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', fontSize: '1.125rem', display: 'inline-block' }}
                    >
                        View Pricing Plans
                    </Link>
                </div>
            </div>
        </main>
    )
}