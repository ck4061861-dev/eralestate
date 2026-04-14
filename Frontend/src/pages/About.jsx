import WhyChooseUs from '../components/WhyChooseUs'
import CtaBanner from '../components/CtaBanner'

export default function About() {
  return (
    <main className="bg-slate-50 text-slate-900 min-h-screen">
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-10 z-10 text-center">
          <p className="mb-4 text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">About Dummy Real Estate</p>
          <h1 className="text-4xl font-extrabold sm:text-5xl lg:text-7xl tracking-tight">Built on trust,<br/>driven by local expertise.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-300">At Dummy Real Estate, we align our full-service property solutions with your goals — whether you're buying, selling, renting or investing around the city.</p>
        </div>
      </section>
      
      <div className="py-16">
        <WhyChooseUs />
        <div className="mt-16 mx-auto max-w-7xl px-4">
          <CtaBanner />
        </div>
      </div>
    </main>
  )
}
