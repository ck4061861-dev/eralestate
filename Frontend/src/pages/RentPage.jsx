import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import { RENT_MENU_ITEMS, LANDLORD_MENU_ITEMS } from '../data/menuItems'

function getRentPageBySlug(slug) {
  return [...RENT_MENU_ITEMS, ...LANDLORD_MENU_ITEMS].find((item) => item.slug === slug) || RENT_MENU_ITEMS[0]
}

const TENANT_CHECKLIST = [
  'Set your budget and move-in date',
  'Shortlist locations, transport links, and amenities',
  'Prepare documents for referencing and applications',
  'Review tenancy terms, deposits, and inventory details',
  'Confirm move-in arrangements and utilities',
]

const REVIEW_SAMPLE = [
  { name: 'Daniel P.', rating: 5, note: 'Clear viewing process and fast communication from the lettings team.' },
  { name: 'Priya S.', rating: 4, note: 'Helpful guidance on documents, deposits, and move-in timing.' },
  { name: 'Hassan M.', rating: 5, note: 'Straightforward tenancy terms and a smooth handover.' },
]

const FEE_ITEMS = [
  { label: 'Holding Deposit', value: 'Up to 1 week rent' },
  { label: 'Security Deposit', value: 'Up to 5 weeks rent' },
  { label: 'Rent in Advance', value: '1 month or as agreed' },
  { label: 'Late Payment / Lost Key Fees', value: 'Subject to tenancy terms' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0)
}

function estimateMoveInCost(monthlyRent, depositWeeks) {
  if (!monthlyRent) return 0
  const weeklyRent = monthlyRent / 4.345
  return monthlyRent + weeklyRent * depositWeeks
}

function ToolCard({ title, children }) {
  return (
    <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10">
      <h2 className="text-xl font-bold text-slate-950">{title}</h2>
      <div className="mt-4 text-slate-700">{children}</div>
    </div>
  )
}

function TenantGuideTool() {
  const [doneSteps, setDoneSteps] = useState([])
  const toggleStep = (step) => setDoneSteps((prev) => (prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step]))

  return (
    <ToolCard title="Tenant Checklist">
      <ul className="space-y-3">
        {TENANT_CHECKLIST.map((step) => (
          <li key={step}>
            <button
              onClick={() => toggleStep(step)}
              className={`w-full rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${doneSteps.includes(step) ? 'border-cyan-500 bg-cyan-50 text-cyan-900' : 'border-slate-200 bg-slate-50 text-slate-700 hover:border-slate-300'}`}
            >
              {doneSteps.includes(step) ? '✔' : '○'} {step}
            </button>
          </li>
        ))}
      </ul>
    </ToolCard>
  )
}

function FeesTool() {
  const [monthlyRent, setMonthlyRent] = useState(1600)
  const [depositWeeks, setDepositWeeks] = useState(5)
  const estimatedMoveInCost = useMemo(() => estimateMoveInCost(monthlyRent, depositWeeks), [monthlyRent, depositWeeks])

  return (
    <ToolCard title="Fees & Move-In Estimate">
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          Monthly Rent
          <input type="number" min="500" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="rounded-2xl border border-slate-300 px-3 py-2" />
        </label>
        <label className="flex flex-col gap-2 text-sm text-slate-700">
          Deposit Weeks
          <input type="number" min="1" max="10" value={depositWeeks} onChange={(e) => setDepositWeeks(Number(e.target.value))} className="rounded-2xl border border-slate-300 px-3 py-2" />
        </label>
      </div>
      <div className="mt-6 space-y-3 text-sm text-slate-700">
        {FEE_ITEMS.map((item) => (
          <div key={item.label} className="flex justify-between border-b border-slate-200 pb-2">
            <span>{item.label}</span>
            <strong>{item.value}</strong>
          </div>
        ))}
      </div>
      <p className="mt-5 text-sm font-semibold text-slate-900">Estimated move-in cost: {formatCurrency(estimatedMoveInCost)}</p>
    </ToolCard>
  )
}

function ReviewsTool() {
  const average = (REVIEW_SAMPLE.reduce((sum, review) => sum + review.rating, 0) / REVIEW_SAMPLE.length).toFixed(1)

  return (
    <ToolCard title="Tenant Reviews">
      <p className="text-sm text-slate-700">Average Rating: {average} / 5</p>
      <div className="mt-4 space-y-4">
        {REVIEW_SAMPLE.map((review) => (
          <article key={review.name} className="rounded-3xl border border-slate-200 bg-slate-50 p-4">
            <h3 className="font-semibold text-slate-900">{review.name}</h3>
            <p className="mt-2 text-sm text-slate-700">{review.note}</p>
            <p className="mt-3 text-sm text-amber-500">{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
          </article>
        ))}
      </div>
    </ToolCard>
  )
}

function LandlordInfoTool({ title, text }) {
  return (
    <ToolCard title={title}>
      <p className="text-sm text-slate-700">{text}</p>
      <ul className="mt-4 list-disc space-y-2 pl-5 text-sm text-slate-700">
        <li>Professional property marketing</li>
        <li>Compliance & legal support</li>
        <li>Tenant screening & referencing</li>
        <li>Rent collection and maintenance coordination</li>
      </ul>
    </ToolCard>
  )
}

function getPageTool(slug) {
  if (slug === 'tenants-guide') return <TenantGuideTool />
  if (slug === 'tenants-fees-terms') return <FeesTool />
  if (slug === 'renting-reviews') return <ReviewsTool />
  if (slug === 'landlords-guide') return <LandlordInfoTool title="Landlords Guide" text="Best practice for successful rentals, tenant retention, and fast agreement turnaround." />
  if (slug === 'landlords-services-fees') return <LandlordInfoTool title="Landlords Services & Fees" text="Service levels and fee structure for landlords with full control and optional agency support." />
  if (slug === 'epc') return <LandlordInfoTool title="EPC" text="Energy Performance Certificates, legal requirements and how to prepare your property for appraisal." />
  if (slug === 'landlord-reviews') return <LandlordInfoTool title="Landlord Reviews" text="Read landlord case studies and ratings to trust our process for faster lets and fewer voids." />
  if (slug === 'book-a-valuation') return <LandlordInfoTool title="Book a Valuation" text="Book a no-obligation rental valuation with our expert lettings team today." />
  return <TenantGuideTool />
}

export default function RentPage() {
  const { slug } = useParams()
  
  const pageData = getRentPageBySlug(slug)

  return (
    <main className="bg-slate-50 text-slate-950 min-h-screen">
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-cyan-400/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 z-10">
          <p className="text-sm font-bold uppercase tracking-[0.3em] text-emerald-400">Rent Property</p>
          <h1 className="mt-4 text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-7xl">{pageData.title}</h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300 sm:text-xl">{pageData.description}</p>
          
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/rent/properties-to-let"
              className="inline-flex rounded-full bg-emerald-500 px-8 py-3.5 text-base font-bold text-slate-950 transition hover:bg-emerald-400 shadow-xl shadow-emerald-500/20 hover:scale-105"
            >
              Browse Rent Options
            </Link>
            <Link
              to="/contact"
              className="inline-flex rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-base font-bold text-white transition hover:bg-slate-700 hover:border-slate-500 backdrop-blur-sm"
            >
              Contact Advisor
            </Link>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            {getPageTool(slug)}
          </div>

          <aside className="space-y-4">
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10">
              <h2 className="text-xl font-bold text-slate-950">More Guides</h2>
              <ul className="mt-4 space-y-2 text-sm text-slate-700">
                {[...RENT_MENU_ITEMS, ...LANDLORD_MENU_ITEMS].map((item) => (
                  <li key={item.slug}>
                    <Link className="block rounded-2xl px-3 py-2 transition hover:bg-slate-100" to={`/rent/${item.slug}`}>{item.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-4xl border border-slate-200 bg-white p-6 shadow-2xl shadow-slate-950/10">
              <h2 className="text-xl font-bold text-slate-950">Need Help?</h2>
              <p className="mt-3 text-sm text-slate-600">Contact our lettings team for personalised advice and shortlisted rental options.</p>
              <Link to="/contact" className="mt-4 inline-flex w-full justify-center rounded-2xl bg-cyan-500 px-4 py-3 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                Contact Us
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
