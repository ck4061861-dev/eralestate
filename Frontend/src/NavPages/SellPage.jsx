import { Link, useParams } from 'react-router-dom'
import { SELL_MENU_ITEMS } from '../data/menuItems'
import PropertySection from '../components/PropertySection'

function getSellPageBySlug(slug) {
  return SELL_MENU_ITEMS.find((item) => item.slug === slug)
}

export default function SellPage() {
  const { slug } = useParams()
  const page = getSellPageBySlug(slug)

  if (!page) {
    return (
      <main className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          <h1 className="text-3xl font-bold">Page Not Found</h1>
          <p className="mt-3 text-slate-600">The Sell page you are looking for does not exist.</p>
          <Link to="/services" className="mt-5 inline-flex rounded-lg bg-cyan-500 px-4 py-2 text-white hover:bg-cyan-600">Back to Sell Services</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-white text-slate-950">
      <section className="relative min-h-screen overflow-hidden bg-slate-950 py-24 sm:py-32 flex items-center">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-cyan-600/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-emerald-600/10 blur-3xl pointer-events-none" />
        
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          <div className="pr-0 lg:pr-8">
            <header className="rounded-4xl border border-slate-800/80 bg-slate-900/95 p-4 sm:p-6 lg:p-8 shadow-[0_32px_96px_-12px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden">
              <div className="absolute -right-16 -top-16 h-48 w-48 rounded-full bg-cyan-500/10 blur-2xl"></div>
              <p className="text-sm uppercase tracking-[0.2em] text-cyan-300 font-semibold mb-4">Sell Your Property</p>
              <h1 className="text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight leading-[1.1]">{page.title}</h1>
              <p className="mt-5 text-slate-300 text-lg sm:text-xl leading-relaxed">{page.description}</p>
              
              <div className="mt-8 flex flex-col sm:flex-row gap-4">
                <Link to="/contact" className="inline-flex justify-center rounded-2xl bg-cyan-500 px-8 py-4 text-sm font-bold text-slate-950 transition hover:bg-cyan-400 hover:scale-[1.02] shadow-lg shadow-cyan-500/20">
                  Book Free Valuation
                </Link>
                <Link to="/contact" className="inline-flex justify-center rounded-2xl border border-slate-700 bg-slate-800/80 px-8 py-4 text-sm font-bold text-white transition hover:bg-slate-700 hover:border-slate-500 hover:scale-[1.02]">
                  Speak to an Expert
                </Link>
              </div>
            </header>

            <div className="mt-12 grid grid-cols-3 gap-6 sm:gap-8 pt-8 border-t border-slate-800/60">
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">98%</p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Asking Price Achieved</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">12<span className="text-2xl text-cyan-500 text-opacity-80"> Days</span></p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Avg. Time to Sell</p>
              </div>
              <div>
                <p className="text-3xl sm:text-4xl font-extrabold text-white">4.9<span className="text-xl text-yellow-400">/5</span></p>
                <p className="text-xs sm:text-sm text-slate-400 mt-2 font-medium">Trustpilot Rating</p>
              </div>
            </div>
          </div>

          <div className="hidden lg:block relative">
            <div className="aspect-4/3 rounded-[2.5rem] overflow-hidden border border-slate-800 shadow-[0_0_80px_rgba(8,145,178,0.15)] relative transform transition-transform hover:rotate-1 duration-700">
              <img 
                src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1200&q=80" 
                alt="Beautiful home exterior" 
                className="w-full h-full object-cover opacity-90 transition-opacity duration-700 hover:opacity-100" 
              />
              <div className="absolute inset-0 bg-linear-to-t from-slate-950 via-slate-900/20 to-transparent"></div>
            </div>
            
            <div className="absolute -bottom-8 -left-8 rounded-3xl border border-slate-700/80 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl flex items-center gap-4 animate-bounce hover:animate-none pb-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <div>
                <p className="text-base font-bold text-white">Award Winning</p>
                <p className="text-xs text-slate-400">Local Estate Agency 2025</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-5 text-slate-900">
              <div className="rounded-4xl border border-slate-200 bg-white p-8 shadow-2xl shadow-slate-950/10">
                <p className="text-slate-700">This section provides detailed resources for {page.title.toLowerCase()}.</p>
                <ul className="list-disc space-y-2 pl-5 text-slate-600">
                  <li>Professional insights to help you make the best selling decisions.</li>
                  <li>Step-by-step support from valuation through completion.</li>
                  <li>Access to marketing and negotiation guides.</li>
                </ul>
                <Link to="/contact" className="mt-6 inline-flex rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                  Contact our Selling Team
                </Link>
              </div>
            </div>

            <aside className="rounded-4xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-950/10">
              <h2 className="text-lg font-semibold text-slate-900">More Sell Topics</h2>
              <ul className="mt-3 space-y-2 text-sm text-slate-600">
                {SELL_MENU_ITEMS.map((item) => (
                  <li key={item.slug}>
                    <Link className="text-cyan-600 hover:text-cyan-500" to={`/sell/${item.slug}`}>
                      {item.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </aside>
          </div>

          <section className="mt-12 rounded-4xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-950/10">
            <div className="mb-5">
              <h2 className="text-2xl font-bold text-slate-900">Sale Properties</h2>
              <p className="mt-1 text-sm text-slate-600">Only properties listed for sale are shown here.</p>
            </div>
            <PropertySection typeFilter="sale" compact={true} ctaText="More sale listings" />
          </section>
        </div>
      </div>
    </main>
  )
}
