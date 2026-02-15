import Link from 'next/link'

export default function Pricing() {
    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', maxWidth: '1200px', margin: '0 auto' }}>

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
                    <Link href="/signup" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', fontWeight: '600' }}>
                        Get Started
                    </Link>
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
                    <Link href="/signup" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', fontWeight: '600' }}>
                        Get Started
                    </Link>
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
                    <Link href="/signup" style={{ display: 'inline-block', backgroundColor: '#2563eb', color: 'white', padding: '0.75rem 2rem', borderRadius: '0.5rem', textAlign: 'center', textDecoration: 'none', fontWeight: '600' }}>
                        Contact Sales
                    </Link>
                </div>
            </div>

        </div>
    )
}