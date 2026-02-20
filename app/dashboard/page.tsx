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

interface ApiKey {
    id: string
    name: string
    key: string
    is_active: boolean
    created_at: string
    last_used_at: string | null
}

interface RequestLog {
    id: number
    endpoint: string
    method: string
    status_code: number
    response_time_ms: number | null
    error_message: string | null
    created_at: string
}

interface WebhookConfig {
    webhook_url: string | null
    webhook_enabled: boolean
    webhook_secret: string | null
}

export default function Dashboard() {
    const [copied, setCopied] = useState(false)
    const [data, setData] = useState<UserData | null>(null)
    const [loading, setLoading] = useState(true)
    const [apiKey, setApiKey] = useState('')
    const [activeTab, setActiveTab] = useState<'overview' | 'keys' | 'logs' | 'webhooks'>('overview')

    // API Keys state
    const [apiKeys, setApiKeys] = useState<ApiKey[]>([])
    const [loadingKeys, setLoadingKeys] = useState(false)
    const [showCreateKey, setShowCreateKey] = useState(false)
    const [newKeyName, setNewKeyName] = useState('')
    const [createdKey, setCreatedKey] = useState<string | null>(null)

    // Request Logs state
    const [requestLogs, setRequestLogs] = useState<RequestLog[]>([])
    const [loadingLogs, setLoadingLogs] = useState(false)
    const [logsFilter, setLogsFilter] = useState<'all' | 'success' | 'error'>('all')

    // Webhooks state
    const [webhookConfig, setWebhookConfig] = useState<WebhookConfig | null>(null)
    const [loadingWebhook, setLoadingWebhook] = useState(false)
    const [webhookUrl, setWebhookUrl] = useState('')
    const [webhookEnabled, setWebhookEnabled] = useState(false)

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

    const fetchApiKeys = async () => {
        if (!apiKey) return
        setLoadingKeys(true)
        try {
            const response = await fetch('/api/keys', {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            })
            if (response.ok) {
                const result = await response.json()
                setApiKeys(result.keys || [])
            }
        } catch (error) {
            console.error('Failed to fetch API keys:', error)
        } finally {
            setLoadingKeys(false)
        }
    }

    const createApiKey = async () => {
        if (!apiKey || !newKeyName.trim()) return
        try {
            const response = await fetch('/api/keys/create', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name: newKeyName.trim() })
            })
            if (response.ok) {
                const result = await response.json()
                setCreatedKey(result.key.key)
                setNewKeyName('')
                setShowCreateKey(false)
                fetchApiKeys()
            }
        } catch (error) {
            console.error('Failed to create API key:', error)
        }
    }

    const deleteApiKey = async (keyId: string) => {
        if (!apiKey || !confirm('Are you sure you want to delete this API key? This action cannot be undone.')) return
        try {
            const response = await fetch(`/api/keys/${keyId}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${apiKey}` }
            })
            if (response.ok) {
                fetchApiKeys()
            }
        } catch (error) {
            console.error('Failed to delete API key:', error)
        }
    }

    const fetchRequestLogs = async () => {
        if (!apiKey) return
        setLoadingLogs(true)
        try {
            const statusParam = logsFilter !== 'all' ? `&status=${logsFilter}` : ''
            const response = await fetch(`/api/logs?limit=50${statusParam}`, {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            })
            if (response.ok) {
                const result = await response.json()
                setRequestLogs(result.logs || [])
            }
        } catch (error) {
            console.error('Failed to fetch logs:', error)
        } finally {
            setLoadingLogs(false)
        }
    }

    const fetchWebhookConfig = async () => {
        if (!apiKey) return
        setLoadingWebhook(true)
        try {
            const response = await fetch('/api/webhooks/config', {
                headers: { 'Authorization': `Bearer ${apiKey}` }
            })
            if (response.ok) {
                const result = await response.json()
                setWebhookConfig(result)
                setWebhookUrl(result.webhook_url || '')
                setWebhookEnabled(result.webhook_enabled || false)
            }
        } catch (error) {
            console.error('Failed to fetch webhook config:', error)
        } finally {
            setLoadingWebhook(false)
        }
    }

    const saveWebhookConfig = async () => {
        if (!apiKey) return
        try {
            const response = await fetch('/api/webhooks/config', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    webhook_url: webhookUrl,
                    webhook_enabled: webhookEnabled
                })
            })
            if (response.ok) {
                const result = await response.json()
                if (result.webhook_secret) {
                    alert(`Webhook configured! Your secret: ${result.webhook_secret}\n\nSave this secret - you'll need it to verify webhook signatures.`)
                }
                fetchWebhookConfig()
            }
        } catch (error) {
            console.error('Failed to save webhook config:', error)
        }
    }

    useEffect(() => {
        if (activeTab === 'keys' && apiKey) fetchApiKeys()
        if (activeTab === 'logs' && apiKey) fetchRequestLogs()
        if (activeTab === 'webhooks' && apiKey) fetchWebhookConfig()
    }, [activeTab, apiKey])

    useEffect(() => {
        if (activeTab === 'logs' && apiKey) fetchRequestLogs()
    }, [logsFilter])

    const handleCopy = (text: string) => {
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
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

    const getRateLimit = (plan: string) => {
        const limits: Record<string, number> = {
            starter: 10,
            professional: 50,
            enterprise: 200
        }
        return limits[plan] || 10
    }

    const getApiKeyLimit = (plan: string) => {
        const limits: Record<string, number> = {
            starter: 1,
            professional: 5,
            enterprise: 10
        }
        return limits[plan] || 1
    }

    const getBatchLimit = (plan: string) => {
        const limits: Record<string, number> = {
            starter: 10,
            professional: 50,
            enterprise: 100
        }
        return limits[plan] || 10
    }

    const getLogRetentionDays = (plan: string) => {
        const days: Record<string, number> = {
            starter: 7,
            professional: 30,
            enterprise: 90
        }
        return days[plan] || 7
    }

    const webhooksAvailable = (plan: string) => {
        return plan === 'professional' || plan === 'enterprise'
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

                {/* Tabs */}
                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', marginBottom: '1.5rem', border: '1px solid #e5e7eb' }}>
                    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                        {(['overview', 'keys', 'logs', 'webhooks'] as const).map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                style={{
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: 'pointer',
                                    backgroundColor: activeTab === tab ? '#2563eb' : 'transparent',
                                    color: activeTab === tab ? 'white' : '#6b7280',
                                    transition: 'all 0.2s'
                                }}
                                onMouseEnter={(e) => {
                                    if (activeTab !== tab) {
                                        e.currentTarget.style.backgroundColor = '#f3f4f6'
                                    }
                                }}
                                onMouseLeave={(e) => {
                                    if (activeTab !== tab) {
                                        e.currentTarget.style.backgroundColor = 'transparent'
                                    }
                                }}
                            >
                                {tab === 'overview' && '📊 Overview'}
                                {tab === 'keys' && '🔑 API Keys'}
                                {tab === 'logs' && '📝 Request Logs'}
                                {tab === 'webhooks' && '🔗 Webhooks'}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Overview Tab */}
                {activeTab === 'overview' && (
                    <>
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
                                    onClick={() => handleCopy(data.user.apiKey)}
                                    style={{ backgroundColor: copied ? '#10b981' : '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer', transition: 'opacity 0.2s', whiteSpace: 'nowrap', boxShadow: '0 2px 4px rgba(0,0,0,0.1)' }}
                                >
                                    {copied ? '✓ Copied!' : '📋 Copy'}
                                </button>
                            </div>
                        </div>

                        {/* Usage Stats + Rate Limits Grid */}
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '1.5rem' }}>
                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Monthly Usage</h3>
                                    <span style={{ fontSize: '2rem' }}>📈</span>
                                </div>
                                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#2563eb', marginBottom: '0.5rem' }}>{data.usage.current.toLocaleString()}</p>
                                <p style={{ color: '#6b7280' }}>of {data.usage.limit.toLocaleString()} PDFs</p>
                                <div style={{ marginTop: '1rem', backgroundColor: '#e5e7eb', borderRadius: '9999px', height: '8px', overflow: 'hidden' }}>
                                    <div style={{ backgroundColor: getUsageColor(), height: '100%', width: `${Math.min(getUsagePercentage(), 100)}%`, transition: 'width 0.3s' }}></div>
                                </div>
                            </div>

                            <div style={{ backgroundColor: 'white', padding: '1.5rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151' }}>Rate Limit</h3>
                                    <span style={{ fontSize: '2rem' }}>⚡</span>
                                </div>
                                <p style={{ fontSize: '2.5rem', fontWeight: 'bold', color: '#10b981', marginBottom: '0.5rem' }}>{getRateLimit(data.user.plan)}</p>
                                <p style={{ color: '#6b7280' }}>requests per minute</p>
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
                                    <p style={{ fontSize: '1.25rem', color: '#dbeafe', marginBottom: '1rem' }}>
                                        {getPlanPrice(data.user.plan)}<span style={{ fontSize: '0.875rem' }}>/month</span>
                                    </p>
                                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: '#dbeafe' }}>
                                        <div>📄 {data.usage.limit.toLocaleString()} PDFs/mo</div>
                                        <div>⚡ {getRateLimit(data.user.plan)} req/min</div>
                                        <div>🔑 {getApiKeyLimit(data.user.plan)} API {getApiKeyLimit(data.user.plan) === 1 ? 'key' : 'keys'}</div>
                                        <div>📦 {getBatchLimit(data.user.plan)} batch max</div>
                                        <div>📝 {getLogRetentionDays(data.user.plan)}d logs</div>
                                        <div>{webhooksAvailable(data.user.plan) ? '✅ Webhooks' : '🔒 No webhooks'}</div>
                                    </div>
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
                                    {data.recentActivity.slice(0, 10).map((activity, index) => (
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
                    </>
                )}

                {/* API Keys Tab */}
                {activeTab === 'keys' && (
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>API Key Management</h2>
                                <p style={{ color: '#6b7280' }}>Create and manage multiple API keys for different environments</p>
                                <p style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '600', marginTop: '0.5rem' }}>
                                    Your plan allows {getApiKeyLimit(data?.user.plan || 'starter')} API {getApiKeyLimit(data?.user.plan || 'starter') === 1 ? 'key' : 'keys'}
                                </p>
                            </div>
                            <button
                                onClick={() => setShowCreateKey(true)}
                                disabled={apiKeys.length >= getApiKeyLimit(data?.user.plan || 'starter')}
                                style={{
                                    backgroundColor: apiKeys.length >= getApiKeyLimit(data?.user.plan || 'starter') ? '#9ca3af' : '#2563eb',
                                    color: 'white',
                                    padding: '0.75rem 1.5rem',
                                    borderRadius: '0.5rem',
                                    fontWeight: '600',
                                    border: 'none',
                                    cursor: apiKeys.length >= getApiKeyLimit(data?.user.plan || 'starter') ? 'not-allowed' : 'pointer',
                                    boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                }}
                            >
                                ➕ Create New Key
                            </button>
                        </div>

                        {/* Plan limit warning */}
                        {apiKeys.length >= getApiKeyLimit(data?.user.plan || 'starter') && (
                            <div style={{ backgroundColor: '#fef3c7', border: '2px solid #f59e0b', padding: '1rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                                <p style={{ color: '#92400e', fontWeight: '600' }}>
                                    ⚠️ You've reached your plan's API key limit ({getApiKeyLimit(data?.user.plan || 'starter')} {getApiKeyLimit(data?.user.plan || 'starter') === 1 ? 'key' : 'keys'}).{' '}
                                    <Link href="/pricing" style={{ color: '#2563eb', textDecoration: 'underline' }}>Upgrade your plan</Link> to create more keys.
                                </p>
                            </div>
                        )}

                        {/* Create Key Modal */}
                        {showCreateKey && (
                            <div style={{ backgroundColor: '#eff6ff', border: '2px solid #2563eb', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '1rem', color: '#1e40af' }}>Create New API Key</h3>
                                <input
                                    type="text"
                                    placeholder="Key name (e.g., Production, Staging)"
                                    value={newKeyName}
                                    onChange={(e) => setNewKeyName(e.target.value)}
                                    style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', marginBottom: '1rem', fontSize: '1rem' }}
                                />
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={createApiKey}
                                        disabled={!newKeyName.trim()}
                                        style={{ backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: newKeyName.trim() ? 'pointer' : 'not-allowed', opacity: newKeyName.trim() ? 1 : 0.5 }}
                                    >
                                        Create Key
                                    </button>
                                    <button
                                        onClick={() => { setShowCreateKey(false); setNewKeyName('') }}
                                        style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* Created Key Display */}
                        {createdKey && (
                            <div style={{ backgroundColor: '#d1fae5', border: '2px solid #10b981', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', marginBottom: '0.5rem', color: '#065f46' }}>✅ Key Created Successfully!</h3>
                                <p style={{ color: '#047857', marginBottom: '1rem' }}>Save this key now - you won't be able to see it again!</p>
                                <div style={{ backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem', wordBreak: 'break-all', marginBottom: '1rem' }}>
                                    {createdKey}
                                </div>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    <button
                                        onClick={() => handleCopy(createdKey)}
                                        style={{ backgroundColor: '#10b981', color: 'white', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                                    >
                                        📋 Copy Key
                                    </button>
                                    <button
                                        onClick={() => setCreatedKey(null)}
                                        style={{ backgroundColor: '#e5e7eb', color: '#374151', padding: '0.75rem 1.5rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer' }}
                                    >
                                        Done
                                    </button>
                                </div>
                            </div>
                        )}

                        {/* API Keys List */}
                        {loadingKeys ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <p style={{ color: '#6b7280' }}>Loading API keys...</p>
                            </div>
                        ) : apiKeys.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🔑</span>
                                <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>No API keys yet</p>
                                <p style={{ color: '#9ca3af' }}>Create your first API key to get started</p>
                            </div>
                        ) : (
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                {apiKeys.map(key => (
                                    <div key={key.id} style={{ border: '1px solid #e5e7eb', borderRadius: '0.75rem', padding: '1.5rem' }}>
                                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
                                            <div style={{ flex: 1 }}>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', color: '#111827' }}>{key.name}</h3>
                                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '9999px', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: key.is_active ? '#d1fae5' : '#fee2e2', color: key.is_active ? '#065f46' : '#7f1d1d' }}>
                                                        {key.is_active ? 'Active' : 'Inactive'}
                                                    </span>
                                                </div>
                                                <code style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#6b7280' }}>{key.key}</code>
                                                <p style={{ fontSize: '0.875rem', color: '#9ca3af', marginTop: '0.5rem' }}>
                                                    Created {formatDate(key.created_at)} {key.last_used_at && `• Last used ${formatDate(key.last_used_at)}`}
                                                </p>
                                            </div>
                                            <button
                                                onClick={() => deleteApiKey(key.id)}
                                                style={{ backgroundColor: '#ef4444', color: 'white', padding: '0.5rem 1rem', borderRadius: '0.5rem', fontWeight: '600', border: 'none', cursor: 'pointer', fontSize: '0.875rem' }}
                                            >
                                                🗑️ Delete
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div style={{ marginTop: '2rem', padding: '1rem', backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: '0.5rem' }}>
                            <p style={{ color: '#1e40af', fontSize: '0.875rem' }}>
                                💡 <strong>Tip:</strong> Create separate API keys for production, staging, and development environments. You can revoke compromised keys without affecting other services.
                            </p>
                        </div>
                    </div>
                )}

                {/* Request Logs Tab */}
                {activeTab === 'logs' && (
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '2rem', flexWrap: 'wrap', gap: '1rem' }}>
                            <div>
                                <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Request Logs</h2>
                                <p style={{ color: '#6b7280' }}>View detailed logs of all API requests</p>
                                <p style={{ fontSize: '0.875rem', color: '#2563eb', fontWeight: '600', marginTop: '0.5rem' }}>
                                    Showing last {getLogRetentionDays(data?.user.plan || 'starter')} days of activity
                                </p>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem' }}>
                                {(['all', 'success', 'error'] as const).map(filter => (
                                    <button
                                        key={filter}
                                        onClick={() => setLogsFilter(filter)}
                                        style={{
                                            padding: '0.5rem 1rem',
                                            borderRadius: '0.5rem',
                                            border: 'none',
                                            cursor: 'pointer',
                                            fontWeight: '600',
                                            fontSize: '0.875rem',
                                            backgroundColor: logsFilter === filter ? '#2563eb' : '#f3f4f6',
                                            color: logsFilter === filter ? 'white' : '#6b7280'
                                        }}
                                    >
                                        {filter === 'all' && '📋 All'}
                                        {filter === 'success' && '✅ Success'}
                                        {filter === 'error' && '❌ Errors'}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {loadingLogs ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <p style={{ color: '#6b7280' }}>Loading request logs...</p>
                            </div>
                        ) : requestLogs.length === 0 ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>📝</span>
                                <p style={{ fontSize: '1.25rem', color: '#6b7280' }}>No logs found</p>
                                <p style={{ color: '#9ca3af' }}>API requests will appear here</p>
                            </div>
                        ) : (
                            <div style={{ overflowX: 'auto' }}>
                                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                                    <thead style={{ backgroundColor: '#f9fafb', borderBottom: '2px solid #e5e7eb' }}>
                                        <tr>
                                            <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600', color: '#374151' }}>Endpoint</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600', color: '#374151' }}>Method</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600', color: '#374151' }}>Status</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600', color: '#374151' }}>Response Time</th>
                                            <th style={{ textAlign: 'left', padding: '1rem', fontWeight: '600', color: '#374151' }}>Time</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {requestLogs.map(log => (
                                            <tr key={log.id} style={{ borderBottom: '1px solid #e5e7eb' }}>
                                                <td style={{ padding: '1rem', fontFamily: 'monospace', fontSize: '0.875rem' }}>{log.endpoint}</td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{ padding: '0.25rem 0.75rem', borderRadius: '0.25rem', fontSize: '0.75rem', fontWeight: 'bold', backgroundColor: '#eff6ff', color: '#1e40af' }}>
                                                        {log.method}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem' }}>
                                                    <span style={{
                                                        padding: '0.25rem 0.75rem',
                                                        borderRadius: '0.25rem',
                                                        fontSize: '0.75rem',
                                                        fontWeight: 'bold',
                                                        backgroundColor: log.status_code >= 200 && log.status_code < 300 ? '#d1fae5' : '#fee2e2',
                                                        color: log.status_code >= 200 && log.status_code < 300 ? '#065f46' : '#7f1d1d'
                                                    }}>
                                                        {log.status_code}
                                                    </span>
                                                </td>
                                                <td style={{ padding: '1rem', color: '#6b7280' }}>
                                                    {log.response_time_ms ? `${log.response_time_ms}ms` : '-'}
                                                </td>
                                                <td style={{ padding: '1rem', color: '#9ca3af', fontSize: '0.875rem' }}>
                                                    {formatDate(log.created_at)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}

                {/* Webhooks Tab */}
                {activeTab === 'webhooks' && (
                    <div style={{ backgroundColor: 'white', padding: '2rem', borderRadius: '0.75rem', boxShadow: '0 4px 6px rgba(0,0,0,0.07)', border: '1px solid #e5e7eb' }}>
                        <div style={{ marginBottom: '2rem' }}>
                            <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '0.5rem' }}>Webhook Configuration</h2>
                            <p style={{ color: '#6b7280' }}>Receive real-time notifications for PDF generation events</p>
                        </div>

                        {!webhooksAvailable(data?.user.plan || 'starter') ? (
                            <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                                <span style={{ fontSize: '4rem', display: 'block', marginBottom: '1rem' }}>🔒</span>
                                <h3 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#111827', marginBottom: '0.5rem' }}>Webhooks Not Available</h3>
                                <p style={{ fontSize: '1.125rem', color: '#6b7280', marginBottom: '2rem' }}>
                                    Webhooks are available on Professional and Enterprise plans
                                </p>
                                <Link href="/pricing" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '1rem 2rem', borderRadius: '0.5rem', fontWeight: 'bold', textDecoration: 'none', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
                                    🚀 Upgrade to Professional
                                </Link>
                            </div>
                        ) : loadingWebhook ? (
                            <div style={{ textAlign: 'center', padding: '3rem' }}>
                                <p style={{ color: '#6b7280' }}>Loading webhook configuration...</p>
                            </div>
                        ) : (
                            <>
                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem', color: '#374151' }}>
                                        Webhook URL
                                    </label>
                                    <input
                                        type="url"
                                        placeholder="https://your-app.com/webhooks/pdfforge"
                                        value={webhookUrl}
                                        onChange={(e) => setWebhookUrl(e.target.value)}
                                        style={{ width: '100%', padding: '0.75rem', borderRadius: '0.5rem', border: '1px solid #d1d5db', fontSize: '1rem', marginBottom: '1rem' }}
                                    />
                                    <p style={{ fontSize: '0.875rem', color: '#6b7280' }}>Must be a valid HTTPS URL</p>
                                </div>

                                <div style={{ marginBottom: '2rem' }}>
                                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', cursor: 'pointer' }}>
                                        <input
                                            type="checkbox"
                                            checked={webhookEnabled}
                                            onChange={(e) => setWebhookEnabled(e.target.checked)}
                                            style={{ width: '20px', height: '20px', cursor: 'pointer' }}
                                        />
                                        <span style={{ fontWeight: '600', color: '#374151' }}>Enable webhook notifications</span>
                                    </label>
                                </div>

                                <button
                                    onClick={saveWebhookConfig}
                                    disabled={!webhookUrl.trim() || !webhookUrl.startsWith('https://')}
                                    style={{
                                        backgroundColor: '#2563eb',
                                        color: 'white',
                                        padding: '0.75rem 1.5rem',
                                        borderRadius: '0.5rem',
                                        fontWeight: '600',
                                        border: 'none',
                                        cursor: webhookUrl.trim() && webhookUrl.startsWith('https://') ? 'pointer' : 'not-allowed',
                                        opacity: webhookUrl.trim() && webhookUrl.startsWith('https://') ? 1 : 0.5,
                                        marginBottom: '2rem'
                                    }}
                                >
                                    💾 Save Configuration
                                </button>

                                {webhookConfig?.webhook_secret && (
                                    <div style={{ backgroundColor: '#eff6ff', border: '1px solid #bfdbfe', padding: '1.5rem', borderRadius: '0.75rem', marginBottom: '2rem' }}>
                                        <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '0.75rem', color: '#1e40af' }}>🔐 Webhook Secret</h3>
                                        <p style={{ color: '#1e40af', marginBottom: '1rem', fontSize: '0.875rem' }}>Use this secret to verify webhook signatures:</p>
                                        <code style={{ display: 'block', backgroundColor: 'white', padding: '1rem', borderRadius: '0.5rem', fontFamily: 'monospace', fontSize: '0.875rem', wordBreak: 'break-all' }}>
                                            {webhookConfig.webhook_secret}
                                        </code>
                                    </div>
                                )}

                                <div style={{ backgroundColor: '#f9fafb', border: '1px solid #e5e7eb', padding: '1.5rem', borderRadius: '0.75rem' }}>
                                    <h3 style={{ fontSize: '1.125rem', fontWeight: 'bold', marginBottom: '1rem' }}>Webhook Events</h3>
                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                                        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '1.5rem' }}>✅</span>
                                                <strong>pdf.generated</strong>
                                            </div>
                                            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '2.25rem' }}>Triggered when a PDF is successfully generated</p>
                                        </div>
                                        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '1.5rem' }}>⚠️</span>
                                                <strong>usage.warning</strong>
                                            </div>
                                            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '2.25rem' }}>Triggered when you reach 90% of your monthly limit</p>
                                        </div>
                                        <div style={{ padding: '1rem', backgroundColor: 'white', borderRadius: '0.5rem', border: '1px solid #e5e7eb' }}>
                                            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
                                                <span style={{ fontSize: '1.5rem' }}>❌</span>
                                                <strong>api.error</strong>
                                            </div>
                                            <p style={{ color: '#6b7280', fontSize: '0.875rem', marginLeft: '2.25rem' }}>Triggered when an API request fails</p>
                                        </div>
                                    </div>
                                </div>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}