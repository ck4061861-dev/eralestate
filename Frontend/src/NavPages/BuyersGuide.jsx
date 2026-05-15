import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowLeft, 
  Home, 
  Search, 
  FileText, 
  Scale, 
  Key, 
  CheckCircle2, 
  Calculator, 
  ShieldCheck,
  Landmark,
  ArrowRight
} from 'lucide-react';

export default function BuyersGuide() {
  const navigate = useNavigate();

  // UK Specific Property Buying Steps
  const steps = [
    {
      number: '01',
      title: 'Agreement in Principle (AIP)',
      description: 'Before viewing, secure a "Decision in Principle" from a mortgage lender. This confirms how much they might lend you, making your offer stronger to UK sellers.',
      icon: <Calculator className="w-6 h-6 text-white" />
    },
    {
      number: '02',
      title: 'Property Search & Viewings',
      description: 'Register with local estate agents and use property portals. Determine if you need Freehold (owning the land) or Leasehold (leasing the land). Arrange physical viewings.',
      icon: <Search className="w-6 h-6 text-white" />
    },
    {
      number: '03',
      title: 'Make an Offer',
      description: 'Once you find "The One", make an offer "Subject to Contract". If accepted, the estate agent will issue a Memorandum of Sale to all parties.',
      icon: <FileText className="w-6 h-6 text-white" />
    },
    {
      number: '04',
      title: 'Conveyancing & Surveys',
      description: 'Instruct a solicitor for legal work (Conveyancing). Arrange a RICS survey (HomeBuyer or Building Survey) to check the property\'s condition and valuation.',
      icon: <Scale className="w-6 h-6 text-white" />
    },
    {
      number: '05',
      title: 'Mortgage Final Offer',
      description: 'Your lender will value the property. If satisfied, they will issue a formal Mortgage Offer. Your solicitor will also run Local Authority Searches.',
      icon: <Landmark className="w-6 h-6 text-white" />
    },
    {
      number: '06',
      title: 'Exchange & Completion',
      description: 'Exchange contracts (legally binding, deposit paid). Set a completion date. On completion, funds are transferred, and you collect the keys!',
      icon: <Key className="w-6 h-6 text-white" />
    }
  ];

  // UK Specific Tips
  const tips = [
    'Calculate your Stamp Duty Land Tax (SDLT) early. First-time buyers often pay 0% on the first £425,000.',
    'Check the remaining lease length if buying a flat (Leasehold). Mortgages are difficult if under 80 years.',
    'Budget for "disbursements"—legal searches and fees charged by your solicitor on top of their quote.',
    'Get a comprehensive survey, not just a basic valuation, to avoid expensive repair surprises later.',
    'Protect your purchase with Life Insurance and Buildings Insurance required by the lender.',
    'Avoid changing jobs or taking out new credit during the mortgage process.'
  ];

  return (
    <div className="min-h-screen bg-white font-sans text-slate-900">
      
      {/* --- Premium Header Section --- */}
      <div className="relative bg-slate-50 border-b border-slate-100">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
          className="absolute left-6 top-8 z-20 flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium transition-colors bg-white px-4 py-2 rounded-full shadow-sm border border-slate-200 hover:border-slate-300"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </button>

        <div className="max-w-5xl mx-auto px-6 py-24 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-bold uppercase tracking-wider mb-6">
            UK Property Guide
          </div>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            The Buyer's <span className="text-blue-600">Journey</span>
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Navigating the UK property market can be complex. Here is your comprehensive roadmap from initial budgeting to collecting the keys.
          </p>
        </div>
      </div>

      {/* --- Main Content Area --- */}
      <div className="max-w-7xl mx-auto px-6 py-20">
        
        {/* Steps Grid */}
        <div className="mb-24">
          <div className="flex items-center justify-between mb-12">
            <h2 className="text-3xl font-bold text-slate-900">6 Essential Steps</h2>
            <div className="h-1 flex-1 bg-slate-100 ml-8 rounded-full hidden md:block"></div>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group relative bg-white border border-slate-200 rounded-2xl p-8 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 overflow-hidden"
              >
                {/* Decorative background icon */}
                <div className="absolute -right-6 -bottom-6 text-slate-50 opacity-50 group-hover:scale-110 transition-transform duration-500">
                  <Home className="w-32 h-32" />
                </div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-6">
                    <div className="bg-slate-900 text-white p-4 rounded-xl shadow-lg">
                      {step.icon}
                    </div>
                    <span className="text-6xl font-bold text-slate-100/50 group-hover:text-blue-50/50 transition-colors">
                      {step.number}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{step.title}</h3>
                  <p className="text-slate-600 leading-relaxed text-sm">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Tips & Checklist Section --- */}
        <div className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white relative overflow-hidden mb-24">
          {/* Background Pattern */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600 rounded-full blur-[100px] opacity-20"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-600 rounded-full blur-[100px] opacity-20"></div>

          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold mb-6 flex items-center gap-3">
                <ShieldCheck className="w-8 h-8 text-blue-400" />
                Expert Advice
              </h2>
              <p className="text-slate-300 text-lg leading-relaxed mb-8">
                The UK market has unique quirks. Here are critical checks to ensure your investment is safe and your finances are protected.
              </p>
              <button
                onClick={() => navigate('/contact')}
                className="bg-white text-slate-900 px-6 py-3 rounded-lg font-bold hover:bg-blue-50 transition-colors flex items-center gap-2"
              >
                Speak to an Advisor <ArrowRight className="w-4 h-4" />
              </button>
            </div>

            <div className="space-y-6">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex gap-4 items-start group">
                  <div className="shrink-0 mt-1">
                    <div className="bg-blue-600 rounded-full p-1 group-hover:bg-blue-500 transition-colors">
                      <CheckCircle2 className="w-4 h-4 text-white" />
                    </div>
                  </div>
                  <p className="text-slate-300 leading-relaxed group-hover:text-white transition-colors">
                    {tip}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* --- CTA Section --- */}
        <div className="text-center bg-blue-50 rounded-3xl p-12 border border-blue-100">
          <h3 className="text-3xl font-bold text-slate-900 mb-4">Ready to find your dream home?</h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto text-lg">
            Whether you are a first-time buyer or looking to move up the ladder, our extensive UK listings have something for everyone.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => navigate('/buy')}
              className="bg-slate-900 hover:bg-slate-800 text-white font-bold px-8 py-4 rounded-xl transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
            >
              Browse Properties <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => navigate('/contact')}
              className="bg-white hover:bg-slate-50 text-slate-900 border border-slate-300 font-bold px-8 py-4 rounded-xl transition-all flex items-center justify-center gap-2"
            >
              Book a Valuation
            </button>
          </div>
        </div>

      </div>
    </div>
  );
}