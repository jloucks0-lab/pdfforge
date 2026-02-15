import Link from 'next/link'

export default function Header() {
    return (
        <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111', textDecoration: 'none' }}>
                        PdfForge
                    </Link>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link href="/pricing" style={{ color: '#666', textDecoration: 'none' }}>
                            Pricing
                        </Link>
                        <Link href="/docs" style={{ color: '#666', textDecoration: 'none' }}>
                            Docs
                        </Link>
                        <Link href="/dashboard" style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', textDecoration: 'none' }}>
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}