import { Link } from 'react-router-dom'

const STEPS = [
  {
    title: 'Understanding Your Buyer Profile',
    content: [
      'Before beginning your search, identify your position as a buyer. This helps you plan your finances and strategy effectively.',
      'A first-time buyer is someone who has never owned property before. An investor purchases property with the intention of renting it out. A let-to-buy buyer rents out their current home while purchasing another. A sell-to-buy buyer sells their existing property to fund a new purchase.',
    ],
  },
  {
    title: 'Planning Your Finances',
    content: [
      'Organise your finances and determine a clear budget before searching for a property. A mortgage agreement in principle strengthens your position when making an offer.',
      'Factor in moving expenses, legal fees, stamp duty, survey charges, and mortgage-related fees. Proper planning ensures a smoother buying experience.',
    ],
    list: [
      'Moving expenses',
      'Legal fees',
      'Stamp duty',
      'Survey charges',
      'Mortgage-related fees',
    ],
  },
  {
    title: 'Searching for the Right Property',
    content: [
      'Finding the right property can take time and effort. Whether you already know what you want or are exploring options, our team is here to help.',
      'Register your requirements with us so we can narrow down suitable options and guide you throughout the process.',
    ],
    list: [
      'Preferred location',
      'Type of property',
      'Number of bedrooms',
      'Maximum budget',
    ],
  },
  {
    title: 'Appointing a Solicitor',
    content: [
      'Choosing a reliable and proactive solicitor is crucial. They handle the legal aspects and keep the purchase moving smoothly.',
      'A good solicitor can significantly impact the speed and success of your transaction.',
    ],
  },
  {
    title: 'Making an Offer',
    content: [
      'Once you find the right property, submit an offer promptly. Sellers consider your financial position, buying chain, and preferred timeline.',
      'Providing proof of funds or mortgage approval strengthens your offer.',
    ],
  },
  {
    title: 'Offer Accepted',
    content: [
      'When your offer is accepted, the process officially begins. Your solicitor is instructed and a formal agreement is prepared for all parties.',
    ],
  },
  {
    title: 'Legal Process (Conveyancing)',
    content: [
      'This stage covers all legal checks related to the property.',
      'Your solicitor will conduct searches, review documents, raise enquiries, and verify ownership and property details.',
    ],
  },
  {
    title: 'Survey and Mortgage Approval',
    content: [
      'If using a mortgage, you will complete your application and arrange a property survey. The survey assesses condition and value.',
      'Once approved, the lender issues a formal mortgage offer.',
    ],
  },
  {
    title: 'Exchange of Contracts',
    content: [
      'With all checks complete, contracts are signed and the deposit is paid. The completion date is finalised.',
    ],
  },
  {
    title: 'Completion',
    content: [
      'On completion day, the remaining funds are transferred to the seller. Once confirmed, you receive the keys to your new property.',
      'Congratulations — you are now a homeowner.',
    ],
  },
]

function BuyersGuide() {
  return (
    <main className="bg-white text-slate-950 pb-16">
      <section className="bg-linear-to-br from-slate-950 via-slate-900 to-blue-700 text-white w-full">
        <div className="w-full px-4 sm:px-6 lg:px-8 py-16 sm:py-20 lg:py-24">
          <p className="text-sm uppercase tracking-[0.3em] text-cyan-300/70">Buy</p>
          <h1 className="mt-4 max-w-3xl text-5xl font-extrabold tracking-tight sm:text-6xl lg:text-7xl">
            Home Buyer’s Guide
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-200 sm:text-xl">
            A complete step-by-step guide to purchasing your property.
          </p>
        </div>
      </section>

      <div className="w-full px-4 sm:px-6 lg:px-8 py-12 sm:py-16 lg:py-20">
        <div className="grid gap-6 lg:grid-cols-[1.45fr_1fr] mb-8 items-stretch">
          <div className="rounded-4xl border border-slate-200 bg-slate-950/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20">
            <p className="text-xs uppercase tracking-[0.28em] text-cyan-300">Current status</p>
            <h2 className="mt-3 text-3xl font-bold text-white">No listings available</h2>
            <p className="mt-4 text-slate-300 leading-8 text-sm sm:text-base">
              This page is focused on curated land and new homes. Our team is actively sourcing the best opportunities and will update the page as soon as the right properties arrive.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-start">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center rounded-full bg-cyan-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 sm:w-auto"
              >
                Register your interest
              </Link>
              <span className="rounded-full border border-slate-700 bg-slate-950/70 px-4 py-3 text-sm font-medium text-slate-300">
                Expert sourcing, tailored updates
              </span>
            </div>
          </div>

          <div className="rounded-4xl border border-slate-200 bg-slate-900/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20">
            <h3 className="text-xl font-semibold text-white">Stay informed</h3>
            <p className="mt-4 text-sm leading-7 text-slate-400">
              Our team is ready to support you whether you have a clear vision or are still exploring your options.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                to="/properties"
                className="flex-1 min-w-0 rounded-3xl border border-slate-700 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 text-center"
              >
                Explore current listings
              </Link>
              <Link
                to="/contact"
                className="flex-1 min-w-0 rounded-3xl bg-white px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-slate-100 text-center"
              >
                Speak with an advisor
              </Link>
            </div>
          </div>
        </div>

        <div className="grid gap-6">
          <article className="rounded-4xl border border-slate-200 bg-slate-900/95 p-6 sm:p-8 lg:p-10 shadow-2xl shadow-slate-950/20 text-slate-100">
            <div className="space-y-10 divide-y divide-slate-800">
              <div className="space-y-6">
                <h2 className="text-3xl font-bold text-white">Why Choose Our Agency?</h2>
                <p className="text-slate-300 leading-8">
                  We are a well-established independent estate agency with decades of experience in both property sales and lettings. With a strong presence in the local community and a proven history of successful transactions, we take pride in delivering reliable and professional services to every client.
                </p>
                <p className="text-slate-300 leading-8">
                  Our reputation has been built on trust, consistency, and results. We are recognised within the industry for maintaining high standards and providing exceptional customer service. Many of our clients return to us or recommend our services, which reflects our commitment to excellence.
                </p>
                <p className="text-slate-300 leading-8">
                  Purchasing a property is an exciting milestone, but it can also feel overwhelming. To simplify the journey, we have outlined a clear and easy-to-follow step-by-step guide to help you understand the process.
                </p>
              </div>

              <div className="space-y-6 pt-8">
                {STEPS.map((step, index) => (
                  <section key={step.title} className="rounded-3xl border border-slate-800/70 bg-slate-950/80 p-4 sm:p-6 lg:p-8 shadow-lg shadow-slate-950/10">
                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                      <div>
                        <p className="text-sm uppercase tracking-[0.28em] text-cyan-300">Step {index + 1}</p>
                        <h3 className="mt-2 text-2xl font-semibold text-white">{step.title}</h3>
                      </div>
                    </div>
                    <div className="space-y-4 text-slate-300 leading-8">
                      {step.content.map((paragraph) => (
                        <p key={paragraph}>{paragraph}</p>
                      ))}
                      {step.list && (
                        <ul className="list-disc space-y-2 pl-5 text-slate-300">
                          {step.list.map((item) => (
                            <li key={item}>{item}</li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </section>
                ))}
              </div>

              <section className="space-y-5 pt-8">
                <h3 className="text-2xl font-semibold text-white">Client Experiences</h3>
                <p className="text-slate-300 leading-8">
                  Our clients consistently share positive experiences working with us. From initial viewings to final completion, we aim to provide a smooth and stress-free journey.
                </p>
                <p className="text-slate-300 leading-8">
                  We are known for clear communication, professional guidance, and a supportive approach throughout the entire process. Our goal is to make your property purchase as seamless and enjoyable as possible.
                </p>
              </section>

              <section className="space-y-5 pt-8">
                <h3 className="text-2xl font-semibold text-white">Looking Ahead</h3>
                <p className="text-slate-300 leading-8">
                  We look forward to helping you find the perfect property. Thank you for choosing our agency as your trusted partner in property.
                </p>
              </section>
            </div>
          </article>

          <aside className="space-y-6 w-full">
            <div className="w-full rounded-4xl border border-slate-200 bg-white p-4 sm:p-6 lg:p-8 shadow-2xl shadow-slate-950/10">
              <h3 className="text-2xl font-semibold text-slate-950">Need help now?</h3>
              <p className="mt-3 text-slate-600 leading-7">
                Our team is ready to support you whether you have a clear vision or are still exploring your options.
              </p>
              <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/properties"
                  className="flex-1 min-w-0 rounded-3xl border border-slate-300 bg-slate-950 px-5 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 text-center"
                >
                  Explore current listings
                </Link>
                <Link
                  to="/contact"
                  className="flex-1 min-w-0 rounded-3xl bg-cyan-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400 text-center"
                >
                  Speak with an advisor
                </Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}


export default BuyersGuide;