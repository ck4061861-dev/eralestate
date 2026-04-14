import { useNavigate } from 'react-router-dom'

export default function PropertyAlerts() {
  const navigate = useNavigate()

  const benefits = [
    {
      title: 'Instant Notifications',
      description: 'Get alerted as soon as a property matching your criteria is listed.',
      icon: '⚡'
    },
    {
      title: 'Custom Search Filters',
      description: 'Set your preferred location, price range, bedrooms, and property type.',
      icon: '🎯'
    },
    {
      title: 'Save Time',
      description: 'No need to search every day - we bring the right properties straight to you.',
      icon: '⏱️'
    },
    {
      title: 'Stay Ahead',
      description: 'Be among the first to know about new listings before other buyers do.',
      icon: '🏃'
    },
    {
      title: 'Mobile Friendly',
      description: 'Receive alerts on your phone, tablet, or desktop wherever you are.',
      icon: '📱'
    },
    {
      title: 'No Missed Opportunities',
      description: 'Never miss your dream home because you found it too late.',
      icon: '🏡'
    }
  ]

  const setup = [
    'Create a free account',
    'Set your property preferences',
    'Choose how often you want alerts',
    'Receive notifications via email or app',
    'Act quickly when the right property appears'
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-pink-600 to-purple-500 py-12 sm:py-16">
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 bg-white/90 hover:bg-white text-pink-600 font-semibold px-4 py-2 rounded-full transition-all"
        >
          ← Back
        </button>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="text-5xl mb-4">🔔</div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-4">Property Alerts</h1>
          <p className="text-pink-100 text-lg max-w-2xl mx-auto">
            Register for personalized alerts and never miss the perfect property again.
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        {/* Setup Steps */}
        <div className="bg-slate-800/50 border border-slate-700 rounded-2xl p-8 mb-16">
          <h2 className="text-3xl font-bold text-white mb-6 text-center">How to Set Up Alerts</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            {setup.map((step, idx) => (
              <div key={idx} className="bg-slate-900/60 rounded-xl p-5 border border-slate-700">
                <div className="flex items-center justify-center h-10 w-10 rounded-full bg-pink-500 text-white font-bold mb-4">{idx + 1}</div>
                <p className="text-slate-200 text-sm leading-relaxed">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Why Property Alerts Help</h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="bg-slate-800/50 border border-slate-700 rounded-2xl p-6 hover:border-pink-500 hover:bg-slate-800/80 transition-all duration-300"
              >
                <div className="text-4xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-white mb-2">{benefit.title}</h3>
                <p className="text-slate-300 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-pink-600/20 to-purple-600/20 border border-pink-500/30 rounded-2xl p-8 text-center">
          <h3 className="text-2xl font-bold text-white mb-4">Sign Up for Property Alerts</h3>
          <p className="text-slate-300 mb-6 max-w-2xl mx-auto">
            Create your free alert profile now and get notified the moment matching properties go live.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/register')}
              className="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-lg transition-all"
            >
              Create Alert Profile
            </button>
            <button
              onClick={() => navigate('/buy')}
              className="border-2 border-pink-500 text-pink-400 hover:bg-pink-500/10 font-bold px-8 py-3 rounded-lg transition-all"
            >
              Browse Properties
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
