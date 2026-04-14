import { useNavigate } from 'react-router-dom'

export default function FreeValuation() {
  const navigate = useNavigate()

  const factors = [
    {
      title: 'Location',
      description: 'Postcode, neighborhood quality, transport links, schools, and local amenities all affect value.',
      icon: '📍'
    },
    {
      title: 'Property Size',
      description: 'Square footage, number of bedrooms and bathrooms, and usable outdoor space matter a lot.',
      icon: '📐'
    },
    {
      title: 'Condition',
      description: 'Modern kitchens, updated bathrooms, and overall maintenance increase market appeal and value.',
      icon: '🏗️'
    },
    {
      title: 'Comparable Sales',
      description: 'Recent sales of similar properties nearby are one of the strongest indicators of value.',
      icon: '📊'
    },
    {
      title: 'Market Conditions',
      description: 'Supply, demand, interest rates, and seasonal trends all influence current market value.',
      icon: '📈'
    },
    {
      title: 'Unique Features',
      description: 'Parking, gardens, extensions, energy efficiency, and views can add premium value.',
      icon: '✨'
    }
  ]

  const steps = [
    'Submit your property details and photos',
    'Our team analyzes local market trends and comparable sales',
    'We prepare an estimated market value range',
    'Choose a phone, video, or in-person valuation visit',
    'Receive expert advice on maximizing your property value'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-purple-600 to-cyan-500 py-12 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-purple-600 font-semibold px-4 py-2 rounded-full transition-all"
        >
          ← Back
        </button>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">📊</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Free Property Valuation</h1>
          <p className="text-purple-100 text-lg max-w-2xl mx-auto">
            Discover what your home is worth with a professional, no-obligation valuation from our expert team.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* How It Works */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How Our Valuation Works</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {steps.map((step, idx) => (
              <div key={idx} className="bg-slate-900/60 rounded-xl p-5 border border-slate-700">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-cyan-500 text-slate-950 font-bold mb-4">{idx + 1}</div>
                <p className="text-slate-200 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Factors Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">What Affects Your Property Value?</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {factors.map((factor, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-purple-500 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{factor.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{factor.title}</h3>
                <p className="text-slate-300 leading-relaxed">{factor.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-purple-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Book Your Free Valuation Today</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Get an accurate market estimate and expert guidance on pricing your property for sale or rent.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/contact')}
              className="bg-cyan-500 hover:bg-cyan-600 text-slate-950 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Request Valuation
            </button>
            <button
              onClick={() => navigate('/sell')}
              className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Sell My Property
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
