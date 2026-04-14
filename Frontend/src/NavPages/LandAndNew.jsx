import { Link } from 'react-router-dom'

const SECTIONS = [
  {
    title: 'A thoughtful approach to land and new developments',
    lines: [
      'At our agency, we are dedicated to delivering a refined and professional experience within the property market. Our focus is always on quality over quantity, ensuring that every opportunity we present meets a high standard of excellence and aligns with the expectations of our valued clients.',
      'At present, we do not have any land or new development listings available. However, this does not reflect a lack of opportunity — rather, it highlights our commitment to carefully sourcing only the most suitable and desirable properties. Our team is actively working behind the scenes, continuously exploring the market to identify opportunities that match your preferences.',
    ],
  },
  {
    title: 'Your search is a meaningful decision',
    lines: [
      'We understand that finding the right property is not just a transaction, but a meaningful decision that can shape your lifestyle and future. Whether you are searching for a modern home, a long-term investment, or a property with unique character, we are here to guide you with expertise and attention to detail.',
      'Our approach is centred around personalised service. Every client has different needs, and we take the time to understand your requirements in depth. This allows us to provide tailored recommendations and ensure that you are presented with options that truly suit your goals.',
    ],
  },
  {
    title: 'We continue the search for you',
    lines: [
      'Even though new listings may not be available at this moment, our work continues every day. We are in constant communication with property owners, developers, and industry professionals to ensure that we are among the first to discover new opportunities as they arise.',
      'We encourage you to stay connected with us. By checking back regularly or registering your interest, you can remain informed about the latest properties as soon as they become available. Our aim is to ensure that you never miss out on the right opportunity.',
    ],
  },
  {
    title: 'Dedicated support at every step',
    lines: [
      'In addition, our team is always available to discuss your requirements in detail. Whether you have a clear vision of what you are looking for or are still exploring your options, we are here to provide honest advice and professional support.',
      'Transparency, trust, and dedication are at the core of everything we do. We believe in building long-term relationships with our clients by offering consistent value and reliable guidance throughout the entire process.',
    ],
  },
  {
    title: 'Market insight while you wait',
    lines: [
      'We also invite you to explore our current listings and resources, which may offer valuable insights into the market. Even if your ideal property is not available today, understanding the market can help you make better decisions when the right opportunity appears.',
      'Our commitment to excellence means that we never rush the process. Instead, we focus on ensuring that when we do present an opportunity, it is one that genuinely meets your expectations and delivers real value.',
      'Thank you for choosing our agency as your trusted partner in property. Your confidence in us is something we truly appreciate, and we are committed to exceeding your expectations at every stage.',
    ],
  },
]

const HIGHLIGHTS = [
  {
    label: 'Curated opportunities',
    detail: 'We only present properties that meet our quality and suitability standards.',
  },
  {
    label: 'Expert market coverage',
    detail: 'Our team works with developers, owners, and industry professionals every day.',
  },
  {
    label: 'Priority access',
    detail: 'Register your interest and be among the first to hear about new matches.',
  },
]

export default function LandAndNew() {
  return (
    <main className="bg-white text-slate-950 pb-16">
      <section className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-800 w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Buy</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl text-white">
            Land and New Homes
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">
            Explore development plots and newly built homes with modern amenities.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              to="/properties"
              className="inline-flex rounded-full bg-cyan-500 px-7 py-3 text-base font-semibold text-slate-950 shadow-[0_20px_50px_-30px_rgba(6,182,212,0.8)] transition hover:bg-cyan-400"
            >
              Browse All Properties
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-white/15 bg-white/10 px-7 py-3 text-base font-semibold text-white transition hover:bg-white/15"
            >
              Contact Advisor
            </Link>
          </div>

          <div className="mt-14 grid gap-4 sm:grid-cols-4">
            {[
              { value: '320+', label: 'Sale Listings' },
              { value: 'Top', label: 'Verified Agents' },
              { value: 'Fast', label: 'Closing Process' },
              { value: '98%', label: 'Happy Clients' },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-[1.75rem] border border-white/10 bg-slate-900/90 p-4 sm:p-6 shadow-2xl shadow-slate-950/40"
              >
                <p className="text-3xl font-bold text-white">{item.value}</p>
                <p className="mt-2 text-sm uppercase tracking-[0.26em] text-slate-400">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="w-full bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-8">
          <div className="grid gap-6 lg:grid-cols-[1.7fr_1fr]">
            <div className="rounded-4xl border border-slate-200 bg-slate-950/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20">
              <p className=" max-w-2xl text-xs uppercase tracking-[0.28em] text-cyan-300">Current status</p>
              <h2 className="mt-3 text-3xl font-bold text-white">No listings available</h2>
              <p className="mt-4 text-slate-300 leading-7">
                This page is focused on curated land and new homes. Our team is actively sourcing new opportunities and will update this page as soon as the right properties arrive.
              </p>
              <Link
                to="/contact"
                className="mt-8 inline-flex w-full max-w-[320px] items-center justify-center rounded-full bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 mx-auto"
              >
                Register your interest
              </Link>
            </div>

            <div className="rounded-4xl border border-slate-200 bg-slate-900/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20">
              <h3 className="text-lg font-semibold text-white">Stay informed</h3>
              <p className="mt-3 text-sm leading-7 text-slate-400">
                We are in constant contact with developers, owners, and industry professionals to identify new opportunities as soon as they arise.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/properties"
                  className="flex-1 rounded-2xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-semibold text-white text-center transition hover:bg-slate-800"
                >
                  Explore current listings
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 rounded-2xl bg-white px-4 py-3 text-sm font-semibold text-slate-950 text-center transition hover:bg-slate-100"
                >
                  Speak with an advisor
                </Link>
              </div>
            </div>
          </div>

          <article className="rounded-4xl w-full border border-slate-200 bg-slate-900/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20">
            <div className="space-y-10">
              {SECTIONS.map((section) => (
                <section key={section.title} className="space-y-5">
                  <h2 className="text-2xl font-bold text-white">{section.title}</h2>
                  <div className="space-y-4 text-slate-300 leading-8">
                    {section.lines.map((line) => (
                      <p key={line}>{line}</p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </article>
        </div>
      </div>
    </main>
  )
}
