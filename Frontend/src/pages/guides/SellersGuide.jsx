import { useNavigate } from 'react-router-dom'

export default function SellersGuide() {
  const navigate = useNavigate()

  const steps = [
    {
      number: '1',
      title: 'Get Your Home Valued',
      description: 'Get a professional valuation to understand your property\'s market value. Understanding comparable properties is crucial.',
      icon: '💎'
    },
    {
      number: '2',
      title: 'Prepare Your Property',
      description: 'Declutter, clean, and make minor repairs. First impressions matter! Consider professional staging to maximize appeal.',
      icon: '🧹'
    },
    {
      number: '3',
      title: 'List Your Property',
      description: 'Professional photography and compelling descriptions are key. Our team will create an attractive listing to reach buyers.',
      icon: '📸'
    },
    {
      number: '4',
      title: 'Market Aggressively',
      description: 'We use multiple channels - online portals, social media, and our network - to get maximum exposure for your property.',
      icon: '📢'
    },
    {
      number: '5',
      title: 'Review Offers & Negotiate',
      description: 'We\'ll guide you through offers, advise on negotiations, and help you get the best price possible.',
      icon: '💬'
    },
    {
      number: '6',
      title: 'Complete the Sale',
      description: 'Work with conveyancers, handle inspections, and complete all legal requirements. We\'ll be with you every step.',
      icon: '✅'
    }
  ]

  const tips = [
    'Price your property competitively from the start - overpricing delays sales',
    'Invest in professional photography and virtual tours',
    'Be prepared for viewings - keep your property clean and accessible',
    'Be flexible with viewing times to maximize potential buyers',
    'Fix obvious issues before listing (leaky taps, cracked windows, etc.)',
    'Consider the psychological impact of pricing (£199,950 vs £200,000)',
    'Disclose any known issues to avoid legal complications'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-emerald-600 to-emerald-500 py-12 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-emerald-600 font-semibold px-4 py-2 rounded-full transition-all"
        >
          ← Back
        </button>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">💷</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Seller's Guide</h1>
          <p className="text-emerald-100 text-lg max-w-2xl mx-auto">
            Everything you need to know to successfully sell your property and get the best possible price.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Steps Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">6 Steps to Selling Successfully</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-emerald-500 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center h-12 w-12 rounded-full bg-emerald-500 text-white font-bold text-lg">
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
            <span className="text-2xl">💡</span> Pro Seller Tips
          </h2>
          <div className="grid gap-4 md:grid-cols-2">
            {tips.map((tip, idx) => (
              <div key={idx} className="flex gap-4">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center h-8 w-8 rounded-full bg-emerald-500/20 text-emerald-400">
                    ✓
                  </div>
                </div>
                <p className="text-slate-200">{tip}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-emerald-600/20 to-teal-600/20 border border-emerald-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Ready to Sell Your Property?</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Let our experienced team help you sell your property quickly and at the best price possible.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/')}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
            >
              List Your Property
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="border-2 border-emerald-500 text-emerald-400 hover:bg-emerald-500/10 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Get Free Valuation
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
