import React from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Building2, 
  ShieldCheck, 
  Clock, 
  ArrowRight,
  FileText,
  ChevronRight
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
    icon: <MapPin className="w-5 h-5 text-gray-900" />
  },
  {
    label: 'New Build Warranties',
    detail: 'We ensure all new homes come with recognised build warranties.',
    icon: <ShieldCheck className="w-5 h-5 text-gray-900" />
  },
  {
    label: 'Off-Market Access',
    detail: 'Early access to plots and developments not listed on major portals.',
    icon: <Clock className="w-5 h-5 text-gray-900" />
  },
];

export default function LandAndNew() {
  return (
    <main className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* --- Hero Header with Blur Text Effect --- */}
      <section className="relative bg-white border-b border-gray-100 overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-16 sm:py-24 text-center">
          <span className="inline-block px-3 py-1 mb-6 text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase border border-gray-200 rounded-full">
            Development & New Build
          </span>
          
          {/* Blur Text Effect Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight mb-6 leading-[0.95]">
            <span className="text-gray-900">Land &</span>{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300">
                New Homes
              </span>
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-transparent blur-[2px] opacity-60">
                New Homes
              </span>
            </span>
          </h1>
          
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
            Discover development opportunities and brand new homes across the UK. 
            We source land and builds with verified potential and quality.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-12 sm:py-16">        

        {/* --- Content Sections --- */}
        <article className="max-w-3xl mx-auto space-y-12 sm:space-y-16">
          {SECTIONS.map((section, index) => (
            <div key={index} className="space-y-4">
              <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
                {section.title}
              </h2>
              <div className="space-y-4 text-gray-600 text-base sm:text-lg leading-relaxed font-light">
                {section.lines.map((line, i) => (
                  <p key={i}>{line}</p>
                ))}
              </div>
            </div>
          ))}
        </article>

        {/* --- Bottom CTA --- */}
        <div className="mt-16 sm:mt-24 text-center bg-gray-900 rounded-2xl sm:rounded-3xl p-8 sm:p-12 md:p-16 text-white">
          <h2 className="text-2xl sm:text-3xl font-bold mb-4">Looking for something specific?</h2>
          <p className="text-gray-400 mb-8 max-w-2xl mx-auto text-base sm:text-lg font-light">
            If you have a specific requirement for land or a new build, tell us about it. 
            We can notify you the moment a matching opportunity arises.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/contact"
              className="bg-white text-gray-900 px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition-colors text-sm"
            >
              Contact an Agent
            </Link>
            <Link
              to="/buy"
              className="border border-gray-600 text-white px-6 sm:px-8 py-3 rounded-full font-bold hover:bg-gray-800 transition-colors text-sm"
            >
              View Residential Listings
            </Link>
          </div>
        </div>

      </div>
    </main>
  );
}