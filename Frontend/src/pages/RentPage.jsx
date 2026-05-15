import React, { useMemo, useState } from 'react';
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

function InfoCard({ title, text, icon }) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
      <div className="mb-4 p-3 bg-slate-50 rounded-xl w-fit text-slate-700">{icon}</div>
      <h3 className="text-xl font-bold text-slate-900 mb-2">{title}</h3>
      <p className="text-slate-600 text-sm leading-relaxed">{text}</p>
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
        <div className="bg-white border border-slate-200 rounded-3xl p-8 md:p-12">
          <p className="text-lg text-slate-600 leading-relaxed mb-6">
            Renting a home in the UK typically involves searching for a property, passing referencing checks, signing a tenancy agreement, and paying a deposit. Unlike buying, renting offers flexibility but requires adherence to landlord rules and legal protections.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
             <InfoCard title="Viewing" text="Arrange viewings through estate agents. Be on time and ask about bills and council tax." icon={<Home className="w-6 h-6" />} />
             <InfoCard title="Referencing" text="Prepare documents for credit checks and Right to Rent verification." icon={<Users className="w-6 h-6" />} />
             <InfoCard title="Agreement" text="Sign an Assured Shorthold Tenancy (AST) agreement outlining your rights." icon={<FileText className="w-6 h-6" />} />
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
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
             <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Not Reading the Contract</h4>
             <p className="text-sm text-red-800">Always read the tenancy agreement. Look for break clauses, rent increase terms, and notice periods.</p>
           </div>
           <div className="bg-red-50 border border-red-100 p-6 rounded-3xl">
             <h4 className="font-bold text-red-900 mb-2 flex items-center gap-2"><AlertTriangle className="w-5 h-5" /> Not Reporting Issues</h4>
             <p className="text-sm text-red-800">Report repairs immediately in writing. If you don't, you may be liable for damages caused later.</p>
           </div>
        </div>
      </div>

      {/* Section 4: Legal Protections */}
      <div>
        <SectionHeader title="Your Legal Protections" subtitle="UK law provides significant rights to tenants." />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-xl mb-4">Right to a Habitable Home</h3>
             <p className="text-slate-600 text-sm">Your landlord must ensure the property is safe and in good repair (Section 11, Landlord & Tenant Act 1985).</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-xl mb-4">Deposit Protection</h3>
             <p className="text-slate-600 text-sm">Your money must be protected in a government-backed scheme within 30 days.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-xl mb-4">Protection from Eviction</h3>
             <p className="text-slate-600 text-sm">Landlords must follow legal procedures to evict you; they cannot force you out themselves.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="font-bold text-xl mb-4">Quiet Enjoyment</h3>
             <p className="text-slate-600 text-sm">You have the right to live in your home without unnecessary interference from the landlord.</p>
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
        <div className="bg-blue-50 border border-blue-100 p-8 md:p-12 rounded-3xl">
           <p className="text-lg text-blue-900 leading-relaxed mb-4">
             Since June 1, 2019, it is illegal for landlords in England to charge most "holding deposits" or tenancy setup fees to tenants.
           </p>
           <p className="text-base text-blue-800">
             The only payments you should be asked to make before moving in are the <strong>Security Deposit</strong> (capped at 5 weeks' rent) and the <strong>Holding Deposit</strong> (capped at 1 week's rent).
           </p>
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
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
             <h3 className="font-bold text-2xl mb-2">Security Deposit</h3>
             <p className="text-slate-600 mb-4">A payment to cover potential damages or rent arrears.</p>
             <p className="text-sm font-bold text-slate-900">Capped at 5 weeks' rent.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200">
             <h3 className="font-bold text-2xl mb-2">Rent in Advance</h3>
             <p className="text-slate-600 mb-4">Payment due on the day you move in.</p>
             <p className="text-sm font-bold text-slate-900">Usually 1 month's rent.</p>
          </div>
        </div>
      </div>

      {/* Section 4: Banned Fees */}
      <div>
        <SectionHeader title="Banned Fees" subtitle="Your landlord cannot legally charge you for these." />
        <div className="bg-red-50 border border-red-200 p-8 md:p-12 rounded-3xl">
          <ul className="grid md:grid-cols-2 gap-4 text-slate-800">
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> Tenancy Setup Fees</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> Check-in / Inventory Fees</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> Admin Fees</li>
            <li className="flex items-center gap-3"><Check className="w-5 h-5 text-green-600" /> Gardening / Cleaning (unless in contract)</li>
          </ul>
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
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
             <div key={r.name} className="bg-white p-6 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-600 italic mb-4">"{r.note}"</p>
                <p className="font-bold text-slate-900">{r.name}</p>
                <div className="text-amber-400 text-xs mt-2">{'★'.repeat(r.rating)}</div>
             </div>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title="Why Choose Us" subtitle="We are committed to providing the best rental experience." />
        <div className="grid md:grid-cols-3 gap-6">
           <InfoCard title="Transparent Fees" text="No hidden charges. What you see is what you pay." icon={<BookOpen className="w-6 h-6" />} />
           <InfoCard title="Fast Response" text="Our team is available 24/7 for maintenance emergencies." icon={<Phone className="w-6 h-6" />} />
           <InfoCard title="Quality Homes" text="All properties are vetted for safety and compliance." icon={<ShieldCheck className="w-6 h-6" />} />
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
        <div className="bg-slate-50 p-8 md:p-12 rounded-3xl text-lg text-slate-700 leading-relaxed">
          <p className="mb-4">Being a landlord in the UK comes with significant legal responsibilities. Failure to comply can result in heavy fines or even a ban from renting out property.</p>
          <p>We assist you in staying compliant with the Housing Act 1988, Gas Safety Regulations, and Fire Safety Orders.</p>
        </div>
      </div>

      <div>
        <SectionHeader title="Legal Compliance Checklist" subtitle="The non-negotiables for every UK property." />
        <div className="grid md:grid-cols-2 gap-6">
          <InfoCard 
            title="Gas Safety (CP12)" 
            text="An annual check by a Gas Safe engineer is mandatory. You must provide a copy to the tenant." 
            icon={<Zap className="w-6 h-6" />} 
          />
          <InfoCard 
            title="Energy Performance Certificate (EPC)" 
            text="Minimum rating 'E' for new lets. Valid for 10 years." 
            icon={<TrendingUp className="w-6 h-6" />} 
          />
          <InfoCard 
            title="Right to Rent Checks" 
            text="Verify all tenants over 18 have the right to live in the UK to avoid fines." 
            icon={<Users className="w-6 h-6" />} 
          />
          <InfoCard 
            title="Smoke Alarms" 
            text="At least one alarm on every storey. Carbon monoxide alarms where solid fuel is used." 
            icon={<ShieldCheck className="w-6 h-6" />} 
          />
        </div>
      </div>

      <div>
        <SectionHeader title="Tenant Vetting" subtitle="Finding the right tenant is key to a stress-free experience." />
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200">
           <p className="text-slate-600 mb-6">We conduct comprehensive referencing including:</p>
           <ul className="space-y-2 text-slate-700">
             <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-slate-400" /> Affordability Checks (Income vs Rent)</li>
             <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-slate-400" /> Credit History</li>
             <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-slate-400" /> Previous Landlord References</li>
             <li className="flex gap-2"><CheckCircle2 className="w-5 h-5 text-slate-400" /> Right to Rent Validation</li>
           </ul>
        </div>
      </div>
    </div>
  );
}

// 5. SERVICES & FEES
function ServicesPage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Our Service Levels" subtitle="Choose how much involvement you want in managing your property." />
        <div className="space-y-6">
           <div className="bg-white p-8 rounded-3xl border-2 border-slate-200 hover:border-slate-900 transition-colors">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Let Only</h3>
                <span className="bg-slate-100 text-slate-800 font-bold px-3 py-1 rounded-full">+ VAT</span>
             </div>
             <p className="text-slate-600 mb-4">We find the tenant and handle the paperwork. You manage the day-to-day.</p>
             <p className="text-xl font-bold text-slate-900">Fee: 8% - 10% of first month's rent</p>
           </div>
           <div className="bg-slate-900 text-white p-8 rounded-3xl">
             <div className="flex justify-between items-center mb-4">
                <h3 className="text-2xl font-bold">Full Management</h3>
                <span className="bg-white/20 text-white font-bold px-3 py-1 rounded-full">+ VAT</span>
             </div>
             <p className="text-slate-300 mb-4">We handle everything: rent, maintenance, compliance, and inspections.</p>
             <p className="text-xl font-bold text-white">Fee: 10% - 12% of monthly rent</p>
           </div>
        </div>
      </div>
      <div>
        <SectionHeader title="Included in Management" subtitle="Value-added services at no extra cost." />
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
           <div className="p-4 bg-slate-50 rounded-2xl text-center"><Award className="w-8 h-8 mx-auto mb-2 text-slate-400" /><p className="text-sm font-bold text-slate-900">Rent Collection</p></div>
           <div className="p-4 bg-slate-50 rounded-2xl text-center"><Home className="w-8 h-8 mx-auto mb-2 text-slate-400" /><p className="text-sm font-bold text-slate-900">Maintenance</p></div>
           <div className="p-4 bg-slate-50 rounded-2xl text-center"><FileText className="w-8 h-8 mx-auto mb-2 text-slate-400" /><p className="text-sm font-bold text-slate-900">Legal Notices</p></div>
           <div className="p-4 bg-slate-50 rounded-2xl text-center"><Users className="w-8 h-8 mx-auto mb-2 text-slate-400" /><p className="text-sm font-bold text-slate-900">Tenant Find</p></div>
        </div>
      </div>
    </div>
  );
}

// 6. EPC PAGE
function EPCPage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Energy Performance Certificate (EPC)" subtitle="Why it matters and what the new rules mean for you." />
        <div className="bg-white p-8 md:p-12 rounded-3xl border border-slate-200">
           <p className="text-lg text-slate-700 mb-6">An EPC gives a property an energy efficiency rating from A (most efficient) to G (least efficient). It is valid for 10 years.</p>
           <div className="flex gap-2 mb-4">
              <div className="px-4 py-2 bg-green-500 text-white rounded font-bold">A</div>
              <div className="px-4 py-2 bg-green-500 text-white rounded font-bold">B</div>
              <div className="px-4 py-2 bg-lime-500 text-white rounded font-bold">C</div>
              <div className="px-4 py-2 bg-lime-500 text-white rounded font-bold">D</div>
              <div className="px-4 py-2 bg-yellow-500 text-white rounded font-bold">E</div>
              <div className="px-4 py-2 bg-orange-500 text-white rounded font-bold">F</div>
              <div className="px-4 py-2 bg-red-500 text-white rounded font-bold">G</div>
           </div>
        </div>
      </div>

      <div>
        <SectionHeader title="The Minimum 'E' Rating Rule" subtitle="Crucial information for new lets in England." />
        <div className="bg-red-50 border border-red-200 p-8 md:p-12 rounded-3xl">
           <div className="flex items-start gap-4">
              <AlertTriangle className="w-10 h-10 text-red-600 flex-shrink-0" />
              <div>
                <h3 className="text-xl font-bold text-red-900 mb-2">Effective 1 April 2020</h3>
                <p className="text-red-800">Privately rented properties in England must have a minimum rating of <strong>Band E</strong>. You cannot legally let a property rated F or G to new tenants without making recommended improvements.</p>
              </div>
           </div>
        </div>
      </div>

      <div>
        <SectionHeader title="How to Improve Your Rating" subtitle="Simple steps to boost efficiency." />
        <div className="grid md:grid-cols-2 gap-6">
           <div className="bg-white p-6 rounded-2xl border border-slate-200"><h4 className="font-bold mb-2">LED Lighting</h4><p className="text-sm text-slate-600">Replace old bulbs with energy-efficient LEDs.</p></div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200"><h4 className="font-bold mb-2">Insulation</h4><p className="text-sm text-slate-600">Improve loft and wall insulation.</p></div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200"><h4 className="font-bold mb-2">Boiler Upgrade</h4><p className="text-sm text-slate-600">Modern condensing boilers are far more efficient.</p></div>
           <div className="bg-white p-6 rounded-2xl border border-slate-200"><h4 className="font-bold mb-2">Double Glazing</h4><p className="text-sm text-slate-600">Reduce heat loss through windows.</p></div>
        </div>
      </div>
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
        <div className="grid md:grid-cols-3 gap-6">
          {reviews.map((r) => (
             <div key={r.name} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
                <p className="text-slate-600 italic mb-6 text-lg">"{r.note}"</p>
                <p className="font-bold text-slate-900 text-xl">{r.name}</p>
                <div className="text-amber-400 mt-2">{'★'.repeat(r.rating)}</div>
             </div>
          ))}
        </div>
      </div>
      <div>
        <SectionHeader title="Our Promise" subtitle="We treat your property as if it were our own." />
        <div className="bg-slate-900 text-white p-10 md:p-16 rounded-3xl text-center">
           <p className="text-2xl font-bold mb-6">Reduced Void Periods</p>
           <p className="text-slate-300 max-w-2xl mx-auto mb-8">Our marketing strategy ensures your property is rented quickly and to reliable tenants.</p>
           <Link to="/contact" className="inline-block bg-white text-slate-900 px-8 py-3 rounded-full font-bold">Partner With Us</Link>
        </div>
      </div>
    </div>
  );
}

// 8. BOOK VALUATION
function ValuationPage() {
  return (
    <div className="space-y-24">
      <div>
        <SectionHeader title="Book a Free Valuation" subtitle="Get an accurate rental valuation for your property." />
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="text-xl font-bold mb-4">Why Valuation Matters?</h3>
             <p className="text-slate-600 mb-4">Setting the right rent is crucial. Too high, and it sits empty; too low, and you lose income.</p>
             <p className="text-slate-600">Our agents use live market data from comparable properties to advise you.</p>
          </div>
          <div className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
             <h3 className="text-xl font-bold mb-4">The Process</h3>
             <ol className="list-decimal list-inside space-y-2 text-slate-600">
                <li>Book an appointment online.</li>
                <li>Our expert visits your property.</li>
                <li>We provide a detailed report.</li>
                <li>You decide to list or not.</li>
             </ol>
          </div>
        </div>
      </div>
      
      <div className="bg-slate-900 text-white p-10 md:p-16 rounded-3xl text-center">
        <Calendar className="w-12 h-12 mx-auto mb-6 text-slate-400" />
        <h3 className="text-3xl font-bold mb-4">Schedule Your Visit</h3>
        <p className="text-slate-300 mb-8 max-w-xl mx-auto">No obligation. No pressure. Just honest advice.</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/contact" className="bg-white text-slate-900 px-8 py-4 rounded-2xl font-bold hover:bg-slate-200">Book Online</Link>
          <Link to="/contact" className="border border-slate-600 text-white px-8 py-4 rounded-2xl font-bold hover:bg-slate-800">Call Us</Link>
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