import { Link } from 'react-router-dom'
import PropertySection from '../components/PropertySection'

const Propertyforsell = () => {
  return (
    <main className="bg-slate-950 min-h-screen pb-16">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-slate-900 border-b border-slate-800 w-full">

        {/* dark blobs */}
        <div className="absolute -top-24 -left-24 w-[420px] h-[420px] rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-0 right-0 w-[280px] h-[280px] rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">

          <h1 className="text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            Properties <span className="text-transparent bg-clip-text bg-linear-to-r from-cyan-400 to-blue-500">For Sale</span>
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed">
            Discover the best sale properties in your area, with trusted service and transparent pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/properties"
              className="inline-flex rounded-xl bg-cyan-500 px-5 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 shadow-lg shadow-cyan-500/25"
            >
              Browse All Properties
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-xl border border-slate-700 bg-slate-800/80 px-5 py-3 text-base font-semibold text-white transition hover:bg-slate-700 hover:border-slate-600"
            >
              Contact Advisor
            </Link>
          </div>

          {/* stats grid */}
          <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-full">
            {[
              { number: '320+', label: 'Sale Listings' },
              { number: 'Top', label: 'Verified Agents' },
              { number: 'Fast', label: 'Closing Process' },
              { number: '98%', label: 'Happy Clients' },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-slate-800 bg-slate-800/40 p-4 sm:p-6 backdrop-blur-sm transition hover:border-slate-700 hover:bg-slate-800/60">
                <h3 className="text-3xl font-black text-white">{s.number}</h3>
                <p className="mt-2 text-sm font-medium text-slate-400 uppercase tracking-wide">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings ── */}
      <section className="w-full bg-slate-100 py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">

        {/* section header card */}
        <div className="mb-8 rounded-2xl border border-slate-800 bg-white/10 p-4 sm:p-6 lg:p-8 flex items-start justify-between gap-4 backdrop-blur-sm">
          <div className="flex items-center bg-white/10 gap-3">
            <h2 className="text-2xl font-bold text-black">Sale Listings</h2>
            <p className="mt-2 text-sm text-slate-600">
              Only properties listed for sale appear below — filters applied automatically.
            </p>
          </div>
          <span className="shrink-0 rounded-full border my-auto border-cyan-500/30 bg-cyan-500/10 px-4 py-1.5 text-xs font-bold text-slate-500 tracking-wide uppercase shadow-inner">
            For Sale
          </span>
        </div>

        <PropertySection typeFilter="sale" compact={true} ctaText="Show more sale properties" />
      </section>
    </main>
  )
}

export default Propertyforsell