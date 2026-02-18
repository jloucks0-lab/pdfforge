'use client'

import { useState } from 'react'

export default function Pricing() {
    const [loading, setLoading] = useState<string | null>(null)
    const [email, setEmail] = useState('')
    const [showEmailPrompt, setShowEmailPrompt] = useState<string | null>(null)

    const handleCheckout = async (planId: string) => {
        if (!email) {
            setShowEmailPrompt(planId)
            return
        }

        setLoading(planId)
        try {
            const response = await fetch('/api/checkout', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ planId, email })
            })

            const data = await response.json()

            if (data.url) {
                window.location.href = data.url
            } else {
                alert('Failed to create checkout session')
                setLoading(null)
            }
        } catch (error) {
            console.error('Checkout error:', error)
            alert('Failed to start checkout')
            setLoading(null)
        }
    }

    return (
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
            {/* Email Prompt Modal */}
            {showEmailPrompt && (
                <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 50 }}>
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', maxWidth: '400px', width: '100%' }}>
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Enter your email</h3>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="your@email.com"
                            style={{ width: '100%', padding: '0.75rem', border: '1px solid #d1d5db', borderRadius: '0.25rem', marginBottom: '1rem' }}
                        />
                        <div style={{ display: 'flex', gap: '1rem' }}>
                            <button
                                onClick={() => setShowEmailPrompt(null)}
                                style={{ flex: 1, padding: '0.75rem', backgroundColor: '#6b7280', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={() => {
                                    setShowEmailPrompt(null)
                                    handleCheckout(showEmailPrompt)
                                }}
                                style={{ flex: 1, padding: '0.75rem', backgroundColor: '#2563eb', color: 'white', borderRadius: '0.25rem', border: 'none', cursor: 'pointer' }}
                            >
                                Continue
                            </button>
                        </div>
                    </div>
                </div>
            )}

            {/* Pricing Cards */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>

                {/* Starter Plan */}
                <div style={{ position: 'relative', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Starter</h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        $19<span style={{ fontSize: '1.125rem', color: '#6b7280' }}>/mo</span>
                    </p>
                    <ul style={{ marginBottom: '2rem', listStyleType: 'none', padding: 0, flexGrow: 1 }}>
                        <li style={{ marginBottom: '0.75rem' }}>✓ 1,000 PDFs/month</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Email support</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ API access</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Basic templates</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ 99.9% uptime SLA</li>
                    </ul>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => handleCheckout('starter')}
                            disabled={loading === 'starter'}
                            style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '600', border: 'none', cursor: loading === 'starter' ? 'not-allowed' : 'pointer', opacity: loading === 'starter' ? 0.7 : 1 }}
                        >
                            {loading === 'starter' ? 'Loading...' : 'Get Started'}
                        </button>
                    </div>
                </div>

                {/* Professional Plan */}
                <div style={{ position: 'relative', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', border: '2px solid #2563eb', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <div style={{ position: 'absolute', top: '-1rem', left: '50%', transform: 'translateX(-50%)', backgroundColor: '#2563eb', color: 'white', padding: '0.25rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: '600', whiteSpace: 'nowrap' }}>
                        Most Popular
                    </div>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Professional</h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        $49<span style={{ fontSize: '1.125rem', color: '#6b7280' }}>/mo</span>
                    </p>
                    <ul style={{ marginBottom: '2rem', listStyleType: 'none', padding: 0, flexGrow: 1 }}>
                        <li style={{ marginBottom: '0.75rem' }}>✓ 10,000 PDFs/month</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Priority support</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ API access</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Custom templates</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ 99.95% uptime SLA</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Webhooks</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Custom headers/footers</li>
                    </ul>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => handleCheckout('professional')}
                            disabled={loading === 'professional'}
                            style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '600', border: 'none', cursor: loading === 'professional' ? 'not-allowed' : 'pointer', opacity: loading === 'professional' ? 0.7 : 1 }}
                        >
                            {loading === 'professional' ? 'Loading...' : 'Get Started'}
                        </button>
                    </div>
                </div>

                {/* Enterprise Plan */}
                <div style={{ position: 'relative', backgroundColor: 'white', padding: '2rem', borderRadius: '0.5rem', boxShadow: '0 1px 3px rgba(0,0,0,0.1)', marginTop: '2rem', display: 'flex', flexDirection: 'column' }}>
                    <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>Enterprise</h3>
                    <p style={{ fontSize: '2.25rem', fontWeight: 'bold', marginBottom: '1.5rem' }}>
                        $100<span style={{ fontSize: '1.125rem', color: '#6b7280' }}>/mo</span>
                    </p>
                    <ul style={{ marginBottom: '2rem', listStyleType: 'none', padding: 0, flexGrow: 1 }}>
                        <li style={{ marginBottom: '0.75rem' }}>✓ 100,000 PDFs/month</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Dedicated support</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ API access</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Unlimited templates</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ 99.99% uptime SLA</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Webhooks</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ Custom branding</li>
                        <li style={{ marginBottom: '0.75rem' }}>✓ On-premise option</li>
                    </ul>
                    <div style={{ textAlign: 'center' }}>
                        <button
                            onClick={() => handleCheckout('enterprise')}
                            disabled={loading === 'enterprise'}
                            style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textAlign: 'center', fontWeight: '600', border: 'none', cursor: loading === 'enterprise' ? 'not-allowed' : 'pointer', opacity: loading === 'enterprise' ? 0.7 : 1 }}
                        >
                            {loading === 'enterprise' ? 'Loading...' : 'Contact Sales'}
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}