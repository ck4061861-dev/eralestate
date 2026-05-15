import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  FileText,
  CheckCircle
} from 'lucide-react';

// Updated UK-specific content
const SECTIONS = [
  {
    title: 'A Curated Approach to UK Land & New Developments',
    lines: [
      'In the UK market, finding the right land plot or new build requires more than just a database search. It requires insight into local planning permissions, development potential, and build quality. At our agency, we prioritise quality over quantity, ensuring every land or new home opportunity meets our rigorous standards for investment value and lifestyle suitability.',
      'Currently, our portfolio for Land and New Homes is being carefully curated. While we do not have active listings at this exact moment, this reflects our dedication to sourcing only the most viable and desirable opportunities for our clients.',
    ],
  },
  {
    title: 'Your Property Journey is Personal',
    lines: [
      'Whether you are searching for a self-build plot in the countryside, an "Off-Plan" apartment in a developing city centre, or a completed new home with a 10-year warranty (NHBC/Zurich), we understand this is a significant life decision.',
      'We move away from the "one size fits all" approach. Our team takes the time to understand whether you are looking for immediate development potential, long-term capital growth, or a turnkey modern living space.',
    ],
  },
  {
    title: 'Proactive Sourcing & Off-Market Opportunities',
    lines: [
      'The best land and development opportunities in the UK often never reach the public portals. Our team is actively engaged with local authorities, landowners, and small developers to uncover opportunities before they are widely advertised.',
      'By registering your interest with us, you ensure you are among the first to know when a plot or new build matching your criteria becomes available. We handle the preliminary checks, including planning constraints and access rights.',
    ],
  },
  {
    title: 'Expert Guidance on Planning & Regulation',
    lines: [
      'Navigating the UK planning system can be daunting. From Green Belt restrictions to Section 106 agreements, the legalities of land purchase are complex. While we recommend instructing a specialist planning consultant or solicitor, our team provides initial guidance on what is realistically achievable with a specific piece of land.',
      'For new builds, we ensure that any properties we recommend adhere to the necessary building regulations and come with the appropriate warranties, giving you peace of mind.',
    ],
  },
  {
    title: 'Stay Connected',
    lines: [
      'While you wait for the perfect opportunity, we invite you to browse our existing residential listings to understand market trends and pricing in your desired area. Understanding the value of completed properties is crucial when assessing the potential value of land or new builds.',
      'Thank you for trusting us with your property search. We are dedicated to finding you an opportunity that truly delivers on your expectations.',
    ],
  },
];

const HIGHLIGHTS = [
  {
    label: 'Planning Potential',
    detail: 'We assess plots for outline and detailed planning consent viability.',
    icon: <MapPin className="w-5 h-5 text-slate-900" />
  },
  {
    label: 'New Build Warranties',
    detail: 'We ensure all new homes come with recognised build warranties.',
    icon: <ShieldCheck className="w-5 h-5 text-slate-900" />
  },
  {
    label: 'Off-Market Access',
    detail: 'Early access to plots and developments not listed on major portals.',
    icon: <Clock className="w-5 h-5 text-slate-900" />
  },
];

export default function LandAndNew() {
  return (
    <main className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      
      {/* --- Clean, Minimal Header --- */}
      <section className="bg-white border-b border-slate-100">
        <div className="max-w-4xl mx-auto px-6 py-20 md:py-28 text-center">
          <span className="inline-block px-3 py-1 mb-6 text-xs font-bold tracking-widest text-slate-500 uppercase border border-slate-200 rounded-full">
            Development & New Build
          </span>
          <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-slate-900 mb-6">
            Land & New Homes
          </h1>
          <p className="text-lg md:text-xl text-slate-600 max-w-2xl mx-auto leading-relaxed">
            Discover development opportunities and brand new homes across the UK. 
            We source land and builds with verified potential and quality.
          </p>
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-6 py-16">
        
        {/* --- Status & Highlights Grid --- */}
        <div className="grid gap-8 lg:grid-cols-3 mb-20">
          {/* Status Card (Wide on mobile, 2 cols on desktop) */}
          <div className="lg:col-span-2 bg-white p-8 md:p-10 rounded-3xl border border-slate-200 shadow-sm relative overflow-hidden group">
            <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity">
              <Building2 className="w-48 h-48" />
            </div>
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-amber-50 rounded-lg">
                  <FileText className="w-6 h-6 text-amber-600" />
                </div>
                <h2 className="text-xl font-bold text-slate-900">Portfolio Update</h2>
              </div>
              <p className="text-slate-600 text-lg mb-6 leading-relaxed">
                Our current selection of land and new build homes is being replenished. 
                We are actively sourcing high-quality plots and verified new developments to add to our portfolio shortly.
              </p>
              <Link 
                to="/contact"
                className="inline-flex items-center gap-2 text-slate-900 font-semibold hover:text-blue-600 transition-colors group"
              >
                Register your interest <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
          </div>

          {/* Highlights Column */}
          <div className="lg:col-span-1 flex flex-col gap-4">
            {HIGHLIGHTS.map((item, idx) => (
              <div key={idx} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex gap-4 items-start hover:border-blue-300 transition-colors">
                <div className="p-2 bg-slate-50 rounded-lg shrink-0">
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-slate-900 mb-1">{item.label}</h3>
                  <p className="text-sm text-slate-500 leading-snug">{item.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* --- Content Sections (Article Style) --- */}
        <article className="max-w-3xl mx-auto space-y-16">
          {SECTIONS.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-4 text-slate-600 text-lg leading-relaxed">
                {section.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </article>

        {/* --- Bottom CTA --- */}
        <div className="mt-24 text-center bg-slate-900 rounded-3xl p-10 md:p-16 text-white">
          <h2 className="text-3xl font-bold mb-4">Looking for something specific?</h2>
          <p className="text-slate-300 mb-8 max-w-2xl mx-auto">
            If you have a specific requirement for land or a new build, tell us about it. 
            We can notify you the moment a matching opportunity arises.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-slate-900 px-8 py-3 rounded-full font-bold hover:bg-slate-100 transition-colors"
            >
              Contact an Agent
            </Link>
            <Link
              to="/buy"
              className="border border-slate-600 text-white px-8 py-3 rounded-full font-bold hover:bg-slate-800 transition-colors"
            >
              View Residential Listings
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}