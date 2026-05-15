import React, { useMemo, useState } from 'react';
import LetBenefits from '../components/LetBenefits'
import { Link, useParams } from 'react-router-dom';
import { 
  CheckCircle2, 
  Calculator, 
  Star, 
  FileText, 
  ArrowRight,
  Info,
  ShieldCheck,
  Home,
  Award,
  Calendar,
  Phone,
  AlertTriangle,
  Check,
  Zap,
  BookOpen,
  Users,
  TrendingUp
} from 'lucide-react';

// ── DATA: MENU ITEMS ──
const RENT_MENU_ITEMS = [
  { slug: 'properties-to-let', title: 'Properties To Let', description: 'Browse rental homes and apartments.' },
  { slug: 'tenants-guide', title: 'Tenants Guide', description: 'Learn what to expect when renting.' },
  { slug: 'tenants-fees-terms', title: 'Tenants Fees & Terms', description: 'Understand deposits and costs.' },
  { slug: 'renting-reviews', title: 'Renting Reviews', description: 'See what tenants say about us.' },
];

const LANDLORD_MENU_ITEMS = [
  { slug: 'landlords-guide', title: 'Landlords Guide', description: 'Best practices for property management.' },
  { slug: 'landlords-services-fees', title: 'Landlords Services & Fees', description: 'Breakdown of service options.' },
  { slug: 'epc', title: 'EPC', description: 'Energy Performance Certificate requirements.' },
  { slug: 'landlord-reviews', title: 'Landlord Reviews', description: 'Feedback from our landlord partners.' },
  { slug: 'book-a-valuation', title: 'Book a Valuation', description: 'Get a rental valuation today.' },
];

// ── LOGIC & DATA ──
function getRentPageBySlug(slug) {
  const allItems = [...RENT_MENU_ITEMS, ...LANDLORD_MENU_ITEMS];
  return allItems.find((item) => item.slug === slug) || RENT_MENU_ITEMS[0];
}

const TENANT_CHECKLIST = [
  'Determine your budget (Rent < 30% of take-home pay)',
  'Shortlist preferred locations and commute times',
  'Prepare Right to Rent documents (Passport/Visa)',
  'Check Credit Score for referencing purposes',
  'Arrange Guarantor if income is below threshold',
  'Review Tenancy Agreement & Inventory',
];

const FEE_ITEMS = [
  { label: 'Holding Deposit', value: 'Capped at 1 week rent' },
  { label: 'Security Deposit', value: 'Capped at 5 weeks rent' },
  { label: 'Rent in Advance', value: '1 month' },
  { label: 'Late Payment / Lost Keys', value: 'As per Contract' },
];

function formatCurrency(value) {
  return new Intl.NumberFormat('en-GB', { style: 'currency', currency: 'GBP', maximumFractionDigits: 0 }).format(Number.isFinite(value) ? value : 0);
}

function estimateMoveInCost(monthlyRent, depositWeeks) {
  if (!monthlyRent) return 0;
  const weeklyRent = monthlyRent / 4.345;
  return monthlyRent + weeklyRent * depositWeeks;
}

// ── BULLET COMPONENTS ──
function PinkArrowBullet({ children }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-2 shrink-0">
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="text-rose-600">
          <path d="M2 1L12 7L2 13V1Z" fill="currentColor" />
        </svg>
      </div>
      <div className="text-slate-800 text-lg leading-relaxed">{children}</div>
    </div>
  );
}

function CheckBullet({ text }) {
  return (
    <div className="flex items-start gap-3">
      <Check className="w-5 h-5 text-green-600 mt-1 shrink-0" />
      <span className="text-slate-700 text-lg leading-relaxed">{text}</span>
    </div>
  );
}

function IconBullet({ icon, title, text }) {
  return (
    <div className="flex items-start gap-4">
      <div className="mt-1 shrink-0 text-rose-600">{icon}</div>
      <div>
        <h3 className="font-bold text-xl text-slate-900 mb-1">{title}</h3>
        <p className="text-slate-700 text-lg leading-relaxed">{text}</p>
      </div>
    </div>
  );
}

// ── REUSABLE UI COMPONENTS ──
function ToolCard({ title, icon, children, bg = 'bg-white' }) {
  return (
    <div className={`${bg} border border-slate-200 rounded-3xl p-8 md:p-10 shadow-sm`}>
      <div className="flex items-center gap-3 mb-8 pb-6 border-b border-slate-100">
        {icon && <div className="p-2 bg-slate-50 rounded-lg text-slate-700">{icon}</div>}
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">{title}</h2>
      </div>
      <div className="text-slate-600 leading-relaxed text-lg">{children}</div>
    </div>
  );
}

function SectionHeader({ title, subtitle }) {
  return (
    <div className="text-center mb-12">
      <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">{title}</h2>
      {subtitle && <p className="text-slate-600 text-lg max-w-2xl mx-auto">{subtitle}</p>}
    </div>
  );
}

// ── PAGE CONTENT GENERATORS ──

// 1. TENANTS GUIDE
function TenantsGuidePage() {
  const [doneSteps, setDoneSteps] = useState([]);
  const toggleStep = (step) => setDoneSteps((prev) => (prev.includes(step) ? prev.filter((item) => item !== step) : [...prev, step]));

  return (
    <div className="space-y-24">

      {/* Section 1: Overview */}
      <div>
        <SectionHeader title="The UK Renting Process" subtitle="Navigating the private rental sector in the UK involves specific steps and legal requirements." />
        <div className="space-y-5">
          <PinkArrowBullet>
            Renting a home in the UK typically involves searching for a property, passing referencing checks, signing a tenancy agreement, and paying a deposit.
          </PinkArrowBullet>
          <PinkArrowBullet>
            Unlike buying, renting offers flexibility but requires adherence to landlord rules and legal protections under the Housing Act 1988.
          </PinkArrowBullet>
          <PinkArrowBullet>
            Paramount Estates guides tenants through every step — from viewing to move-in — ensuring complete transparency.
          </PinkArrowBullet>
        </div>
        <div className="grid md:grid-cols-3 gap-6 mt-10">
           <div className="text-center">
             <div className="p-3 bg-slate-50 rounded-xl w-fit mx-auto text-slate-700 mb-3"><Home className="w-6 h-6" /></div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Viewing</h3>
             <p className="text-slate-600 text-sm leading-relaxed">Arrange viewings through estate agents. Be on time and ask about bills and council tax.</p>
           </div>
           <div className="text-center">
             <div className="p-3 bg-slate-50 rounded-xl w-fit mx-auto text-slate-700 mb-3"><Users className="w-6 h-6" /></div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Referencing</h3>
             <p className="text-slate-600 text-sm leading-relaxed">Prepare documents for credit checks and Right to Rent verification.</p>
           </div>
           <div className="text-center">
             <div className="p-3 bg-slate-50 rounded-xl w-fit mx-auto text-slate-700 mb-3"><FileText className="w-6 h-6" /></div>
             <h3 className="text-xl font-bold text-slate-900 mb-2">Agreement</h3>
             <p className="text-slate-600 text-sm leading-relaxed">Sign an Assured Shorthold Tenancy (AST) agreement outlining your rights.</p>
           </div>
        </div>
      </div>

      {/* Section 2: Interactive Checklist */}
      <div className="bg-slate-50 -mx-6 md:-mx-12 px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
           <ToolCard title="Tenant Preparation Checklist" icon={<Check className="w-6 h-6" />} bg="bg-white">
              <ul className="space-y-4">
                {TENANT_CHECKLIST.map((step) => (
                  <li key={step}>
                    <button
                      onClick={() => toggleStep(step)}
                      className={`w-full text-left rounded-2xl px-5 py-4 text-base font-medium transition-all duration-200 flex items-start gap-4 ${
                        doneSteps.includes(step) 
                          ? 'bg-slate-900 text-white' 
                          : 'bg-slate-50 text-slate-600 hover:bg-slate-100'
                      }`}
                    >
                      <span className="mt-1 shrink-0">
                        {doneSteps.includes(step) ? <CheckCircle2 className="w-5 h-5" /> : <div className="w-5 h-5 rounded-full border-2 border-slate-300" />}
                      </span>
                      {step}
                    </button>
                  </li>
                ))}
              </ul>
           </ToolCard>
        </div>
      </div>

      {/* Section 3: Common Mistakes */}
      <div>
        <SectionHeader title="Common Tenant Mistakes to Avoid" subtitle="Ensure a smooth tenancy by avoiding these common pitfalls." />
        <div className="space-y-8">
           <div>
             <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-xl"><AlertTriangle className="w-5 h-5" /> Not Reading the Contract</h4>
             <div className="space-y-3 ml-7">
               <CheckBullet text="Always read the tenancy agreement cover to cover before signing." />
               <CheckBullet text="Look for break clauses, rent increase terms, and notice periods." />
               <CheckBullet text="Check who is responsible for repairs and maintenance." />
             </div>
           </div>
           <div>
             <h4 className="font-bold text-red-900 mb-3 flex items-center gap-2 text-xl"><AlertTriangle className="w-5 h-5" /> Not Reporting Issues</h4>
             <div className="space-y-3 ml-7">
               <CheckBullet text="Report repairs immediately in writing or via email for a paper trail." />
               <CheckBullet text="If you don't report damage promptly, you may be liable for worsened conditions." />
               <CheckBullet text="Keep photos and records of all communications with your landlord." />
             </div>
           </div>
        </div>
      </div>

      {/* Section 4: Legal Protections */}
      <div>
        <SectionHeader title="Your Legal Protections" subtitle="UK law provides significant rights to tenants." />
        <div className="space-y-8">
          <div>
             <h3 className="font-bold text-xl mb-3 text-slate-900">Right to a Habitable Home</h3>
             <div className="space-y-2">
               <CheckBullet text="Your landlord must ensure the property is safe and in good repair." />
               <CheckBullet text="Section 11, Landlord & Tenant Act 1985 covers structural repairs." />
               <CheckBullet text="Working heating, plumbing, and electrics are mandatory." />
             </div>
          </div>
          <div>
             <h3 className="font-bold text-xl mb-3 text-slate-900">Deposit Protection</h3>
             <div className="space-y-2">
               <CheckBullet text="Your deposit must be protected in a government-backed scheme." />
               <CheckBullet text="Landlord must provide prescribed information within 30 days." />
               <CheckBullet text="You are entitled to a full refund if no damage occurs." />
             </div>
          </div>
          <div>
             <h3 className="font-bold text-xl mb-3 text-slate-900">Protection from Eviction</h3>
             <div className="space-y-2">
               <CheckBullet text="Landlords must follow strict legal procedures to evict tenants." />
               <CheckBullet text="Notice periods must comply with the Housing Act 1988." />
               <CheckBullet text="Illegal eviction is a criminal offence — seek legal advice immediately." />
             </div>
          </div>
          <div>
             <h3 className="font-bold text-xl mb-3 text-slate-900">Quiet Enjoyment</h3>
             <div className="space-y-2">
               <CheckBullet text="You have the right to live without unnecessary landlord interference." />
               <CheckBullet text="Landlord must give 24 hours notice before inspections." />
               <CheckBullet text="Harassment by a landlord can result in legal penalties." />
             </div>
          </div>
        </div>
      </div>

    </div>
  );
}

// 2. TENANTS FEES & TERMS
function FeesPage() {
  const [monthlyRent, setMonthlyRent] = useState(1800);
  const [depositWeeks, setDepositWeeks] = useState(5);
  const estimatedMoveInCost = useMemo(() => estimateMoveInCost(monthlyRent, depositWeeks), [monthlyRent, depositWeeks]);

  return (
    <div className="space-y-24">

      {/* Section 1: The Law */}
      <div>
        <SectionHeader title="The Tenant Fees Act 2019" subtitle="Understanding what landlords can and cannot charge you for." />
        <div className="space-y-5">
           <PinkArrowBullet>
             Since June 1, 2019, it is illegal for landlords in England to charge most tenancy setup fees to tenants.
           </PinkArrowBullet>
           <PinkArrowBullet>
             The only permitted payments before moving in are the <strong>Security Deposit</strong> (capped at 5 weeks' rent) and the <strong>Holding Deposit</strong> (capped at 1 week's rent).
           </PinkArrowBullet>
           <PinkArrowBullet>
             Paramount Estates operates with complete fee transparency — no hidden admin charges, ever.
           </PinkArrowBullet>
        </div>
      </div>

      {/* Section 2: Calculator */}
      <div className="bg-slate-50 -mx-6 md:-mx-12 px-6 md:px-12 py-16">
        <div className="max-w-4xl mx-auto">
          <ToolCard title="Fees & Move-In Estimate" icon={<Calculator className="w-6 h-6" />} bg="bg-white">
            <div className="grid gap-6 md:grid-cols-2 mb-8">
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                Monthly Rent (£)
                <div className="relative">
                  <span className="absolute left-5 top-4 text-slate-400">£</span>
                  <input type="number" min="500" value={monthlyRent} onChange={(e) => setMonthlyRent(Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 pl-10 pr-4 py-4 text-lg focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50" />
                </div>
              </label>
              <label className="flex flex-col gap-2 text-sm font-bold text-slate-700">
                Deposit Weeks
                <select value={depositWeeks} onChange={(e) => setDepositWeeks(Number(e.target.value))} className="w-full rounded-2xl border border-slate-200 px-4 py-4 focus:ring-2 focus:ring-slate-900 outline-none bg-slate-50">
                  <option value={1}>1 Week</option>
                  <option value={5}>5 Weeks (Max Cap)</option>
                </select>
              </label>
            </div>
            <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
              <span className="text-sm font-medium text-slate-300">Estimated Move-in Cost</span>
              <span className="text-2xl font-bold">{formatCurrency(estimatedMoveInCost)}</span>
            </div>
          </ToolCard>
        </div>
      </div>

      {/* Section 3: Fee Breakdown */}
      <div>
        <SectionHeader title="Breakdown of Costs" subtitle="Where does your money go?" />
        <div className="space-y-8">
          <div>
             <h3 className="font-bold text-2xl mb-3 text-slate-900">Security Deposit</h3>
             <div className="space-y-2">
               <CheckBullet text="A payment to cover potential damages or rent arrears at the end of tenancy." />
               <CheckBullet text="Legally capped at 5 weeks' rent for properties under £50,000 per year." />
               <CheckBullet text="Must be protected in a government-approved scheme within 30 days." />
             </div>
          </div>
          <div>
             <h3 className="font-bold text-2xl mb-3 text-slate-900">Rent in Advance</h3>
             <div className="space-y-2">
               <CheckBullet text="First month's rent is due on the day you collect keys." />
               <CheckBullet text="Subsequent rent is due on the same date each month." />
               <CheckBullet text="Standing order setup is recommended to avoid late fees." />
             </div>
          </div>
        </div>
      </div>

      {/* Section 4: Banned Fees */}
      <div>
        <SectionHeader title="Banned Fees" subtitle="Your landlord cannot legally charge you for these." />
        <div className="space-y-3">
          <CheckBullet text="Tenancy Setup Fees" />
          <CheckBullet text="Check-in / Inventory Fees" />
          <CheckBullet text="Admin & Referencing Fees" />
          <CheckBullet text="Contract Renewal Charges" />
          <CheckBullet text="Gardening / Cleaning (unless in contract)" />
          <CheckBullet text="Viewing or Accompanied Visit Fees" />
        </div>
      </div>

    </div>
  );
}

// 3. REVIEWS PAGE
function ReviewsPage() {
  const reviews = [
    { name: 'James T.', rating: 5, note: 'Transparent referencing and clear explanation of the deposit protection scheme.' },
    { name: 'Sarah L.', rating: 5, note: 'The lettings team was incredibly helpful with the move-in inventory check.' },
    { name: 'Michael R.', rating: 4, note: 'Smooth process, though the referencing took a few days longer than expected.' },
  ];

  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="What Our Tenants Say" subtitle="Real feedback from real people." />
        <div className="flex items-center justify-center gap-2 mb-12">
           <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
           <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
           <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
           <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
           <Star className="w-8 h-8 fill-amber-500 text-amber-500" />
           <span className="text-2xl font-bold text-slate-900 ml-2">5.0 Rating</span>
        </div>
        <div className="space-y-6">
          {reviews.map((r) => (
             <div key={r.name} className="border-b border-slate-100 pb-6">
                <p className="text-slate-600 italic mb-3 text-lg">"{r.note}"</p>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-slate-900">{r.name}</p>
                  <div className="text-amber-400 text-sm">{'★'.repeat(r.rating)}</div>
                </div>
             </div>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title="Why Choose Us" subtitle="We are committed to providing the best rental experience." />
        <div className="space-y-6">
           <IconBullet icon={<BookOpen className="w-6 h-6" />} title="Transparent Fees" text="No hidden charges. What you see is what you pay." />
           <IconBullet icon={<Phone className="w-6 h-6" />} title="Fast Response" text="Our team is available 24/7 for maintenance emergencies." />
           <IconBullet icon={<ShieldCheck className="w-6 h-6" />} title="Quality Homes" text="All properties are vetted for safety and compliance." />
        </div>
      </div>
    </div>
  );
}

// 4. LANDLORD GUIDE
function LandlordGuidePage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Your Responsibilities as a Landlord" subtitle="UK law requires you to maintain the property and ensure tenant safety." />
        <div className="space-y-5">
          <PinkArrowBullet>
            Being a landlord in the UK comes with significant legal responsibilities under the Housing Act 1988.
          </PinkArrowBullet>
          <PinkArrowBullet>
            Failure to comply with gas safety, electrical, and fire regulations can result in heavy fines or even a ban from renting.
          </PinkArrowBullet>
          <PinkArrowBullet>
            Paramount Estates assists you in staying compliant with Gas Safety Regulations, EPC requirements, and Fire Safety Orders.
          </PinkArrowBullet>
          <PinkArrowBullet>
            We handle Right to Rent checks, tenancy agreements, and deposit protection on your behalf.
          </PinkArrowBullet>
        </div>
      </div>

      <div>
        <SectionHeader title="Legal Compliance Checklist" subtitle="The non-negotiables for every UK property." />
        <div className="space-y-8">
          <IconBullet 
            icon={<Zap className="w-6 h-6" />} 
            title="Gas Safety (CP12)" 
            text="An annual check by a Gas Safe engineer is mandatory. You must provide a copy to the tenant." 
          />
          <IconBullet 
            icon={<TrendingUp className="w-6 h-6" />} 
            title="Energy Performance Certificate (EPC)" 
            text="Minimum rating 'E' for new lets. Valid for 10 years." 
          />
          <IconBullet 
            icon={<Users className="w-6 h-6" />} 
            title="Right to Rent Checks" 
            text="Verify all tenants over 18 have the right to live in the UK to avoid fines." 
          />
          <IconBullet 
            icon={<ShieldCheck className="w-6 h-6" />} 
            title="Smoke Alarms" 
            text="At least one alarm on every storey. Carbon monoxide alarms where solid fuel is used." 
          />
        </div>
      </div>

      <div>
        <SectionHeader title="Tenant Vetting" subtitle="Finding the right tenant is key to a stress-free experience." />
        <p className="text-slate-600 mb-6 text-lg">We conduct comprehensive referencing including:</p>
        <div className="space-y-4">
          <CheckBullet text="Affordability Checks — Income must be at least 2.5x the monthly rent." />
          <CheckBullet text="Credit History — Full UK credit report to assess financial reliability." />
          <CheckBullet text="Previous Landlord References — Verification of rental history and conduct." />
          <CheckBullet text="Right to Rent Validation — Passport, visa, and biometric permit checks." />
          <CheckBullet text="Employment Verification — Current employer confirmation and contract review." />
        </div>
      </div>

      <LetBenefits />
    </div>
  );
}

// 5. SERVICES & FEES
function ServicesPage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Our Service Levels" subtitle="Choose how much involvement you want in managing your property." />
        <div className="space-y-10">
           <div>
             <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Let Only</h3>
                <span className="bg-slate-100 text-slate-800 font-bold px-3 py-1 rounded-full text-sm">+ VAT</span>
             </div>
             <div className="space-y-3 mb-4">
               <CheckBullet text="We find the tenant and handle all initial paperwork and referencing." />
               <CheckBullet text="You manage the day-to-day tenancy, rent collection, and maintenance." />
               <CheckBullet text="Ideal for experienced landlords with available time." />
             </div>
             <p className="text-xl font-bold text-slate-900">Fee: 8% - 10% of first month's rent</p>
           </div>
           <div className="border-t border-slate-200 pt-10">
             <div className="flex items-center gap-3 mb-4">
                <h3 className="text-2xl font-bold text-slate-900">Full Management</h3>
                <span className="bg-slate-100 text-slate-800 font-bold px-3 py-1 rounded-full text-sm">+ VAT</span>
             </div>
             <div className="space-y-3 mb-4">
               <CheckBullet text="We handle everything: rent collection, maintenance, compliance, and inspections." />
               <CheckBullet text="24/7 emergency maintenance coordination included." />
               <CheckBullet text="Legal notice serving and deposit dispute handling." />
             </div>
             <p className="text-xl font-bold text-slate-900">Fee: 10% - 12% of monthly rent</p>
           </div>
        </div>
      </div>
      <div>
        <SectionHeader title="Included in Management" subtitle="Value-added services at no extra cost." />
        <div className="space-y-3">
          <CheckBullet text="Rent Collection & Monthly Statements" />
          <CheckBullet text="Maintenance Coordination & Contractor Management" />
          <CheckBullet text="Legal Notices & Section 21 / Section 8 Serving" />
          <CheckBullet text="Tenant Find & Comprehensive Referencing" />
          <CheckBullet text="Quarterly Property Inspections" />
          <CheckBullet text="Deposit Protection & Dispute Resolution" />
          <CheckBullet text="Gas Safety & EPC Renewal Reminders" />
          <CheckBullet text="Annual Tax Statement Preparation" />
        </div>
      </div>

      <LetBenefits />
    </div>
  );
}

// 6. EPC PAGE
function EPCPage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Energy Performance Certificate (EPC)" subtitle="Why it matters and what the new rules mean for you." />
        <div className="space-y-4 mb-6">
          <PinkArrowBullet>
            An EPC gives a property an energy efficiency rating from A (most efficient) to G (least efficient).
          </PinkArrowBullet>
          <PinkArrowBullet>
            The certificate is valid for 10 years and must be available before marketing the property.
          </PinkArrowBullet>
          <PinkArrowBullet>
            Paramount Estates can arrange EPC assessments through certified domestic energy assessors.
          </PinkArrowBullet>
        </div>
        <div className="flex gap-2 mb-4 flex-wrap">
           <div className="px-4 py-2 bg-green-500 text-white rounded font-bold">A</div>
           <div className="px-4 py-2 bg-green-500 text-white rounded font-bold">B</div>
           <div className="px-4 py-2 bg-lime-500 text-white rounded font-bold">C</div>
           <div className="px-4 py-2 bg-lime-500 text-white rounded font-bold">D</div>
           <div className="px-4 py-2 bg-yellow-500 text-white rounded font-bold">E</div>
           <div className="px-4 py-2 bg-orange-500 text-white rounded font-bold">F</div>
           <div className="px-4 py-2 bg-red-500 text-white rounded font-bold">G</div>
        </div>
      </div>

      <div>
        <SectionHeader title="The Minimum 'E' Rating Rule" subtitle="Crucial information for new lets in England." />
        <div className="space-y-4">
          <div className="flex items-start gap-4">
            <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0 mt-1" />
            <div className="space-y-3">
              <h3 className="text-xl font-bold text-red-900">Effective 1 April 2020</h3>
              <PinkArrowBullet>
                Privately rented properties in England must have a minimum rating of <strong>Band E</strong>.
              </PinkArrowBullet>
              <PinkArrowBullet>
                You cannot legally let a property rated F or G to new tenants without making recommended improvements.
              </PinkArrowBullet>
              <PinkArrowBullet>
                Fines of up to £5,000 can be imposed for non-compliance with MEES regulations.
              </PinkArrowBullet>
            </div>
          </div>
        </div>
      </div>

      <div>
        <SectionHeader title="How to Improve Your Rating" subtitle="Simple steps to boost efficiency." />
        <div className="space-y-4">
          <CheckBullet text="LED Lighting — Replace old bulbs with energy-efficient LEDs throughout the property." />
          <CheckBullet text="Loft & Wall Insulation — Improve thermal retention and reduce heating costs." />
          <CheckBullet text="Boiler Upgrade — Modern condensing boilers are far more efficient than older models." />
          <CheckBullet text="Double Glazing — Reduce heat loss and draughts through windows." />
          <CheckBullet text="Smart Heating Controls — Install thermostatic radiator valves and smart thermostats." />
          <CheckBullet text="Draught Proofing — Seal gaps around doors, windows, and floorboards." />
        </div>
      </div>

      <LetBenefits />
    </div>
  );
}

// 7. LANDLORD REVIEWS
function LandlordReviewsPage() {
  const reviews = [
    { name: 'Robert H.', rating: 5, note: 'Found a great tenant within 48 hours. The vetting process was thorough and saved me a bad letting.' },
    { name: 'Priya M.', rating: 5, note: 'Full management service is worth every penny. I don\'t worry about midnight maintenance calls anymore.' },
    { name: 'David K.', rating: 5, note: 'Honest valuation and no hidden fees. Highly recommend for new landlords.' },
  ];
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Trusted by Landlords" subtitle="See why over 500 landlords choose our management services." />
        <div className="space-y-6">
          {reviews.map((r) => (
             <div key={r.name} className="border-b border-slate-100 pb-6">
                <p className="text-slate-600 italic mb-3 text-lg">"{r.note}"</p>
                <div className="flex items-center gap-3">
                  <p className="font-bold text-slate-900 text-lg">{r.name}</p>
                  <div className="text-amber-400">{'★'.repeat(r.rating)}</div>
                </div>
             </div>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title="Our Promise" subtitle="We treat your property as if it were our own." />
        <div className="space-y-4 max-w-2xl mx-auto text-left mb-8">
          <CheckBullet text="Reduced Void Periods — Your property marketed across all major portals within 24 hours." />
          <CheckBullet text="Rigorous Vetting — Only the most reliable tenants pass our referencing process." />
          <CheckBullet text="Transparent Pricing — No hidden fees, ever. What we quote is what you pay." />
        </div>
        <div className="text-center">
          <Link to="/contact" className="inline-block bg-slate-900 text-white px-8 py-3 rounded-full font-bold">Partner With Us</Link>
        </div>
      </div>

      <LetBenefits />
    </div>
  );
}

// 8. BOOK VALUATION
function ValuationPage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Book a Free Valuation" subtitle="Get an accurate rental valuation for your property." />
        <div className="space-y-10">
          <div>
             <h3 className="text-xl font-bold mb-4 text-slate-900">Why Valuation Matters?</h3>
             <div className="space-y-3">
               <CheckBullet text="Setting the right rent is crucial — too high and it sits empty, too low and you lose income." />
               <CheckBullet text="Our agents use live market data from comparable properties in Romford and Dagenham." />
               <CheckBullet text="We consider property condition, location, transport links, and local demand." />
             </div>
          </div>
          <div>
             <h3 className="text-xl font-bold mb-4 text-slate-900">The Process</h3>
             <div className="space-y-4">
               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">1</div>
                 <p className="text-slate-600 text-lg">Book an appointment online or by phone.</p>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">2</div>
                 <p className="text-slate-600 text-lg">Our local expert visits your property at a convenient time.</p>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">3</div>
                 <p className="text-slate-600 text-lg">We provide a detailed comparable market analysis report.</p>
               </div>
               <div className="flex items-start gap-4">
                 <div className="w-8 h-8 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-sm shrink-0">4</div>
                 <p className="text-slate-600 text-lg">You decide to list — no obligation, no pressure.</p>
               </div>
             </div>
          </div>
        </div>
      </div>

      <div className="text-center">
        <Calendar className="w-12 h-12 mx-auto mb-6 text-slate-400" />
        <h3 className="text-3xl font-bold mb-4 text-slate-900">Schedule Your Visit</h3>
        <div className="max-w-xl mx-auto space-y-3 mb-8 text-left">
          <CheckBullet text="No obligation — receive your report and take your time deciding." />
          <CheckBullet text="No pressure — our advice is honest and data-driven, never pushy." />
          <CheckBullet text="Same-day appointments often available across RM postcodes." />
        </div>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800">Book Online</Link>
          <Link to="/contact" className="border border-slate-300 text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50">Call Us</Link>
        </div>
      </div>
    </div>
  );
}

// ── MAIN RENDER LOGIC ──
function getPageContent(slug) {
  switch (slug) {
    case 'tenants-guide': return <TenantsGuidePage />;
    case 'tenants-fees-terms': return <FeesPage />;
    case 'renting-reviews': return <ReviewsPage />;
    case 'landlords-guide': return <LandlordGuidePage />;
    case 'landlords-services-fees': return <ServicesPage />;
    case 'epc': return <EPCPage />;
    case 'landlord-reviews': return <LandlordReviewsPage />;
    case 'book-a-valuation': return <ValuationPage />;
    default: return <TenantsGuidePage />;
  }
}

export default function RentPage() {
  const { slug } = useParams();
  const pageData = getRentPageBySlug(slug);

  return (
    <main className="min-h-screen bg-white text-slate-950 font-sans">
      {/* ── Hero ── */}
      <section className="w-full bg-slate-50 border-b border-slate-200 py-20 md:py-28">
        <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
          <div className="max-w-3xl">
            <p className="text-sm font-bold uppercase tracking-widest text-slate-400 mb-4">Letting Resources</p>
            <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight mb-6">
              {pageData.title}
            </h1>
            <p className="text-lg md:text-xl text-slate-600 leading-relaxed max-w-2xl">
              {pageData.description}
            </p>
          </div>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/rent/properties-to-let" className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800 transition-all shadow-lg shadow-slate-900/10">
              Browse Properties <ArrowRight className="w-4 h-4" />
            </Link>
            <Link to="/contact" className="inline-flex items-center gap-2 border border-slate-300 bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-50 transition-all">
              Contact Advisor
            </Link>
          </div>
        </div>
      </section>

      {/* ── Main Content (No Sidebar) ── */}
      <div className="max-w-5xl mx-auto px-6 sm:px-8 lg:px-12 py-24">
        {getPageContent(slug)}
      </div>
    </main>
  );
}