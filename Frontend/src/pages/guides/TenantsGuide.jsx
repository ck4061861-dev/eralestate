import { useNavigate } from 'react-router-dom'

export default function TenantsGuide() {
  const navigate = useNavigate()

  const rights = [
    {
      title: 'Right to a Safe Home',
      description: 'Your landlord must maintain the property in a habitable condition and comply with health and safety regulations.',
      icon: '🏠'
    },
    {
      title: 'Deposit Protection',
      description: 'Your deposit must be protected in a government-approved scheme. You\'ll receive prescribed information.',
      icon: '🛡️'
    },
    {
      title: 'Right to Privacy',
      description: 'Your landlord can\'t enter without notice except in genuine emergencies. Usually requires 24 hours notice.',
      icon: '🔒'
    },
    {
      title: 'Fair Rent',
      description: 'Your rent can only increase as per the tenancy agreement terms or legal notice periods.',
      icon: '💷'
    },
    {
      title: 'Protection from Eviction',
      description: 'You cannot be evicted without proper legal procedures and notice periods being followed.',
      icon: '📋'
    },
    {
      title: 'Repair Rights',
      description: 'Your landlord must make repairs to structural elements and maintain essential services.',
      icon: '🔧'
    }
  ]

  const tips = [
    'Document the property condition with photos before moving in',
    'Keep copies of all communications with your landlord',
    'Report repairs immediately - don\'t wait for repeated issues',
    'Understand your tenancy agreement thoroughly',
    'Check that your deposit is properly protected',
    'Pay rent on time and keep payment records',
    'Know your notice period - both sides usually need 2 months notice'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-blue-600 to-blue-500 py-12 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-blue-600 font-semibold px-4 py-2 rounded-full transition-all"
        >
          ← Back
        </button>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Tenant's Rights & Guide</h1>
          <p className="text-blue-100 text-lg max-w-2xl mx-auto">
            Everything you need to know about your rights, responsibilities, and how to make the most of your rental home.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Rights Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Your Key Rights as a Tenant</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rights.map((right, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-blue-500 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{right.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{right.title}</h3>
                <p className="text-slate-300 leading-relaxed">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">💡</span> Essential Tenant Tips
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-blue-500/20 text-blue-400">
                    ✓
                  </div>
                </div>
                <p className="text-slate-200">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Important Info */}
        <div className="bg-gradient-to-r from-red-600/20 to-pink-600/20 border border-red-500/30 rounded-2xl p-8 mb-12">
          <h3 className="text-2xl font-bold text-white mb-4">⚠️ Know Your Tenancy Type</h3>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <h4 className="text-lg font-bold text-red-400 mb-2">Assured Shorthold Tenancy (AST)</h4>
              <p className="text-slate-300">Most common type. Usually fixed 6-12 months with notice period required for eviction. You have significant protections.</p>
            </div>
            <div>
              <h4 className="text-lg font-bold text-red-400 mb-2">Fixed Term Tenancy</h4>
              <p className="text-slate-300">You cannot be evicted during the fixed term unless you breach the agreement. After expiry, landlord can regain possession with proper notice.</p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600/20 to-cyan-600/20 border border-blue-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Looking for a Property to Rent?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Browse our extensive collection of rental properties and find your perfect home.
          </p>
          <button
            onClick={() => navigate('/rent')}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
          >
            Browse Rentals
          </button>
        </div>
      </div>
    </div>
  )
}
