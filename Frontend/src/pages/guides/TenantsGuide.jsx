import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ShieldCheck,
  Lock,
  FileText,
  Home,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Scale,
  Clock,
} from 'lucide-react';

export default function TenantsGuide() {
  const navigate = useNavigate();



  return (
    <div className="min-h-screen bg-white text-slate-950 font-poppins antialiased selection:bg-slate-200 selection:text-slate-900">
      <section className="relative pt-24 pb-16 border-b border-slate-100">
        <div className="max-w-7xl mx-auto px-6">
          <button
            onClick={() => navigate('/')}
            className="group flex items-center gap-2 text-slate-500 hover:text-slate-900 font-medium mb-10 transition-colors w-fit"
          >
            <ArrowRight className="w-4 h-4 rotate-180 transition-transform group-hover:-translate-x-1" />
            Back to Home
          </button>

          <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
            <div className="max-w-3xl">
              <span className="inline-block py-1 px-3 rounded-full bg-slate-100 text-slate-600 text-xs font-bold uppercase tracking-widest mb-4">
                Tenant Resources UK
              </span>
              <h1 className="text-4xl md:text-6xl font-bold text-slate-900 mb-6 leading-tight tracking-tight">
                Tenant's <span className="text-slate-800">Guide</span>
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed font-light">
                A comprehensive guide to your legal rights, responsibilities, and protections as a tenant in the UK rental market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="mb-24">
          <div className="flex items-center gap-4 mb-10">
            <div className="h-px bg-slate-200 flex-1"></div>
            <h2 className="text-xl font-bold text-slate-900 uppercase tracking-wider">Your Legal Rights</h2>
            <div className="h-px bg-slate-200 flex-1"></div>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rights.map((right, idx) => (
              <div
                key={idx}
                className="group relative bg-white border border-slate-200 p-8 rounded-2xl hover:border-slate-400 hover:shadow-lg transition-all duration-300"
              >
                <div className={`absolute top-0 left-0 w-1 h-full rounded-l-2xl ${right.bg.replace('bg-', 'bg-').replace('50', '500')}`}></div>

                <div className={`w-12 h-12 mb-6 flex items-center justify-center rounded-xl ${right.bg} ${right.color}`}>
                  {right.icon}
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2">{right.title}</h3>
                <p className="text-slate-600 leading-relaxed text-sm">{right.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="md:col-span-1">
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Pro Tips</h2>
            <p className="text-slate-500 text-sm leading-relaxed">
              Follow these practical steps to ensure a smooth tenancy and protect your deposit.
            </p>
          </div>

          <div className="md:col-span-2 bg-slate-50 rounded-3xl p-8 border border-slate-100">
            <div className="grid gap-6">
              {tips.map((tip, idx) => (
                <div key={idx} className="flex gap-4 items-start">
                  <div className="shrink-0 mt-0.5">
                    <div className="flex items-center justify-center w-5 h-5 rounded-full bg-slate-900 text-white">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                    </div>
                  </div>
                  <p className="text-slate-700 font-medium text-sm leading-relaxed">{tip}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mb-24">
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Important Tenancy Types</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <Clock className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-900">Assured Shorthold Tenancy (AST)</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  The most common tenancy type in England and Wales. It offers tenants significant legal protections.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 mt-1">•</span>
                    Deposit must be protected (Section 213).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 mt-1">•</span>
                    Landlord must give 2 months notice for possession (Section 21).
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 mt-1">•</span>
                    Standard fixed term is usually 6 or 12 months.
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white border border-slate-200 rounded-3xl overflow-hidden hover:shadow-md transition-shadow">
              <div className="bg-slate-50 p-6 border-b border-slate-100 flex items-center gap-3">
                <div className="bg-white p-2 rounded-lg border border-slate-200">
                  <ShieldCheck className="w-5 h-5 text-slate-600" />
                </div>
                <h3 className="font-bold text-slate-900">Holding Deposits</h3>
              </div>
              <div className="p-6">
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  Money paid to "reserve" a property before the tenancy starts.
                </p>
                <ul className="space-y-2 text-sm text-slate-500">
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 mt-1">•</span>
                    Capped at a maximum of 1 week's rent.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 mt-1">•</span>
                    Must be returned within 7 days if the landlord withdraws.
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-slate-300 mt-1">•</span>
                    Can be deducted from the first month's rent.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-slate-900 text-white rounded-3xl p-10 md:p-16 text-center relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-5"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to find a home?</h2>
            <p className="text-slate-400 mb-8 max-w-2xl mx-auto text-lg">
              Browse our verified listings and find a property managed by professionals who respect your rights.
            </p>
            <button
              onClick={() => navigate('/rent')}
              className="bg-white hover:bg-slate-200 text-slate-950 px-10 py-4 rounded-full font-bold transition-all shadow-lg hover:shadow-xl flex items-center gap-2 mx-auto group"
            >
              Browse Rental Properties <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </div>
        </div>
      </div> */}
    </div>
  );
}