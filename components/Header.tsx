import Link from 'next/link'

export default function Header() {
    return (
        <header className="bg-white shadow-sm">
            <nav className="container mx-auto px-4 py-4">
                <div className="flex items-center justify-between">
                    <Link href="/" className="text-2xl font-bold text-gray-900">
                        PdfForge
                    </Link>
                    <div className="flex gap-6 items-center">
                        <Link href="/pricing" className="text-gray-600 hover:text-gray-900">
                            Pricing
                        </Link>
                        <Link href="/docs" className="text-gray-600 hover:text-gray-900">
                            Docs
                        </Link>
                        <Link href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700">
                            Dashboard
                        </Link>
                    </div>
                </div>
            </nav>
        </header>
    )
}