import React from 'react';
import { Link } from 'react-router-dom';
import PropertySection from '../components/PropertySection';
import { 
  Key, 
  MapPin, 
  Shield, 
  Users, 
  ArrowRight, 
  Filter,
  CheckCircle,
  Sparkles,
  ChevronRight,
  Home
} from 'lucide-react';

const PforRent = () => {
  return (
    <main 
      className="min-h-screen bg-white text-gray-900 font-sans selection:bg-gray-900 selection:text-white"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >

      {/* ── Clean White Hero ── */}
      <section className="relative pt-24 pb-20 lg:pt-36 lg:pb-28 px-6 overflow-hidden bg-white">
        
        {/* Ultra-subtle background decoration */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-50 rounded-full blur-[80px] opacity-40 pointer-events-none translate-y-1/2 -translate-x-1/4" />

        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Label */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 uppercase">Residential Lettings</span>
            </div>
          </div>

          {/* Centered Hero Content */}
          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-light text-gray-900 leading-[1.05] mb-8 tracking-tight">
              Properties
              <span className="font-medium">To Let</span>
            </h1>
            
            <p className="text-base md:text-lg text-gray-500 max-w-2xl mx-auto leading-relaxed font-light">
              Discover a curated portfolio of exceptional rental properties across the UK. 
              Secure tenancies, verified landlords, and flexible terms designed for modern living.
            </p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-20">
            <Link
              to="/properties"
              className="group flex items-center gap-3 px-10 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all duration-300 shadow-lg shadow-gray-900/10 hover:shadow-xl hover:shadow-gray-900/20 hover:-translate-y-0.5"
            >
              <span className="text-sm font-medium">Browse Rentals</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/contact"
              className="group flex items-center gap-3 px-10 py-4 bg-white border border-gray-300 text-gray-900 rounded-full hover:border-gray-900 hover:bg-gray-50 transition-all duration-300"
            >
              <span className="text-sm font-medium">Tenant Services</span>
              <ChevronRight className="w-4 h-4 text-gray-400 group-hover:text-gray-900 transition-colors" />
            </Link>
          </div>

          {/* ── Trust Indicators ── */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-5 max-w-5xl mx-auto">
            {[
              { icon: <Key className="w-5 h-5" strokeWidth={1.5} />, label: 'Available Now', value: '450+' },
              { icon: <Shield className="w-5 h-5" strokeWidth={1.5} />, label: 'Deposit Protected', value: 'Yes' },
              { icon: <Users className="w-5 h-5" strokeWidth={1.5} />, label: 'Verified Landlords', value: '100%' },
              { icon: <CheckCircle className="w-5 h-5" strokeWidth={1.5} />, label: 'Hassle Free', value: '24/7' },
            ].map((item, index) => (
              <div 
                key={index} 
                className="group flex flex-col items-center text-center p-6 rounded-2xl bg-white border border-gray-100 hover:border-gray-300 hover:shadow-lg hover:shadow-gray-100 transition-all duration-500"
              >
                <div className="p-3 bg-gray-50 rounded-xl text-gray-400 group-hover:text-gray-900 group-hover:bg-gray-100 mb-4 transition-all duration-300">
                  {item.icon}
                </div>
                <h3 className="text-2xl font-medium text-gray-900 mb-1">{item.value}</h3>
                <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em]">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Listings Section ── */}
      <section className="w-full py-20 lg:py-28 px-4 sm:px-6 lg:px-8 bg-gray-50/30">
        <div className="max-w-7xl mx-auto">
          
          {/* Section Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14 pb-8 border-b border-gray-200">
            <div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-3 block">Browse</span>
              <h2 className="text-3xl md:text-5xl font-light text-gray-900 mb-3 tracking-tight">
                Current <span className="font-medium">Availability</span>
              </h2>
              <p className="text-gray-500 max-w-xl font-light leading-relaxed">
                Browse our exclusive rental listings. All properties comply with UK rental standards.
              </p>
            </div>
            
            <div className="flex items-center gap-3 px-5 py-2.5 bg-white rounded-full border border-gray-200 shadow-sm">
              <Filter className="w-4 h-4 text-gray-500" strokeWidth={1.5} />
              <span className="text-xs font-semibold text-gray-700 uppercase tracking-wider">
                Filtered: To Let
              </span>
            </div>
          </div>

          {/* Property Grid Component */}
          <div className="bg-white rounded-3xl border border-gray-100 p-6 sm:p-8 lg:p-12 shadow-sm">
            <PropertySection 
              typeFilter="rent" 
              compact={true} 
              ctaText="View All Rentals" 
            />
          </div>
          
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="relative bg-gray-900 text-white py-28 overflow-hidden">
        {/* Decorative circles */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] border border-white/5 rounded-full" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] border border-white/[0.03] rounded-full" />
        </div>

        <div className="max-w-3xl mx-auto px-6 text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
            <Home className="w-3.5 h-3.5 text-gray-400" />
            <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">Personal Service</span>
          </div>

          <h2 className="text-4xl md:text-6xl font-light mb-8 tracking-tight leading-tight">
            Looking for something<br />
            <span className="font-medium">specific?</span>
          </h2>
          
          <p className="text-gray-400 text-base md:text-lg mb-12 max-w-xl mx-auto font-light leading-relaxed">
            Whether you need a short-term let or a long-term family home, register your requirements and let us find the perfect match for you.
          </p>
          
          <Link 
            to="/contact" 
            className="group inline-flex items-center gap-4 px-10 py-5 bg-white text-gray-900 rounded-full font-medium transition-all duration-300 hover:bg-gray-100 hover:shadow-2xl hover:shadow-white/10 hover:-translate-y-0.5"
          >
            <span className="text-sm">Register Interest</span>
            <div className="w-8 h-8 rounded-full bg-gray-900 flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </div>
          </Link>
        </div>
      </section>

    </main>
  )
}

export default PforRent