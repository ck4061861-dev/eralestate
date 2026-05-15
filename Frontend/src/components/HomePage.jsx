import { Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import ResponsiveContainer from './ResponsiveContainer'

function HeroSection() {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <section className="relative h-screen min-h-[500px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[86vh] overflow-hidden bg-slate-950 text-white">
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop"
        alt="Beautiful modern home"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{ transform: `translateY(${scrollY * 0.1}px)` }}
      />
      <div className="absolute inset-0 bg-linear-to-br from-slate-950/80 via-slate-950/70 to-slate-900/70" />
      <ResponsiveContainer className="relative z-10 flex h-full flex-col justify-center pl-3 sm:pl-4 md:pl-6 lg:pl-8 text-left">
        <h1 className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-black leading-tight tracking-tight text-white max-w-lg sm:max-w-2xl md:max-w-4xl">
          Find Your <span className="text-emerald-300">Dream</span><br />
          Home Today
        </h1>
        <p className="mt-3 sm:mt-4 md:mt-6 max-w-xs sm:max-w-md md:max-w-2xl text-xs xs:text-sm sm:text-base md:text-lg lg:text-xl text-slate-100">
          Buying, selling, or renting — we guide you every step of the way with expert advice and personal support.
        </p>

        <div className="mt-4 sm:mt-6 md:mt-8 flex flex-wrap items-center justify-start gap-2 sm:gap-3 md:gap-4">
          <Link
            to="/properties"
            className="rounded-lg bg-cyan-500 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-white shadow-lg shadow-cyan-500/30 transition hover:bg-cyan-400"
          >
            Browse Properties
          </Link>
          <Link
            to="/contact"
            className="rounded-lg bg-cyan-500 px-3 sm:px-4 md:px-6 py-2 sm:py-2.5 md:py-3 text-xs sm:text-sm md:text-base font-semibold text-white transition hover:bg-cyan-400"
          >
            Free Valuation
          </Link>
        </div>
      </ResponsiveContainer>
    </section>
  )
}

export default HeroSection