import React from 'react';
import { Link } from 'react-router-dom';
import PropertySection from '../components/PropertySection';
import { 
  Home, 
  MapPin, 
  Shield, 
  TrendingUp, 
  ArrowRight, 
  Search,
  Filter
} from 'lucide-react';

const Propertyforsell = () => {
  return (
    <main className="min-h-screen bg-white text-slate-950 font-sans selection:bg-black selection:text-white">

      {/* ── Premium Black & White Hero ── */}
      <section className="relative pt-24 pb-20 lg:pt-32 lg:pb-28 px-6 overflow-hidden bg-white">
        
        {/* Subtle Grayscale Background Elements */}
        <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-gray-100 blur-[100px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-gray-200 blur-[80px] opacity-40 pointer-events-none" />

        <div className="max-w-6xl mx-auto relative z-10">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-12">
            <div className="max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 mb-6 rounded-full border border-gray-200 bg-gray-50">
                <span className="w-2 h-2 rounded-full bg-black"></span>
                <span className="text-xs font-bold tracking-[0.2em] text-slate-800 uppercase">Residential Sales</span>
              </div>
              
              {/* Serif Headings for Premium Look */}
              <h1 className="text-5xl md:text-7xl font-serif font-medium text-slate-950 leading-[1.1] mb-6 tracking-tight">
                Properties For Sale
              </h1>
              
              <p className="text-lg md:text-xl text-slate-600 max-w-2xl leading-relaxed font-light">
                Discover a curated portfolio of exceptional properties across the UK. 
                From metropolitan penthouses to countryside estates, defined by quality and location.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto shrink-0">
              {/* Primary Button: Black */}
              <Link
                to="/contact"
                className="group flex items-center justify-center gap-2 px-8 py-4 bg-black text-white rounded-full hover:bg-slate-800 transition-all shadow-lg shadow-black/10"
              >
                Book Valuation <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              {/* Secondary Button: White with Black Border */}
              <Link
                to="/buy"
                className="flex items-center justify-center gap-2 px-8 py-4 bg-white border border-slate-900 text-slate-900 rounded-full hover:bg-gray-50 transition-all"
              >
                Buying Guide
              </Link>
            </div>
          </div>

          {/* ── Trust Indicators (Pure Grayscale) ── */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-200">
            {[
              { icon: <Home className="w-5 h-5" />, label: 'Available', value: '320+' },
              { icon: <MapPin className="w-5 h-5" />, label: 'Locations', value: 'UK Wide' },
              { icon: <TrendingUp className="w-5 h-5" />, label: 'Market Value', value: 'Verified' },
              { icon: <Shield className="w-5 h-5" />, label: 'Trust Score', value: 'A+' },
            ].map((item, index) => (
              <div key={index} className="group flex flex-col items-start p-4 rounded-2xl bg-white border border-gray-200 hover:border-black hover:shadow-md transition-all duration-300">
                <div className="p-2 bg-gray-50 rounded-lg text-black group-hover:bg-black group-hover:text-white mb-3 transition-colors">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold text-slate-950">{item.value}</h3>
                <p className="text-xs font-medium text-slate-500 uppercase tracking-wider mt-1">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings Section ── */}
      <section className="w-full py-16 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 pb-8 border-b border-gray-200">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-medium text-slate-950 mb-3">
                Current Availability
              </h2>
              <p className="text-slate-600 max-w-xl">
                Browse our exclusive listings. Each property is vetted for quality and legal compliance.
              </p>
            </div>
            
            {/* Filter Badge: Black and White */}
            <div className="flex items-center gap-2 px-4 py-2 bg-white rounded-full border border-gray-200 shadow-sm">
              <Filter className="w-4 h-4 text-black" />
              <span className="text-sm font-semibold text-slate-900 uppercase tracking-wide">
                Filtered: For Sale
              </span>
            </div>
          </div>

          {/* Property Grid Component */}
          <PropertySection 
            typeFilter="sale" 
            compact={true} 
            ctaText="View All Properties" 
          />
          
        </div>
      </section>

      {/* ── Bottom CTA (Inverted Theme) ── */}
      <section className="bg-slate-950 text-white py-24">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-medium mb-6">
            Can't find what you're looking for?
          </h2>
          <p className="text-slate-400 text-lg mb-8 max-w-2xl mx-auto">
            Register your search criteria with us. We'll notify you the moment a property matching your requirements hits the market.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-3 px-8 py-4 bg-white hover:bg-gray-200 text-slate-950 rounded-full font-bold transition-all shadow-lg"
          >
            Set Up Property Alerts
          </Link>
        </div>
      </section>

    </main>
  )
}

export default Propertyforsell