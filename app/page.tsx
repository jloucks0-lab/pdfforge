import Link from 'next/link'

export default function Home() {
    return (
        <main style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)' }}>
            <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1rem' }}>
                <div style={{ textAlign: 'center', maxWidth: '56rem', margin: '0 auto' }}>
                    <h1 style={{ fontSize: '3rem', fontWeight: 'bold', color: '#111827', marginBottom: '1.5rem' }}>
                        PdfForge
                    </h1>
                    <p style={{ fontSize: '1.25rem', color: '#4b5563', marginBottom: '2rem' }}>
                        Professional PDF Generation API - Convert HTML and URLs to high-quality PDFs
                    </p>
                    <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center' }}>
                        <Link
                            href="/pricing"
                            style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/docs"
                            style={{ backgroundColor: '#e5e7eb', color: '#1f2937', padding: '0.75rem 2rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}
                        >
                            View Docs
                        </Link>
                    </div>
                </div>

                <div style={{ marginTop: '5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
                    <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Fast & Reliable</h3>
                        <p style={{ color: '#4b5563' }}>Generate PDFs in seconds with our optimized infrastructure</p>
                    </div>
                    <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Simple API</h3>
                        <p style={{ color: '#4b5563' }}>Easy-to-use REST API with comprehensive documentation</p>
                    </div>
                    <div style={{ padding: '1.5rem', backgroundColor: 'white', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
                        <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '0.75rem' }}>Flexible Pricing</h3>
                        <p style={{ color: '#4b5563' }}>Pay-as-you-go plans that scale with your needs</p>
                    </div>
                </div>
            </div>
        </main>
    )
}