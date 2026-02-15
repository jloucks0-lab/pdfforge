'use client'

import { useState } from 'react'

export default function Dashboard() {
    const [copied, setCopied] = useState(false)
    const apiKey = 'sk_live_xxxxxxxxxxxxxxxxxxxx'

    const handleCopy = () => {
        navigator.clipboard.writeText(apiKey)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4 max-w-6xl">
                <h1 className="text-4xl font-bold mb-8">Dashboard</h1>

                {/* API Key Section */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Your API Key</h2>
                    <p className="text-gray-600 mb-3">Use this key to authenticate your API requests</p>
                    <div className="bg-gray-100 p-4 rounded font-mono text-sm flex items-center justify-between">
                        <span>{apiKey}</span>
                        <button
                            onClick={handleCopy}
                            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 text-xs transition"
                        >
                            {copied ? 'Copied!' : 'Copy'}
                        </button>
                    </div>
                </div>

                {/* Usage Stats */}
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">This Month</h3>
                        <p className="text-3xl font-bold text-blue-600">423</p>
                        <p className="text-gray-500 text-sm">PDFs generated</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Plan Limit</h3>
                        <p className="text-3xl font-bold text-gray-900">1,000</p>
                        <p className="text-gray-500 text-sm">PDFs/month</p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-semibold mb-2 text-gray-700">Remaining</h3>
                        <p className="text-3xl font-bold text-green-600">577</p>
                        <p className="text-gray-500 text-sm">PDFs left</p>
                    </div>
                </div>

                {/* Current Plan */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-6">
                    <h2 className="text-2xl font-semibold mb-4">Current Plan</h2>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xl font-bold">Starter Plan</p>
                            <p className="text-gray-600">$19/month • 1,000 PDFs</p>
                        </div>
                        <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                            Upgrade Plan
                        </button>
                    </div>
                </div>

                {/* Recent Activity */}
                <div className="bg-white p-6 rounded-lg shadow-md">
                    <h2 className="text-2xl font-semibold mb-4">Recent Activity</h2>
                    <div className="space-y-3">
                        <div className="flex items-center justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">PDF: Invoice #1234</p>
                                <p className="text-sm text-gray-500">1 hour ago</p>
                            </div>
                            <span className="text-green-600 font-semibold">Success</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">PDF: Report Q4 2024</p>
                                <p className="text-sm text-gray-500">3 hours ago</p>
                            </div>
                            <span className="text-green-600 font-semibold">Success</span>
                        </div>
                        <div className="flex items-center justify-between border-b pb-3">
                            <div>
                                <p className="font-medium">PDF: Contract Template</p>
                                <p className="text-sm text-gray-500">Yesterday</p>
                            </div>
                            <span className="text-green-600 font-semibold">Success</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}