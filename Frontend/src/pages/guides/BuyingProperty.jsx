import { useNavigate } from 'react-router-dom'

export default function BuyingProperty() {
  const navigate = useNavigate()

  const features = [
    {
      title: 'Expert Buyer Support',
      description: 'We guide first-time buyers and experienced investors through every stage of the purchase process.',
      icon: '🤝'
    },
    {
      title: 'Mortgage Guidance',
      description: 'Understand financing options, mortgage pre-approval, and the costs involved in buying a property.',
      icon: '🏦'
    },
    {
      title: 'Property Matching',
      description: 'Find the right homes based on your budget, lifestyle, and future plans.',
      icon: '🎯'
    },
    {
      title: 'Negotiation Help',
      description: 'Make competitive offers with confidence and negotiate the best possible price.',
      icon: '💬'
    },
    {
      title: 'Legal Guidance',
      description: 'Work through surveys, contracts, and legal checks with confidence.',
      icon: '⚖️'
    },
    {
      title: 'Smooth Completion',
      description: 'We help coordinate with solicitors, lenders, and sellers to make completion stress-free.',
      icon: '✅'
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-800">
      <div className="relative overflow-hidden bg-gradient-to-r from-cyan-600 via-sky-600 to-blue-700 py-16 sm:py-20">
        <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_top_right,_white,_transparent_45%)]" />
        <button
          onClick={() => navigate('/')}
          className="absolute left-4 sm:left-8 top-4 sm:top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 font-semibold text-cyan-700 transition hover:bg-white"
        >
          ← Back
        </button>
        <div className="relative mx-auto max-w-6xl px-4 text-center sm:px-6 lg:px-8">
          <div className="mb-4 text-6xl">🏠</div>
          <h1 className="text-4xl font-black tracking-tight text-white sm:text-5xl md:text-6xl">Buying a Property</h1>
          <p className="mx-auto mt-4 max-w-3xl text-lg text-cyan-50/90 sm:text-xl">
            From budgeting to keys in hand, this guide covers the complete buying journey with practical advice and real-world tips.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8 sm:py-16">
        <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-2xl shadow-black/20 backdrop-blur-sm transition duration-300 hover:-translate-y-1 hover:border-cyan-400/40 hover:bg-white/10"
            >
              <div className="mb-4 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-cyan-500/15 text-3xl">
                {feature.icon}
              </div>
              <h2 className="text-xl font-bold text-white">{feature.title}</h2>
              <p className="mt-3 leading-relaxed text-slate-300">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-8 rounded-3xl border border-cyan-500/20 bg-slate-900/60 p-8 shadow-2xl shadow-black/20 lg:grid-cols-[1.1fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">What to do first</p>
            <h2 className="mt-2 text-3xl font-bold text-white">A simple path for serious buyers</h2>
            <ul className="mt-6 space-y-4 text-slate-300">
              <li className="flex gap-3"><span className="text-cyan-400">✓</span><span>Set a realistic budget including deposit, legal fees, survey, and moving costs.</span></li>
              <li className="flex gap-3"><span className="text-cyan-400">✓</span><span>Get a mortgage agreement in principle before booking viewings.</span></li>
              <li className="flex gap-3"><span className="text-cyan-400">✓</span><span>Shortlist properties, compare locations, and inspect the condition carefully.</span></li>
              <li className="flex gap-3"><span className="text-cyan-400">✓</span><span>Move quickly when you find the right home - good properties do not stay available for long.</span></li>
            </ul>
          </div>
          <div className="rounded-2xl bg-gradient-to-br from-cyan-500/15 to-blue-500/10 p-6 ring-1 ring-cyan-400/20">
            <h3 className="text-2xl font-bold text-white">Need help buying?</h3>
            <p className="mt-3 text-slate-300">Browse matching homes, speak to our team, and get support through every step of the buying process.</p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <button onClick={() => navigate('/buy')} className="rounded-xl bg-cyan-500 px-5 py-3 font-bold text-slate-950 transition hover:bg-cyan-400">
                Browse Homes
              </button>
              <button onClick={() => navigate('/contact')} className="rounded-xl border border-cyan-400/40 px-5 py-3 font-bold text-cyan-300 transition hover:bg-cyan-500/10">
                Talk to an Agent
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
