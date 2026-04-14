import { useNavigate } from 'react-router-dom'

const serviceRoutes = {
  'Buying a Property': '/guides/buying-property',
  'Selling a Property': '/guides/selling-property',
  'Letting Your Property': '/guides/letting-property',
  'Tenants Guide': '/guides/tenants-guide',
  'Free Valuation': '/guides/free-valuation',
  'Property Alerts': '/guides/property-alerts',
}

export default function ServiceCard({ service }) {
  const navigate = useNavigate()
  const guidePath = serviceRoutes[service.title] || '/contact'

  return (
    <article className="group relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-800/65 p-5 sm:p-6 shadow-xl shadow-slate-950/40 transition-all duration-300 hover:-translate-y-1 hover:border-cyan-400/70 hover:bg-slate-800">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(34,211,238,0.16),_transparent_35%)] opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      <div className="relative flex h-full flex-col">
        <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-cyan-500 text-2xl shadow-lg shadow-cyan-500/20">{service.icon}</div>
        <h3 className="text-xl font-bold text-white">{service.title}</h3>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-slate-300">{service.description}</p>
        <button
          onClick={() => navigate(guidePath)}
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl bg-cyan-500 px-4 py-2.5 text-sm font-bold text-slate-950 transition-all duration-300 hover:bg-cyan-400 hover:shadow-lg hover:shadow-cyan-500/25"
        >
          Learn More
          <span aria-hidden="true">→</span>
        </button>
      </div>
    </article>
  )
}
