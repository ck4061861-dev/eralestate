import { Link } from 'react-router-dom'

export default function CtaBanner() {
  return (
    <section className="bg-white border-t border-cyan-400/30 py-8 sm:py-10 md:py-12">
      <div className="mx-auto w-[95%] max-w-6xl px-3 sm:px-4 md:px-6 lg:px-8 text-center">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-black">Ready to Get Started?</h2>
        <p className="mx-auto mt-2 sm:mt-3 max-w-2xl text-xs sm:text-sm md:text-base text-black/90">Book your free property valuation or register for new property alerts — it only takes a minute.</p>
        <div className="mt-4 sm:mt-6 flex flex-wrap justify-center gap-2 sm:gap-3">
          <Link to="/contact" className="inline-flex items-center rounded-lg bg-cyan-400 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-slate-950 shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-300" style={{ textDecoration: 'none' }}>
            📅 Book Free Valuation
          </Link>
          <Link to="/contact" className="inline-flex items-center rounded-lg border border-cyan-300 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base text-black shadow-lg shadow-cyan-900/40 transition hover:border-cyan-100 hover:bg-cyan-500/30" style={{ textDecoration: 'none' }}>
            🔔 Register for Alerts
          </Link>
        </div>
      </div>
    </section>
  )
}
