import { useNavigate } from 'react-router-dom'

export default function LettingGuide() {
  const navigate = useNavigate()

  const steps = [
    {
      number: '1',
      title: 'Prepare Your Property',
      description: 'Ensure the property is clean, safe, and complies with all regulations. Make necessary repairs and upgrades.',
      icon: '🔧'
    },
    {
      number: '2',
      title: 'Set a Competitive Rent',
      description: 'Analyze local rental market rates and set a price that attracts quality tenants while maximizing your income.',
      icon: '💰'
    },
    {
      number: '3',
      title: 'Find the Right Tenant',
      description: 'We thoroughly vet candidates, check references, and verify employment. Quality tenants mean fewer problems.',
      icon: '👥'
    },
    {
      number: '4',
      title: 'Manage the Tenancy',
      description: 'From rent collection to maintenance coordination, we handle everything to keep your property running smoothly.',
      icon: '📋'
    },
    {
      number: '5',
      title: 'Handle Legal Requirements',
      description: 'Ensure deposits are protected, tenancy agreements are signed, and all regulations are followed.',
      icon: '⚖️'
    },
    {
      number: '6',
      title: 'Regular Communication',
      description: 'Stay informed with regular updates on your property and handle any issues promptly and professionally.',
      icon: '📞'
    }
  ]

  const tips = [
    'Property maintenance can save you money - fix issues immediately',
    'Screen tenants thoroughly - a good tenant is worth their weight in gold',
    'Keep detailed records of all maintenance and expenses',
    'Use professional property management to save time and stress',
    'Invest in home insurance and landlord insurance',
    'Be clear about house rules from the start',
    'Build a good relationship with your tenant to ensure longer tenancies'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-600 to-amber-500 py-12 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-amber-600 font-semibold px-4 py-2 rounded-full transition-all"
        >
          ← Back
        </button>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🔑</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Landlord's Letting Guide</h1>
          <p className="text-amber-100 text-lg max-w-2xl mx-auto">
            Complete guidance on letting your property, managing tenants, and maintaining your investment.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">6 Steps to Successful Letting</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-amber-500 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-amber-500 text-white font-bold text-lg">
                      {step.number}
                    </div>
                  </div>
                  <div className="text-3xl">{step.icon}</div>
                </div>
                <h3 className="text-xl font-bold text-white mb-2">{step.title}</h3>
                <p className="text-slate-300 leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips Section */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-12">
          <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3">
            <span className="text-2xl">💡</span> Landlord Success Tips
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-amber-500/20 text-amber-400">
                    ✓
                  </div>
                </div>
                <p className="text-slate-200">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-amber-600/20 to-orange-600/20 border border-amber-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Want to Let Your Property?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Our team takes the stress out of landlording with comprehensive property management services.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-amber-500 hover:bg-amber-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
            >
              List for Rent
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-amber-500 text-amber-400 hover:bg-amber-500/10 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Talk to Us Now
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
