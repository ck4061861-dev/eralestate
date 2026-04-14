import PropertySection from '../components/PropertySection'
import { useLocation } from 'react-router-dom'

function Properties() {
  const location = useLocation()
  
  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 left-10 h-72 w-72 rounded-full bg-cyan-500/10 blur-3xl pointer-events-none" />
        
        <div className="relative mx-auto flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between px-6 sm:px-8 lg:px-10 z-10 w-full max-w-7xl">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">All Properties</p>
            <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight">Find The Right Home Faster</h1>
            <p className="mt-6 text-lg text-slate-300">Browse curated listings with clean pricing, verified details, and neighborhoods you want.</p>
            
            <div className="mt-12 grid grid-cols-3 gap-4 border-t border-slate-800/80 pt-8">
              <div>
                <h3 className="text-3xl font-bold text-white">180+</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-cyan-400">Verified</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">24h</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-cyan-400">Response</p>
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white">4.8★</h3>
                <p className="mt-1 text-sm font-medium uppercase tracking-wider text-cyan-400">Rating</p>
              </div>
            </div>
          </div>
          
          <div className="rounded-2xl border border-slate-700 bg-slate-800/50 p-6 sm:p-8 shadow-xl backdrop-blur-md lg:max-w-xs w-full mt-6 lg:mt-0">
            <h2 className="text-xl font-bold text-white mb-4">Popular Tags</h2>
            <div className="flex flex-wrap gap-2">
              {['London', 'Homes', 'Under 900k', 'Ready', 'New Build', 'Detached'].map((tag) => (
                <span key={tag} className="rounded-lg bg-slate-700/50 border border-slate-600 px-3 py-2 text-sm font-semibold text-slate-300 hover:bg-cyan-500/20 hover:text-cyan-300 hover:border-cyan-500/50 cursor-pointer transition">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="py-12">
        <PropertySection compact={false} />
      </div>
    </main>
  )
}

export default Properties
