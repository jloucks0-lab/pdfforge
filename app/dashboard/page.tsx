'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'

interface UserData {
    user: {
        email: string
        plan: string
        apiKey: string
    }
    usage: {
        current: number
        limit: number
        remaining: number
    }
    recentActivity: Array<{
        endpoint: string
        status: string
        created_at: string
    }>
}

export default function Dashboard() {
    const [copied, setCopied] = useState(false)
    const [data, setData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [apiKey, setApiKey] = useState('')

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search)
        const keyFromUrl = urlParams.get('key')
        const storedKey = localStorage.getItem('pdfforge_api_key')

        const key = keyFromUrl || storedKey

        if (key) {
            setApiKey(key)
            localStorage.setItem('pdfforge_api_key', key)
            fetchUserData(key)
        } else {
            setLoading(false)
        }
    }, [])

    const fetchUserData = async (key: string) => {
        try {
            const response = await fetch('/api/user/me', {
                headers: {
                    'Authorization': `Bearer ${key}`
                }
            })

            if (response.ok) {
                const userData = await response.json()
                setData(userData)
            }
        } catch (error) {
            console.error('Failed to fetch user data:', error)
        } finally {
            setLoading(false)
        }
    }

    const handleCopy = () => {
        if (data?.user.apiKey) {
            navigator.clipboard.writeText(data.user.apiKey)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
        }
    }

    const formatDate = (dateString: string) => {
        const date = new Date(dateString)
        const now = new Date()
        const diffMs = now.getTime() - date.getTime()
        const diffMins = Math.floor(diffMs / 60000)
        const diffHours = Math.floor(diffMs / 3600000)
        const diffDays = Math.floor(diffMs / 86400000)

        if (diffMins < 60) return `${diffMins} minute${diffMins !== 1 ? 's' : ''} ago`
        if (diffHours < 24) return `${diffHours} hour${diffHours !== 1 ? 's' : ''} ago`
        if (diffDays === 1) return 'Yesterday'
        return `${diffDays} days ago`
    }

    const getPlanName = (plan: string) => {
        const names: Record<string, string> = {
            starter: 'Starter',
            professional: 'Professional',
            enterprise: 'Enterprise'
        }
        return names[plan] || plan
    }

    const getPlanPrice = (plan: string) => {
        const prices: Record<string, string> = {
            starter: '$19',
            professional: '$49',
            enterprise: '$100'
        }
        return prices[plan] || ''
    }

    const getUsagePercentage = () => {
        if (!data) return 0
        return (data.usage.current / data.usage.limit) * 100
    }

    const getUsageColor = () => {
        const percentage = getUsagePercentage()
        if (percentage >= 90) return '#ef4444'
        if (percentage >= 70) return '#eab308'
        return '#2563eb'
    }

    if (loading) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div style={{ textAlign: 'center' }}>
                    <div style={{
                        width: '64px',
                        height: '64px',
                        border: '4px solid #e5e7eb',
                        borderTop: '4px solid #2563eb',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem'
                    }}></div>
                    <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)', padding: '4rem 1rem' }}>
                <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
                    <div style={{ background: 'linear-gradient(to right, #fef3c7, #fde68a)', borderLeft: '4px solid #f59e0b', padding: '2rem', borderRadius: '0 0.75rem 0.75rem 0', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '1rem' }}>
                            <span style={{ fontSize: '2.5rem' }}>⚠️</span>
                            <div>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#78350f', marginBottom: '0.5rem' }}>API Key Required</h3>
                                <p style={{ color: '#92400e', fontSize: '1.125rem', marginBottom: '1rem' }}>
                                    Please provide your API key to view your dashboard. You can find it after subscribing to a plan.
                                </p>
                                <Link href="/pricing" style={{ display: 'inline-block', backgroundColor: '#f59e0b', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}>
                                    View Pricing Plans
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div style={{ minHeight: '100vh', background: 'linear-gradient(to bottom, #f9fafb, white)', padding: '2rem 1rem' }}>
            <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
                {/* Header */}
                <div style={{ marginBottom: '2rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <h1 style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Dashboard</h1>
                            <p style={{ fontSize: '1.125rem', color: '#6b7280' }}>{data.user.email}</p>
                        </div>
                        <Link href="/docs" style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            📖 View Documentation
                        </Link>
                    </div>
                </div>

                {/* Usage Warning */}
                {getUsagePercentage() >= 90 && (
                    <div style={{ background: 'linear-gradient(to right, #fee2e2, #fecaca)', borderLeft: '4px solid #ef4444', padding: '1.5rem', borderRadius: '0 0.75rem 0.75rem 0', marginBottom: '1.5rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)' }}>
                        <div style={{ display: 'flex', alignItems: 'start', gap: '0.75rem' }}>
                            <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#7f1d1d', marginBottom: '0.25rem' }}>Usage Alert</h3>
                                <p style={{ color: '#991b1b' }}>You've used {Math.round(getUsagePercentage())}% of your monthly limit. Consider upgrading your plan to avoid service interruption.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* API Key Section */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', alignItems: 'start', gap: '1rem', marginBottom: '1rem' }}>
                        <span style={{ fontSize: '2.5rem' }}>🔑</span>
                        <div style={{ flex: 1 }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Your API Key</h2>
                            <p style={{ color: '#6b7280', marginBottom: '1rem' }}>Use this key to authenticate your API requests. Keep it secure and never share it publicly.</p>
                        </div>
                    </div>
                    <div style={{ background: 'linear-gradient(to right, #f9fafb, #f3f4f6)', padding: '1.25rem', borderRadius: '0.5rem', border: '2px solid #e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '1rem', flexWrap: 'wrap' }}>
                        <code style={{ fontFamily: 'monospace', fontSize: '0.875rem', flex: 1, minWidth: '200px', wordBreak: 'break-all', color: '#374151' }}>{data.user.apiKey}</code>
                        <button
                            onClick={handleCopy}
                            style={{ backgroundColor: copied ? '#10b981' : '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                        >
                            {copied ? '✓ Copied!' : '📋 Copy'}
                        </button>
                    </div>
                </div>

                {/* Usage Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>This Month</h3>
                            <span style={{ fontSize: '2rem' }}>📈</span>
                        </div>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>{data.usage.current.toLocaleString()}</p>
                        <p style={{ color: '#6b7280' }}>PDFs generated</p>
                        <div style={{ marginTop: '1rem', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                            <div style={{ backgroundColor: getUsageColor(), height: '100%', width: `${Math.min(getUsagePercentage(), 100)}%`, transition: 'width 0.3s' }}></div>
                        </div>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Plan Limit</h3>
                            <span style={{ fontSize: '2rem' }}>🎯</span>
                        </div>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>{data.usage.limit.toLocaleString()}</p>
                        <p style={{ color: '#6b7280' }}>PDFs per month</p>
                    </div>

                    <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                            <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Remaining</h3>
                            <span style={{ fontSize: '2rem' }}>✨</span>
                        </div>
                        <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>{data.usage.remaining.toLocaleString()}</p>
                        <p style={{ color: '#6b7280' }}>PDFs available</p>
                    </div>
                </div>

                {/* Current Plan */}
                <div style={{ background: 'linear-gradient(to right, #2563eb, #1e40af)', color: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 10px 15px rgba(0,0,0,0.1)', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                        <div>
                            <p style={{ color: '#bfdbfe', fontSize: '0.875rem', fontWeight: '600', marginBottom: '0.25rem' }}>CURRENT PLAN</p>
                            <h2 style={{ fontSize: '2rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>{getPlanName(data.user.plan)} Plan</h2>
                            <p style={{ fontSize: '1.25rem', color: '#dbeafe' }}>
                                {getPlanPrice(data.user.plan)}<span style={{ fontSize: '0.875rem' }}>/month</span> • {data.usage.limit.toLocaleString()} PDFs
                            </p>
                        </div>
                        <Link href="/pricing" style={{ backgroundColor: 'white', color: '#2563eb', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                            🚀 Upgrade Plan
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
                        <span style={{ fontSize: '2rem' }}>📊</span>
                        <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Recent Activity</h2>
                    </div>
                    {data.recentActivity.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                            <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🚀</span>
                            <p style={{ fontSize: '1.25rem', color: '#6b7280', marginBottom: '0.5rem' }}>No activity yet</p>
                            <p style={{ color: '#9ca3af', marginBottom: '1.5rem' }}>Start using your API key to generate PDFs!</p>
                            <Link href="/docs" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', textDecoration: 'none' }}>
                                View API Documentation
                            </Link>
                        </div>
                    ) : (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                            {data.recentActivity.map((activity, index) => (
                                <div key={index} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1rem', backgroundColor: '#f9fafb', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <span style={{ fontSize: '1.5rem' }}>{activity.status === 'success' ? '✅' : '❌'}</span>
                                        <div>
                                            <p style={{ fontWeight: '600', color: '#111827', marginBottom: '0.25rem' }}>{activity.endpoint}</p>
                                            <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>{formatDate(activity.created_at)}</p>
                                        </div>
                                    </div>
                                    <span style={{ padding: '0.5rem 1rem', borderRadius: '9999px', fontSize: '0.875rem', fontWeight: 'bold', backgroundColor: activity.status === 'success' ? '#d1fae5' : '#fee2e2', color: activity.status === 'success' ? '#065f46' : '#7f1d1d' }}>
                                        {activity.status === 'success' ? 'Success' : 'Failed'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}