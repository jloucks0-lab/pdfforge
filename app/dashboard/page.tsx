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
        if (percentage >= 90) return 'bg-red-500'
        if (percentage >= 70) return 'bg-yellow-500'
        return 'bg-blue-500'
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
                    <p className="text-xl text-gray-600">Loading your dashboard...</p>
                </div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-16">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="bg-gradient-to-r from-yellow-50 to-yellow-100 border-l-4 border-yellow-500 p-8 rounded-r-xl shadow-lg">
                        <div className="flex items-start gap-4">
                            <span className="text-4xl">⚠️</span>
                            <div>
                                <h3 className="text-2xl font-bold text-yellow-900 mb-2">API Key Required</h3>
                                <p className="text-yellow-800 text-lg mb-4">
                                    Please provide your API key to view your dashboard. You can find it after subscribing to a plan.
                                </p>
                                <Link href="/pricing" className="inline-block bg-yellow-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-yellow-700 transition">
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
        <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white py-8">
            <div className="container mx-auto px-4 max-w-7xl">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <h1 className="text-4xl font-bold text-gray-900 mb-2">Dashboard</h1>
                            <p className="text-lg text-gray-600">{data.user.email}</p>
                        </div>
                        <Link href="/docs" className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition shadow-lg">
                            📖 View Documentation
                        </Link>
                    </div>
                </div>

                {/* Usage Warning */}
                {getUsagePercentage() >= 90 && (
                    <div className="bg-gradient-to-r from-red-50 to-red-100 border-l-4 border-red-500 p-6 rounded-r-xl mb-6 shadow-lg">
                        <div className="flex items-start gap-3">
                            <span className="text-2xl">⚠️</span>
                            <div>
                                <h3 className="text-lg font-bold text-red-900 mb-1">Usage Alert</h3>
                                <p className="text-red-800">You've used {Math.round(getUsagePercentage())}% of your monthly limit. Consider upgrading your plan to avoid service interruption.</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* API Key Section */}
                <div className="bg-white p-8 rounded-xl shadow-lg mb-6 border border-gray-100">
                    <div className="flex items-start gap-4 mb-4">
                        <span className="text-4xl">🔑</span>
                        <div className="flex-1">
                            <h2 className="text-2xl font-bold mb-2">Your API Key</h2>
                            <p className="text-gray-600 mb-4">Use this key to authenticate your API requests. Keep it secure and never share it publicly.</p>
                        </div>
                    </div>
                    <div className="bg-gradient-to-r from-gray-50 to-gray-100 p-5 rounded-lg border-2 border-gray-200 flex items-center justify-between gap-4">
                        <code className="font-mono text-sm flex-1 truncate text-gray-700">{data.user.apiKey}</code>
                        <button
                            onClick={handleCopy}
                            className={`${copied ? 'bg-green-600' : 'bg-blue-600'} text-white px-6 py-3 rounded-lg font-semibold hover:opacity-90 transition whitespace-nowrap shadow-md`}
                        >
                            {copied ? '✓ Copied!' : '📋 Copy'}
                        </button>
                    </div>
                </div>

                {/* Usage Stats Grid */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">This Month</h3>
                            <span className="text-3xl">📈</span>
                        </div>
                        <p className="text-4xl font-bold text-blue-600 mb-2">{data.usage.current.toLocaleString()}</p>
                        <p className="text-gray-500">PDFs generated</p>
                        <div className="mt-4 bg-gray-200 rounded-full h-2 overflow-hidden">
                            <div className={`h-full ${getUsageColor()} transition-all duration-300`} style={{ width: `${Math.min(getUsagePercentage(), 100)}%` }}></div>
                        </div>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Plan Limit</h3>
                            <span className="text-3xl">🎯</span>
                        </div>
                        <p className="text-4xl font-bold text-gray-900 mb-2">{data.usage.limit.toLocaleString()}</p>
                        <p className="text-gray-500">PDFs per month</p>
                    </div>

                    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-xl transition">
                        <div className="flex items-center justify-between mb-4">
                            <h3 className="text-lg font-semibold text-gray-700">Remaining</h3>
                            <span className="text-3xl">✨</span>
                        </div>
                        <p className="text-4xl font-bold text-green-600 mb-2">{data.usage.remaining.toLocaleString()}</p>
                        <p className="text-gray-500">PDFs available</p>
                    </div>
                </div>

                {/* Current Plan */}
                <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-8 rounded-xl shadow-xl mb-6">
                    <div className="flex items-center justify-between flex-wrap gap-4">
                        <div>
                            <p className="text-blue-200 text-sm font-semibold mb-1">CURRENT PLAN</p>
                            <h2 className="text-3xl font-bold mb-2">{getPlanName(data.user.plan)} Plan</h2>
                            <p className="text-xl text-blue-100">
                                {getPlanPrice(data.user.plan)}<span className="text-sm">/month</span> • {data.usage.limit.toLocaleString()} PDFs
                            </p>
                        </div>
                        <Link href="/pricing" className="bg-white text-blue-600 px-8 py-4 rounded-lg font-bold hover:bg-blue-50 transition shadow-lg">
                            🚀 Upgrade Plan
                        </Link>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-8 rounded-xl shadow-lg border border-gray-100">
                    <div className="flex items-center gap-3 mb-6">
                        <span className="text-4xl">📊</span>
                        <h2 className="text-2xl font-bold">Recent Activity</h2>
                    </div>
                    {data.recentActivity.length === 0 ? (
                        <div className="text-center py-12">
                            <span className="text-6xl mb-4 block">🚀</span>
                            <p className="text-xl text-gray-600 mb-2">No activity yet</p>
                            <p className="text-gray-500 mb-6">Start using your API key to generate PDFs!</p>
                            <Link href="/docs" className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition">
                                View API Documentation
                            </Link>
                        </div>
                    ) : (
                        <div className="space-y-3">
                            {data.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition border border-gray-200">
                                    <div className="flex items-center gap-4">
                                        <span className="text-2xl">{activity.status === 'success' ? '✅' : '❌'}</span>
                                        <div>
                                            <p className="font-semibold text-gray-900">{activity.endpoint}</p>
                                            <p className="text-sm text-gray-500">{formatDate(activity.created_at)}</p>
                                        </div>
                                    </div>
                                    <span className={`px-4 py-2 rounded-full text-sm font-bold ${activity.status === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
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