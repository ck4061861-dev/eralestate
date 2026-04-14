import ServicesSection from '../components/ServicesSection'

function Services() {
  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-10 right-10 h-72 w-72 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 z-10 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Our Expertise</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-7xl tracking-tight">Premium Services for<br/>Every Property Need</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">Comprehensive real estate solutions built for buyers, sellers, and landlords. One place, a full suite of expert support.</p>
        </div>
      </section>

      <div className="py-16">
        <ServicesSection />
      </div>
    </main>
  )
}

export default Services;
