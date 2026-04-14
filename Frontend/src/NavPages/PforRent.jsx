import { Link } from 'react-router-dom'
import PropertySection from '../components/PropertySection'

const PforRent = () => {
  return (
    <main className="bg-white text-slate-950 pb-16">

      {/* ── Hero Banner ── */}
      <section className="relative overflow-hidden bg-slate-950 text-white">
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 pointer-events-none" />
        <div className="absolute top-0 right-0 h-72 w-72 rounded-full bg-cyan-500/10 pointer-events-none" />

        <div className="relative w-full py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-200/70">Rent</p>
          <h1 className="mt-4 text-4xl font-black leading-tight text-white sm:text-5xl lg:text-6xl max-w-3xl">
            Properties <span className="text-emerald-300">To Let</span>
          </h1>

          <p className="mt-4 max-w-2xl text-slate-300 text-base sm:text-lg leading-relaxed">
            Discover the best rental properties in your area, with trusted landlords and transparent pricing.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/properties"
              className="inline-flex rounded-full bg-cyan-500 px-6 py-3 text-base font-semibold text-slate-950 transition hover:bg-cyan-400 shadow-xl shadow-cyan-500/20"
            >
              Browse All Rentals
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-3 text-base font-semibold text-white transition hover:bg-white/20"
            >
              Contact Agent
            </Link>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { number: '450+', label: 'Rental Listings' },
              { number: 'Top', label: 'Verified Landlords' },
              { number: 'Fast', label: 'Move-in Process' },
              { number: '24/7', label: 'Tenant Support' },
            ].map((s) => (
              <div key={s.label} className="rounded-3xl border border-white/10 bg-slate-950/90 p-4 sm:p-6 shadow-2xl shadow-slate-950/20">
                <h3 className="text-3xl font-black text-white">{s.number}</h3>
                <p className="mt-2 text-sm uppercase tracking-[0.28em] text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="mb-8 rounded-4xl border border-slate-200 bg-slate-950/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h2 className="text-3xl font-bold text-white">Rental Listings</h2>
              <p className="mt-3 max-w-2xl text-slate-300 text-sm leading-relaxed">
                Only properties listed for rent appear below — filters applied automatically.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.28em] text-emerald-100">
              To Let
            </span>
          </div>
        </div>

        <div className="rounded-4xl border border-slate-200 bg-white p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/10">
          <PropertySection typeFilter="rent" compact={true} ctaText="Show more rental properties" />
        </div>
      </section>
    </main>
  )
}

export default PforRent
