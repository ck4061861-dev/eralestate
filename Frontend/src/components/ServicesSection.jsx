import ServiceCard from './ServiceCard'

export default function ServicesSection() {
  const services = [
    {
      icon: '🏠',
      title: 'Buying a Property',
      description: 'Step-by-step guidance from your first viewing to collecting the keys. We\'re with you every step.'
    },
    {
      icon: '💷',
      title: 'Selling a Property',
      description: 'Market-leading valuations and targeted marketing to get you the best price fast.'
    },
    {
      icon: '🔑',
      title: 'Letting Your Property',
      description: 'Full landlord support — from tenant-finding to full property management packages.'
    },
    {
      icon: '📋',
      title: 'Tenants Guide',
      description: 'Everything you need to know about renting — deposits, checks, and your rights explained.'
    },
    {
      icon: '📊',
      title: 'Free Valuation',
      description: 'Curious what your home is worth? Get a free online or in-person valuation today.'
    },
    {
      icon: '🔔',
      title: 'Property Alerts',
      description: 'Register and be the first to hear about new properties that match your requirements.'
    }
  ]

  return (
    <section className="bg-slate-900/70 border-t border-slate-800 py-12">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <p className="text-sm font-semibold uppercase tracking-widest text-cyan-400">What We Offer</p>
          <h2 className="mt-2 text-2xl font-bold text-white sm:text-3xl">Services Designed for Modern Homebuyers and Landlords</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:gap-6">
          {services.map((service, idx) => (
            <ServiceCard key={idx} service={service} />
          ))}
        </div>
      </div>
    </section>
  )
}
