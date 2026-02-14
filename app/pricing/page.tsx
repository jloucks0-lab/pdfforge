export default function Pricing() {
    return (
        <div className="min-h-screen bg-gray-50 py-16">
            <div className="container mx-auto px-4">
                <h1 className="text-4xl font-bold text-center mb-12">Pricing Plans</h1>
                <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">

                    {/* Starter Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-4">Starter</h3>
                        <p className="text-4xl font-bold mb-6">$19<span className="text-lg text-gray-600">/mo</span></p>
                        <ul className="space-y-3 mb-8">
                            <li>✓ 1,000 PDFs/month</li>
                            <li>✓ Email support</li>
                            <li>✓ API access</li>
                            <li>✓ Basic templates</li>
                            <li>✓ 99.9% uptime SLA</li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </div>

                    {/* Professional Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-md border-2 border-blue-600 relative">
                        <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-sm font-semibold">
                            Most Popular
                        </div>
                        <h3 className="text-2xl font-bold mb-4">Professional</h3>
                        <p className="text-4xl font-bold mb-6">$49<span className="text-lg text-gray-600">/mo</span></p>
                        <ul className="space-y-3 mb-8">
                            <li>✓ 10,000 PDFs/month</li>
                            <li>✓ Priority support</li>
                            <li>✓ API access</li>
                            <li>✓ Custom templates</li>
                            <li>✓ 99.95% uptime SLA</li>
                            <li>✓ Webhooks</li>
                            <li>✓ Custom headers/footers</li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            Get Started
                        </button>
                    </div>

                    {/* Enterprise Plan */}
                    <div className="bg-white p-8 rounded-lg shadow-md">
                        <h3 className="text-2xl font-bold mb-4">Enterprise</h3>
                        <p className="text-4xl font-bold mb-6">$99<span className="text-lg text-gray-600">/mo</span></p>
                        <ul className="space-y-3 mb-8">
                            <li>✓ 50,000 PDFs/month</li>
                            <li>✓ Dedicated support</li>
                            <li>✓ API access</li>
                            <li>✓ Unlimited templates</li>
                            <li>✓ 99.99% uptime SLA</li>
                            <li>✓ Webhooks</li>
                            <li>✓ Custom branding</li>
                            <li>✓ On-premise option</li>
                        </ul>
                        <button className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
                            Contact Sales
                        </button>
                    </div>

                </div>

                {/* Additional info */}
                <div className="mt-16 text-center max-w-2xl mx-auto">
                    <p className="text-gray-600 mb-4">All plans include:</p>
                    <div className="grid md:grid-cols-2 gap-4 text-left">
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span className="text-gray-700">HTML to PDF conversion</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span className="text-gray-700">URL to PDF conversion</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span className="text-gray-700">Multiple page formats</span>
                        </div>
                        <div className="flex items-start gap-2">
                            <span className="text-green-600 font-bold">✓</span>
                            <span className="text-gray-700">SSL encryption</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}