import React from 'react';
import { Link } from 'react-router-dom';
import PropertySection from '../components/PropertySection';
import { 
  Home, 
  MapPin, 
  Shield, 
  TrendingUp, 
  ArrowRight, 
  Search
} from 'lucide-react';

const Propertyforsell = () => {
  return (
    <main className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── Premium Hero Section ── */}
      <section className="relative pt-20 pb-16 lg:pt-28 lg:pb-24 px-4 sm:px-6 overflow-hidden">
        
        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Top Label */}
          <div className="mb-6">
            <span className="inline-block px-3 py-1 text-[10px] font-bold tracking-[0.3em] text-gray-500 uppercase border border-gray-200 rounded-full">
              Real Estate UK
            </span>
          </div>

          {/* Heading with Blur Effect */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[0.95] tracking-tight mb-6">
            <span className="text-gray-900">Properties</span>{' '}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-gray-300">
                For Sale
              </span>
              <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-gray-900 via-gray-600 to-transparent blur-[2px] opacity-60">
                For Sale
              </span>
            </span>
          </h1>

          {/* Paragraph */}
          <p className="text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl leading-relaxed font-light mb-8">
            Explore our curated collection of residential properties across the United Kingdom. From city apartments to countryside estates, find your next home with confidence.
          </p>

          {/* Buttons - Below Paragraph */}
          <div className="flex flex-col sm:flex-row gap-3 mb-12 sm:mb-16">
            <Link
              to="/contact"
              className="group inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg text-sm font-semibold"
            >
              Book a Valuation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/buy"
              className="inline-flex items-center justify-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white border border-gray-300 text-gray-900 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all text-sm font-semibold"
            >
              View Buying Guide
            </Link>
          </div>

          {/* ── Trust Indicators ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8 border-t border-gray-100">
            {[
              { icon: <Home className="w-5 h-5" strokeWidth={1.5} />, label: 'Available Properties', value: '320+' },
              { icon: <MapPin className="w-5 h-5" strokeWidth={1.5} />, label: 'Prime Locations', value: 'UK Wide' },
              { icon: <TrendingUp className="w-5 h-5" strokeWidth={1.5} />, label: 'Market Value', value: 'Verified' },
              { icon: <Shield className="w-5 h-5" strokeWidth={1.5} />, label: 'Client Trust', value: '100%' },
            ].map((item, index) => (
              <div key={index} className="flex flex-col items-start p-4 sm:p-5 bg-gray-50 rounded-2xl border border-gray-100 hover:border-gray-200 transition-all">
                <div className="p-2 bg-white rounded-lg shadow-sm text-gray-900 mb-3">
                  {item.icon}
                </div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900">{item.value}</h3>
                <p className="text-[10px] sm:text-xs font-semibold text-gray-400 uppercase tracking-wider mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings Section ── */}
      <section className="w-full py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 sm:gap-6 mb-8 sm:mb-12 pb-6 sm:pb-8 border-b border-gray-100">
            <div>
              <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
                Current Availability
              </h2>
              <p className="text-gray-500 max-w-xl text-sm sm:text-base font-light">
                Browse our exclusive listings. Each property is vetted for quality and legal compliance.
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-full border border-gray-100">
              <Search className="w-4 h-4 text-gray-600" />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wide">
                Filtered: For Sale
              </span>
            </div>
          </div>

          {/* Property Grid Component */}
          <PropertySection 
            typeFilter="sale" 
            compact={true} 
            ctaText="View All Sale Properties" 
          />
          
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bg-gray-900 text-white py-16 sm:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 sm:mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="text-gray-400 text-base sm:text-lg mb-6 sm:mb-8 max-w-2xl mx-auto font-light">
            Register your search criteria with us. We'll notify you the moment a property matching your requirements hits the market.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-6 sm:px-8 py-3.5 sm:py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all shadow-lg text-sm"
          >
            Set Up Property Alerts
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Propertyforsell