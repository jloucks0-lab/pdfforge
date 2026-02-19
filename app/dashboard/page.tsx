'use client'

import { useState, useEffect } from 'react'

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
        // Get API key from URL param or localStorage
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
            starter: 'Starter Plan',
            professional: 'Professional Plan',
            enterprise: 'Enterprise Plan'
        }
        return names[plan] || plan
    }

    const getPlanPrice = (plan: string) => {
        const prices: Record<string, string> = {
            starter: '$19/month',
            professional: '$49/month',
            enterprise: '$100/month'
        }
        return prices[plan] || ''
    }

    if (loading) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 flex items-center justify-center">
                <div className="text-xl">Loading...</div>
            </div>
        )
    }

    if (!data) {
        return (
            <div className="min-h-screen bg-gray-50 py-8">
                <div className="container mx-auto px-4 max-w-6xl">
                    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
                        <p className="text-yellow-800">
                            Please provide your API key to view the dashboard.
                        </p>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <div className="mb-8">
                    <h1 className="text-4xl font-bold">Dashboard</h1>
                    <p className="text-gray-600 mt-2">{data.user.email}</p>
                </div>

                {/* API Key Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Your API Key</h2>
                    <p className="text-gray-600 mb-3">Use this key to authenticate your API requests</p>
                    <div className="bg-gray-100 p-4 rounded font-mono text-sm flex items-center justify-between">
                        <span className="truncate mr-4">{data.user.apiKey}</span>
                        <button
                            onClick={handleCopy}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-xs transition whitespace-nowrap"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Usage Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">This Month</h3>
                        <p className="text-3xl font-bold text-blue-600">{data.usage.current.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">PDFs generated</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Plan Limit</h3>
                        <p className="text-3xl font-bold text-gray-900">{data.usage.limit.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">PDFs/month</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Remaining</h3>
                        <p className="text-3xl font-bold text-green-600">{data.usage.remaining.toLocaleString()}</p>
                        <p className="text-gray-500 text-sm">PDFs left</p>
                    </div>
                </div>

                {/* Current Plan */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xl font-bold">{getPlanName(data.user.plan)}</p>
                            <p className="text-gray-600">{getPlanPrice(data.user.plan)} • {data.usage.limit.toLocaleString()} PDFs</p>
                        </div>
                        <a href="/pricing" className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Upgrade Plan
                        </a>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                    {data.recentActivity.length === 0 ? (
                        <p className="text-gray-500">No activity yet. Start using your API key to generate PDFs!</p>
                    ) : (
                        <div className="space-y-3">
                            {data.recentActivity.map((activity, index) => (
                                <div key={index} className="flex items-center justify-between border-b pb-3">
                                    <div>
                                        <p className="font-medium">{activity.endpoint}</p>
                                        <p className="text-sm text-gray-500">{formatDate(activity.created_at)}</p>
                                    </div>
                                    <span className={`font-semibold ${activity.status === 'success' ? 'text-green-600' : 'text-red-600'}`}>
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