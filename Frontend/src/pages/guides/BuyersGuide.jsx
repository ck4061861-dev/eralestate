import { useNavigate } from 'react-router-dom'

export default function BuyersGuide() {
  const navigate = useNavigate()

  const steps = [
    {
      number: '1',
      title: 'Get Your Finances in Order',
      description: 'Check your credit score, save a deposit (typically 5-20%), and get a mortgage pre-approval. Know your budget before you start looking.',
      icon: '💰'
    },
    {
      number: '2',
      title: 'Start Your Property Search',
      description: 'Browse our listings, set up property alerts, and narrow down your preferences. Visit properties that match your criteria.',
      icon: '🔍'
    },
    {
      number: '3',
      title: 'Make an Offer',
      description: 'When you find the right property, make an offer. We\'ll help you negotiate to get the best deal possible.',
      icon: '📋'
    },
    {
      number: '4',
      title: 'Property Survey & Valuation',
      description: 'Get a professional survey to identify any issues. Your lender will also value the property for their final approval.',
      icon: '🏗️'
    },
    {
      number: '5',
      title: 'Complete Legal Steps',
      description: 'Work with a conveyancer to handle all legal paperwork, title checks, and local searches.',
      icon: '⚖️'
    },
    {
      number: '6',
      title: 'Exchange & Completion',
      description: 'Exchange contracts (you\'re now legally committed) and set a completion date. On completion day, you get the keys!',
      icon: '🔑'
    }
  ]

  const tips = [
    'Get pre-approved for a mortgage before viewing properties',
    'Don\'t make major purchases before buying - it affects your mortgage',
    'Factor in additional costs: stamp duty, surveys, legal fees, insurance',
    'Have a home inspection done before exchanging contracts',
    'Keep your deposit in a safe, liquid account',
    'Don\'t make empty promises - be ready to commit'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-cyan-600 to-cyan-500 py-12 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-cyan-600 font-semibold px-4 py-2 rounded-full transition-all"
        >
          ← Back
        </button>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🏠</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Buyer's Guide</h1>
          <p className="text-cyan-100 text-lg max-w-2xl mx-auto">
            Your complete step-by-step guide to buying a property, from initial search to getting your keys.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">6 Essential Steps</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-cyan-500 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-cyan-500 text-white font-bold text-lg">
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
            <span className="text-2xl">💡</span> Key Tips for Success
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-cyan-500/20 text-cyan-400">
                    ✓
                  </div>
                </div>
                <p className="text-slate-200">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 border border-cyan-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Start Your Buying Journey?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Browse our extensive property listings or contact our expert team to help guide you through the process.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/buy')}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Browse Properties
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Contact Our Team
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
