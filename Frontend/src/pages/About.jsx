import React from "react";
import { Link } from "react-router-dom";
import {
  Users,
  Award,
  Building2,
  MapPin,
  Phone,
  Mail,
  ArrowRight,
  Star,
  Shield,
  TrendingUp,
  HeartHandshake,
  Clock,
  CheckCircle2,
  Quote
} from "lucide-react";

// ── PARAMOUNT ESTATES REAL DATA ──
const COMPANY_INFO = {
  name: "Paramount Estates",
  tradingName: "Family Property Solutions Limited",
  experience: "35+",
  regNumber: "15487738",
  locations: ["Romford", "Dagenham", "Barking", "Leicester", "Hounslow"],
  address: "83A, Chippenham Road, Romford RM3 8HP",
  phone: "020 7183 6312",
  email: "info@paramountestates.co.uk"
};

const TEAM = [
  { name: "Nayyerah Razi (Naz)", role: "Managing Director", initials: "NR" },
  { name: "Bilal Iqbal", role: "Property Consultant", initials: "BI" },
  { name: "Andrea Stanculeanu", role: "Property Consultant", initials: "AS" },
  { name: "Sarang Ali", role: "Property Consultant", initials: "SA" },
  { name: "Faraz Ali", role: "Marketing Manager", initials: "FA" },
  { name: "Syed Ahsan Ali", role: "Business Development Consultant", initials: "SA" },
  { name: "Syed Bukhari", role: "Creative Designer", initials: "SB" },
  { name: "Razi Rathore", role: "Mortgage Advisor", initials: "RR" },
];

const SERVICES = [
  {
    icon: <Building2 className="w-6 h-6" strokeWidth={1.5} />,
    title: "Property Sales",
    description: "Strategic marketing and professional sales services to achieve the best price for your property across the UK."
  },
  {
    icon: <Key className="w-6 h-6" strokeWidth={1.5} />,
    title: "Lettings",
    description: "Full-service residential lettings with tenant vetting, rent collection, and ongoing property management."
  },
  {
    icon: <Shield className="w-6 h-6" strokeWidth={1.5} />,
    title: "Property Management",
    description: "Comprehensive management ensuring your investment is maintained to the highest standards."
  },
  {
    icon: <TrendingUp className="w-6 h-6" strokeWidth={1.5} />,
    title: "Investment Advisory",
    description: "Expert guidance on building and managing profitable property portfolios with guaranteed rent options."
  },
  {
    icon: <HeartHandshake className="w-6 h-6" strokeWidth={1.5} />,
    title: "Mortgage Solutions",
    description: "Access to thousands of mortgage products through Family Mortgage Solutions for the best financing options."
  },
  {
    icon: <Clock className="w-6 h-6" strokeWidth={1.5} />,
    title: "Inventory Services",
    description: "Detailed property inventories and inspections ensuring accuracy and thoroughness at every stage."
  }
];

const TESTIMONIALS = [
  {
    name: "Bradley Hine",
    role: "Inventory Specialist",
    text: "I have the pleasure of working with Paramount Estates for property inventories, and I must say they are a fantastic team to work with. Their professionalism and attention to detail are second to none. The communication is always clear, prompt, and courteous.",
    rating: 5
  },
  {
    name: "Laiba Imran",
    role: "Mortgage Client",
    text: "I recently worked with Paramount Estate to secure a mortgage, and the experience was fantastic. The advisor was knowledgeable, responsive, and made the entire process smooth and stress-free. They provided clear explanations and tailored options.",
    rating: 5
  },
  {
    name: "Tom",
    role: "Tenant",
    text: "My partner and I were in a tight spot to move in to a new property with our previous tenancy ending in less than a month. Naila and Naz made sure to keep us updated with all that was going on and were able to make the moving dates work for us.",
    rating: 5
  },
  {
    name: "Ayesha Saleem",
    role: "Homeowner",
    text: "Very professional and friendly service from start to finish, all my questions were promptly answered. Good communication throughout the process. Would recommend their services to anyone. A very happy customer.",
    rating: 5
  },
  {
    name: "Bhuma",
    role: "Property Investor",
    text: "I had an excellent experience with Naz and her team. The communication was clear and the entire process was smooth and stress free. The team was always available to answer all of my questions and address any concerns.",
    rating: 5
  },
  {
    name: "Elvis Irenuma",
    role: "Tenant",
    text: "Wonderful agency. Great team. Very supportive. Use them and your satisfaction is guaranteed.",
    rating: 5
  }
];

const STATS = [
  { value: "35+", label: "Years Experience", icon: <Award className="w-5 h-5" /> },
  { value: "320+", label: "Properties Managed", icon: <Building2 className="w-5 h-5" /> },
  { value: "100%", label: "Client Satisfaction", icon: <HeartHandshake className="w-5 h-5" /> },
  { value: "5", label: "UK Locations", icon: <MapPin className="w-5 h-5" /> },
];

// ── COMPONENT ──
export default function About() {
  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ── PREMIUM HERO ── */}
      <section className="relative pt-28 pb-20 lg:pt-36 lg:pb-28 px-6">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <Award className="w-4 h-4 text-gray-500" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 uppercase">Est. 1989</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
              Built on <span className="font-light text-gray-400">Trust,</span><br />
              Driven by <span className="font-light text-gray-400">Expertise.</span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
              Paramount Estates is a trading name of Family Property Solutions Limited. With over <span className="font-semibold text-gray-900">35 years of experience</span> in real estate, we are well-equipped to handle various aspects of the property market across the United Kingdom.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/contact" className="group inline-flex items-center gap-3 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all duration-300 shadow-lg shadow-gray-900/10 hover:shadow-xl hover:-translate-y-0.5">
                <span className="text-sm font-medium">Get in Touch</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
              <Link to="/properties" className="inline-flex items-center gap-3 px-8 py-4 border border-gray-200 text-gray-900 rounded-full hover:border-gray-400 hover:bg-gray-50 transition-all duration-300">
                <span className="text-sm font-medium">View Properties</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── STATS BAR ── */}
      <section className="px-6 py-16 border-y border-gray-100 bg-gray-50/50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {STATS.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="inline-flex p-3 bg-white rounded-2xl shadow-sm border border-gray-100 mb-4 text-gray-900 group-hover:shadow-md transition-all">
                  {stat.icon}
                </div>
                <h3 className="text-3xl md:text-4xl font-bold text-gray-900 mb-1">{stat.value}</h3>
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-[0.2em]">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT STORY ── */}
      <section className="px-6 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
            <div>
              <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4 block">Our Story</span>
              <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-6 tracking-tight">
                Your Property,<br />
                <span className="font-light text-gray-400">Our Priority.</span>
              </h2>
              <div className="space-y-5 text-gray-500 leading-relaxed font-light">
                <p>
                  At Paramount Estates, we align our full-service property solutions with your goals — whether you're buying, selling, renting, or investing. Our Lettings, sales, and property management services cover a broad spectrum of needs for clients across the UK.
                </p>
                <p>
                  With such extensive experience, our team has a deep understanding of the industry and provides valuable insights and assistance to our clients. From modern city apartments to countryside estates, we handle every property with dedication and attention to detail.
                </p>
                <p>
                  We are proud to serve communities in <span className="font-medium text-gray-900">Romford, Dagenham, Barking, Leicester, and Hounslow</span>, offering personalised service that larger agencies simply cannot match.
                </p>
              </div>
              
              <div className="mt-8 flex items-center gap-4 p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <div className="p-3 bg-white rounded-xl shadow-sm">
                  <Shield className="w-6 h-6 text-gray-900" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">Registered Company</p>
                  <p className="text-xs text-gray-400">Family Property Solutions Ltd — Reg. {COMPANY_INFO.regNumber}</p>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-[4/5] rounded-[2rem] bg-gradient-to-br from-gray-100 to-gray-50 border border-gray-100 overflow-hidden relative">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <Building2 className="w-24 h-24 text-gray-200 mx-auto mb-4" strokeWidth={0.5} />
                    <p className="text-gray-300 text-sm font-medium tracking-wider uppercase">Paramount Estates</p>
                  </div>
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-8 right-8 w-20 h-20 border border-gray-200 rounded-full" />
                <div className="absolute bottom-12 left-8 w-32 h-32 border border-gray-200 rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section className="px-6 py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4 block">What We Do</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Full-Service <span className="font-light text-gray-400">Solutions</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              From sales and lettings to mortgage advice and property management, we provide end-to-end services tailored to your needs.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((service, index) => (
              <div key={index} className="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl hover:shadow-gray-100 transition-all duration-500">
                <div className="p-3 bg-gray-50 rounded-2xl inline-flex mb-6 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300 text-gray-900">
                  {service.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900">{service.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{service.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TEAM ── */}
      <section className="px-6 py-24 lg:py-32">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4 block">The People</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Meet Our <span className="font-light text-gray-400">Team</span>
            </h2>
            <p className="text-gray-500 font-light leading-relaxed">
              Experienced professionals dedicated to delivering exceptional service and results for every client.
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {TEAM.map((member, index) => (
              <div key={index} className="group text-center p-6 rounded-3xl bg-white border border-gray-100 hover:border-gray-200 hover:shadow-lg transition-all duration-300">
                <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-gray-900 font-bold text-lg group-hover:from-gray-900 group-hover:to-black group-hover:text-white transition-all duration-300">
                  {member.initials}
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">{member.name}</h3>
                <p className="text-xs text-gray-400 uppercase tracking-wider">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="px-6 py-24 bg-gray-50/50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4 block">Testimonials</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              What Clients <span className="font-light text-gray-400">Say</span>
            </h2>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TESTIMONIALS.map((testimonial, index) => (
              <div key={index} className="group p-8 bg-white rounded-3xl border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 relative">
                <Quote className="w-8 h-8 text-gray-100 absolute top-6 right-6" />
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400" />
                  ))}
                </div>
                <p className="text-gray-600 text-sm leading-relaxed mb-6 font-light">"{testimonial.text}"</p>
                <div className="pt-4 border-t border-gray-100">
                  <p className="font-semibold text-gray-900 text-sm">{testimonial.name}</p>
                  <p className="text-xs text-gray-400">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT CTA ── */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gray-900 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-50" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-30" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Work <span className="font-light text-gray-400">Together?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              Whether you're looking to buy, sell, rent, or invest, our team is here to guide you every step of the way.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link to="/contact" className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all duration-300 font-medium hover:-translate-y-0.5 shadow-xl">
                <span>Contact Us</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-8 justify-center items-center text-gray-400 text-sm">
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>{COMPANY_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>{COMPANY_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>{COMPANY_INFO.email}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}

// Missing import fix
import { Key } from "lucide-react";