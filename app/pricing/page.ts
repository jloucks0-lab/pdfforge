export default function Pricing() {
    return (
        <div className= "min-h-screen bg-gray-50 py-16" >
        <div className="container mx-auto px-4" >
            <h1 className="text-4xl font-bold text-center mb-12" > Pricing Plans </h1>
                < div className = "grid md:grid-cols-3 gap-8 max-w-5xl mx-auto" >
                    <div className="bg-white p-8 rounded-lg shadow-md" >
                        <h3 className="text-2xl font-bold mb-4" > Starter </h3>
                            < p className = "text-4xl font-bold mb-6" > $9 < span className = "text-lg text-gray-600" > /mo</span > </p>
                                < ul className = "space-y-3 mb-8" >
                                    <li>✓ 1,000 PDFs / month </li>
                                        <li>✓ Basic support </li>
                                            <li>✓ API access </li>
                                                </ul>
                                                < button className = "w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700" >
                                                    Get Started
                                                        </button>
                                                        </div>
                                                        </div>
                                                        </div>
                                                        </div>
  )
}