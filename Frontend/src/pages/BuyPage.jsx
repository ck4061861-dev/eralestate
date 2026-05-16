import { Link, useParams } from 'react-router-dom'
import { useMemo, useState } from 'react'
import PropertySection from '../components/PropertySection'
import { useNavPagesContent } from '../contexts/NavPagesContext'


function getBuyPageBySlug(slug, menuItems) {
  return menuItems.find((item) => item.slug === slug)
}

const GUIDE_STEPS = [
  'Define budget and agreement in principle',
  'Shortlist neighbourhoods and property type',
  'Book viewings and compare local market value',
  'Make offer and start legal checks',
  'Complete surveys, mortgage and exchange contracts',
]

const REVIEW_SAMPLE = [
  { name: 'Aisha R.', rating: 5, note: 'Clear communication and fast process from shortlist to completion.' },
  { name: 'Omar K.', rating: 4, note: 'Great property options and honest advice for first-time buyers.' },
  { name: 'Mia D.', rating: 5, note: 'Mortgage guidance and legal coordination saved us a lot of time.' },
]

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', {
    style: 'currency',
    currency: 'GBP',
    maximumFractionDigits: 0,
  }).format(Number.isFinite(value) ? value : 0)
}

function calculateMortgage(principal, annualRate, years) {
  const monthlyRate = annualRate / 100 / 12
  const totalPayments = years * 12

  if (!principal || !annualRate || !years) {
    return 0
  }

  if (monthlyRate === 0) {
    return principal / totalPayments
  }

  return (principal * monthlyRate * (1 + monthlyRate) ** totalPayments) / ((1 + monthlyRate) ** totalPayments - 1)
}

function calculateStampDuty(price) {
  if (!price || price <= 250000) {
    return 0
  }

  const bands = [
    { threshold: 250000, rate: 0 },
    { threshold: 925000, rate: 0.05 },
    { threshold: 1500000, rate: 0.1 },
    { threshold: Infinity, rate: 0.12 },
  ]

  let tax = 0
  let previousThreshold = 0

  for (const band of bands) {
    const taxableInBand = Math.min(price, band.threshold) - previousThreshold
    if (taxableInBand > 0) {
      tax += taxableInBand * band.rate
    }
    previousThreshold = band.threshold
    if (price <= band.threshold) {
      break
    }
  }

  return tax
}

function MortgageTool() {
  const [amount, setAmount] = useState(350000)
  const [rate, setRate] = useState(4.6)
  const [years, setYears] = useState(25)

  const monthlyPayment = useMemo(() => calculateMortgage(amount, rate, years), [amount, rate, years])

  return (
    <div className="buy-tool-card">
      <h2>Mortgage Estimator</h2>
      <div className="buy-tool-grid">
        <label>
          Loan Amount
          <input type="number" min="10000" value={amount} onChange={(e) => setAmount(Number(e.target.value))} />
        </label>
        <label>
          Interest Rate (%)
          <input type="number" min="0" step="0.1" value={rate} onChange={(e) => setRate(Number(e.target.value))} />
        </label>
        <label>
          Term (Years)
          <input type="number" min="1" max="40" value={years} onChange={(e) => setYears(Number(e.target.value))} />
        </label>
      </div>
      <p className="buy-tool-result">Estimated Monthly Payment: {formatCurrency(monthlyPayment)}</p>
    </div>
  )
}

function StampDutyTool() {
  const [price, setPrice] = useState(450000)
  const tax = useMemo(() => calculateStampDuty(price), [price])

  return (
    <div className="buy-tool-card">
      <h2>Stamp Duty Estimator</h2>
      <div className="buy-tool-grid single">
        <label>
          Property Price
          <input type="number" min="50000" value={price} onChange={(e) => setPrice(Number(e.target.value))} />
        </label>
      </div>
      <p className="buy-tool-result">Estimated Stamp Duty: {formatCurrency(tax)}</p>
    </div>
  )
}

function BuyersGuideTool() {
  const [doneSteps, setDoneSteps] = useState([])

  function toggleStep(step) {
    setDoneSteps((prev) =>
      prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step],
    )
  }

  return (
    <div className="buy-tool-card">
      <h2>Buyer Checklist</h2>
      <ul className="buy-checklist">
        {GUIDE_STEPS.map((step) => (
          <li key={step}>
            <button
              type="button"
              className={doneSteps.includes(step) ? 'checked' : ''}
              onClick={() => toggleStep(step)}
            >
              {doneSteps.includes(step) ? '✔' : '○'} {step}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function ReviewsTool() {
  const average = (
    REVIEW_SAMPLE.reduce((sum, review) => sum + review.rating, 0) / REVIEW_SAMPLE.length
  ).toFixed(1)

  return (
    <div className="buy-tool-card">
      <h2>Verified Buyer Reviews</h2>
      <p className="buy-tool-result">Average Rating: {average} / 5</p>
      <div className="buy-reviews-grid">
        {REVIEW_SAMPLE.map((review) => (
          <article key={review.name}>
            <h3>{review.name}</h3>
            <p>{'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}</p>
            <small>{review.note}</small>
          </article>
        ))}
      </div>
    </div>
  )
}

function getPageTool(slug) {
  if (slug === 'mortgage-calculator') {
    return <MortgageTool />
  }
  if (slug === 'stamp-duty-calculator') {
    return <StampDutyTool />
  }
  if (slug === 'buyers-guide') {
    return <BuyersGuideTool />
  }
  if (slug === 'buying-reviews') {
    return <ReviewsTool />
  }
  return null
}

export default function BuyPage() {
  const { slug } = useParams()
  const { getMenuByCategory } = useNavPagesContent()
  const page = getBuyPageBySlug(slug, getMenuByCategory('buy'))

  if (!page) {
    return (
      <main className="buy-page">
        <div className="buy-page-shell">
          <h1>Page Not Found</h1>
          <p>The page you are looking for does not exist in the Buy section.</p>
          <Link className="buy-page-back" to="/properties">
            Back to Properties
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-50 min-h-screen">
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute -top-24 -left-24 h-96 w-96 rounded-full bg-cyan-600/10 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-0 h-96 w-96 rounded-full bg-blue-600/10 blur-3xl pointer-events-none" />
        
        <div className="relative mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 z-10">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Buy Property</p>
          <h1 className="mt-4 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-7xl">
            {page.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-slate-300">
            {page.description}
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/properties"
              className="rounded-full bg-cyan-500 px-8 py-3.5 text-base font-bold text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400 hover:scale-105"
            >
              Explore Properties
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-slate-700 bg-slate-800/50 px-8 py-3.5 text-base font-bold text-white transition hover:bg-slate-700 hover:border-slate-500 backdrop-blur-sm"
            >
              Contact Advisor
            </Link>
          </div>

          <div className="mt-16 grid gap-6 sm:grid-cols-3 border-t border-slate-800/80 pt-10">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Fast search</p>
              <h3 className="mt-2 text-2xl font-bold text-white">115+ sale listings</h3>
              <p className="mt-2 text-sm text-slate-400">Verified properties, instant updates.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Trusted agents</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Local experts</h3>
              <p className="mt-2 text-sm text-slate-400">End-to-end guidance from valuation to closing.</p>
            </div>
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-cyan-400">Value gains</p>
              <h3 className="mt-2 text-2xl font-bold text-white">Price intelligence</h3>
              <p className="mt-2 text-sm text-slate-400">Get notified on price drops and market opportunities.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 py-16">
        <div className="rounded-3xl bg-white p-8 shadow-xl shadow-slate-200/50 border border-slate-100 mb-12">
          {getPageTool(slug)}
        </div>

        <section className="mt-12 rounded-2xl border border-slate-200 bg-white p-6 shadow-lg">
          <div className="mb-6 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-cyan-500">For sale listings</p>
              <h2 className="text-2xl font-bold text-slate-900">Properties available to buy</h2>
              <p className="text-sm text-slate-600">Only sale listings are shown here, directly from the seller inventory.</p>
            </div>
            <Link
              to="/properties"
              className="rounded-lg bg-cyan-600 px-4 py-2 text-sm font-semibold text-white hover:bg-cyan-700 transition"
            >
              Browse all properties
            </Link>
          </div>

          <PropertySection typeFilter="sale" compact={true} ctaText="See all sale properties" />
        </section>
      </div>
    </main>
  )
}
