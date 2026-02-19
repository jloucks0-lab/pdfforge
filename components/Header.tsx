'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Header() {
    const pathname = usePathname()

    const isActive = (path: string) => {
        if (path === '/') {
            return pathname === '/'
        }
        return pathname.startsWith(path)
    }

    const linkStyle = (path: string) => {
        if (isActive(path)) {
            return {
                backgroundColor: '#2563eb',
                color: 'white',
                padding: '0.5rem 1rem',
                borderRadius: '0.5rem',
                textDecoration: 'none',
                transition: 'all 0.2s'
            }
        }
        return {
            color: '#666',
            textDecoration: 'none',
            transition: 'color 0.2s',
            cursor: 'pointer'
        }
    }

    return (
        <header style={{ backgroundColor: 'white', boxShadow: '0 1px 3px rgba(0,0,0,0.1)' }}>
            <nav style={{ maxWidth: '1200px', margin: '0 auto', padding: '1rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Link href="/" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111', textDecoration: 'none' }}>
                        PdfForge
                    </Link>
                    <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
                        <Link
                            href="/pricing"
                            style={linkStyle('/pricing')}
                            onMouseEnter={(e) => {
                                if (!isActive('/pricing')) {
                                    e.currentTarget.style.color = '#2563eb'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive('/pricing')) {
                                    e.currentTarget.style.color = '#666'
                                }
                            }}
                        >
                            Pricing
                        </Link>
                        <Link
                            href="/docs"
                            style={linkStyle('/docs')}
                            onMouseEnter={(e) => {
                                if (!isActive('/docs')) {
                                    e.currentTarget.style.color = '#2563eb'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (!isActive('/docs')) {
                                    e.currentTarget.style.color = '#666'
                                }
                            }}
                        >
                            Docs
                        </Link>
                        <Link
                            href="/dashboard"
                            style={linkStyle('/dashboard')}
                            onMouseEnter={(e) => {
                                if (isActive('/dashboard')) {
                                    e.currentTarget.style.backgroundColor = '#1e40af'
                                } else {
                                    e.currentTarget.style.color = '#2563eb'
                                }
                            }}
                            onMouseLeave={(e) => {
                                if (isActive('/dashboard')) {
                                    e.currentTarget.style.backgroundColor = '#2563eb'
                                } else {
                                    e.currentTarget.style.color = '#666'
                                }
                            }}
                        >
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}