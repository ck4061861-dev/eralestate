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
    <main className="min-h-screen bg-[#FAFAF9] text-stone-900 font-sans selection:bg-amber-200">

      {/* ── Premium Hero Section ── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 px-6 overflow-hidden">
        
        {/* Subtle Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-stone-200 blur-[100px] opacity-50 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-amber-100 blur-[80px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-stone-200 bg-white/50 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-amber-600 animate-pulse"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-stone-600 uppercase">Real Estate UK</span>
              </div>
              
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-stone-900 leading-[1.1] mb-6 tracking-tight">
                Properties <span className="text-amber-700">For Sale</span>
              </h1>
              
              <p className="text-lg md:text-xl text-stone-600 max-w-2xl leading-relaxed font-light">
                Explore our curated collection of residential properties across the United Kingdom. From city apartments to countryside estates, find your next home with confidence.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-stone-900 text-white rounded-full hover:bg-stone-800 transition-all shadow-lg shadow-stone-900/10"
              >
                Book a Valuation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link
                to="/buy"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-stone-300 text-stone-900 rounded-full hover:border-stone-400 hover:bg-stone-50 transition-all"
              >
                View Buying Guide
              </Link>
            </div>
          </div>

          {/* ── Trust Indicators (Clean Grid) ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-stone-200">
            {[
              { icon: <Home className="w-5 h-5" />, label: 'Available Properties', value: '320+' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Prime Locations', value: 'UK Wide' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Market Value', value: 'Verified' },
              { icon: <Shield className="w-5 h-5" />, label: 'Client Trust', value: '100%' },
            ].map((item, index) => (
              <div key={index} className="group flex flex-col items-start p-4 rounded-2xl bg-white border border-stone-200 hover:border-amber-200 hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-stone-50 rounded-lg text-stone-600 group-hover:text-amber-700 mb-3 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-stone-900">{item.value}</h3>
                <p className="text-xs font-medium text-stone-500 uppercase tracking-wider mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings Section ── */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-stone-200">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-stone-900 mb-3">
                Current Availability
              </h2>
              <p className="text-stone-600 max-w-xl">
                Browse our exclusive listings. Each property is vetted for quality and legal compliance.
              </p>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-2 bg-amber-50 rounded-full border border-amber-100/50">
              <Search className="w-4 h-4 text-amber-700" />
              <span className="text-sm font-semibold text-amber-900 uppercase tracking-wide">
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
      <section className="bg-stone-900 text-white py-20">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="text-stone-400 text-lg mb-8 max-w-2xl mx-auto">
            Register your search criteria with us. We'll notify you the moment a property matching your requirements hits the market.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-amber-600 hover:bg-amber-700 text-white rounded-full font-semibold transition-all shadow-lg shadow-amber-900/20"
          >
            Set Up Property Alerts
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Propertyforsell