import React from "react";
import { Link } from "react-router-dom";
import PropertySection from "../components/PropertySection";
import {
  Home,
  MapPin,
  Shield,
  TrendingUp,
  ArrowRight,
  Sparkles,
} from "lucide-react";

const Propertyforsell = () => {
  return (
    <main className="min-h-screen bg-[#060816] text-white overflow-hidden">

      {/* PREMIUM BACKGROUND */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-cyan-500/20 blur-[140px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-blue-500/20 blur-[140px] rounded-full" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.08),transparent_40%)]" />
      </div>

      {/* HERO SECTION */}
      <section className="relative px-6 pt-28 pb-24 lg:pt-36 lg:pb-32">

        <div className="max-w-7xl mx-auto">

          {/* TOP BADGE */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-8">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-sm tracking-[0.2em] uppercase text-slate-300">
              Premium UK Properties
            </span>
          </div>

          {/* HERO CONTENT */}
          <div className="grid lg:grid-cols-2 gap-20 items-center">

            {/* LEFT */}
            <div>

              <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.95] tracking-tight mb-8">
                Luxury
                <span className="block bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
                  Properties
                </span>
                For Sale
              </h1>

              <p className="text-slate-400 text-lg md:text-xl leading-9 max-w-2xl mb-10">
                Discover handpicked premium properties across the United Kingdom.
                From modern city apartments to countryside estates —
                find your perfect investment with confidence.
              </p>

              {/* BUTTONS */}
              <div className="flex flex-wrap gap-5">

                <Link
                  to="/contact"
                  className="
                  group
                  inline-flex items-center gap-3
                  px-8 py-4
                  rounded-2xl
                  bg-gradient-to-r from-cyan-400 to-blue-500
                  hover:scale-105
                  transition-all duration-300
                  shadow-[0_0_40px_rgba(6,182,212,0.3)]
                  "
                >
                  Book Valuation
                  <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                </Link>

                <Link
                  to="/buy"
                  className="
                  px-8 py-4
                  rounded-2xl
                  border border-white/10
                  bg-white/5
                  backdrop-blur-xl
                  hover:bg-white/10
                  transition-all
                  "
                >
                  Buying Guide
                </Link>

              </div>

            </div>

            {/* RIGHT PREMIUM CARD */}
            <div className="relative">

              <div className="
              relative
              rounded-[32px]
              border border-white/10
              bg-white/5
              backdrop-blur-2xl
              p-10
              overflow-hidden
              shadow-2xl
              ">

                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/5" />

                <div className="relative z-10">

                  <div className="grid grid-cols-2 gap-5">

                    {[
                      {
                        icon: <Home className="w-6 h-6" />,
                        value: "320+",
                        label: "Properties",
                      },
                      {
                        icon: <MapPin className="w-6 h-6" />,
                        value: "UK Wide",
                        label: "Locations",
                      },
                      {
                        icon: <TrendingUp className="w-6 h-6" />,
                        value: "24%",
                        label: "Growth",
                      },
                      {
                        icon: <Shield className="w-6 h-6" />,
                        value: "100%",
                        label: "Trusted",
                      },
                    ].map((item, index) => (
                      <div
                        key={index}
                        className="
                        group
                        p-6
                        rounded-2xl
                        bg-white/5
                        border border-white/10
                        hover:border-cyan-400/30
                        hover:-translate-y-1
                        transition-all duration-300
                        "
                      >
                        <div className="text-cyan-400 mb-4">
                          {item.icon}
                        </div>

                        <h3 className="text-3xl font-bold mb-2">
                          {item.value}
                        </h3>

                        <p className="text-slate-400 text-sm uppercase tracking-wider">
                          {item.label}
                        </p>
                      </div>
                    ))}

                  </div>

                </div>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* PROPERTY SECTION */}
      <section className="px-6 py-24">

        <div className="max-w-7xl mx-auto">

          {/* SECTION HEADER */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16">

            <div>

              <p className="text-cyan-400 uppercase tracking-[0.3em] text-sm mb-4">
                Curated Collection
              </p>

              <h2 className="text-4xl md:text-6xl font-black leading-tight mb-5">
                Featured Listings
              </h2>

              <p className="text-slate-400 text-lg max-w-2xl">
                Browse exclusive high-end properties verified for quality,
                investment value, and premium living standards.
              </p>

            </div>

            <div className="
            px-5 py-3
            rounded-full
            bg-cyan-500/10
            border border-cyan-400/20
            text-cyan-300
            backdrop-blur-xl
            ">
              Premium Sale Collection
            </div>

          </div>

          {/* PROPERTY GRID */}
          <PropertySection
            typeFilter="sale"
            compact={true}
            ctaText="Explore All Properties"
          />

        </div>

      </section>

      {/* PREMIUM CTA */}
      <section className="px-6 pb-28">

        <div className="
        max-w-6xl mx-auto
        rounded-[40px]
        border border-white/10
        bg-gradient-to-br from-cyan-500/10 to-blue-500/10
        backdrop-blur-2xl
        overflow-hidden
        relative
        ">

          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(6,182,212,0.25),transparent_30%)]" />

          <div className="relative z-10 py-24 px-8 text-center">

            <h2 className="text-4xl md:text-6xl font-black mb-6 leading-tight">
              Looking For Something
              <span className="block text-cyan-400">
                Truly Exceptional?
              </span>
            </h2>

            <p className="text-slate-300 text-lg max-w-3xl mx-auto mb-10 leading-8">
              Register your property preferences and get notified instantly
              when exclusive listings matching your criteria become available.
            </p>

            <Link
              to="/contact"
              className="
              inline-flex items-center gap-3
              px-10 py-5
              rounded-2xl
              bg-gradient-to-r from-cyan-400 to-blue-500
              hover:scale-105
              transition-all duration-300
              shadow-[0_0_50px_rgba(6,182,212,0.4)]
              font-semibold
              "
            >
              Set Property Alerts
              <ArrowRight className="w-5 h-5" />
            </Link>

          </div>

        </div>

      </section>

    </main>
  );
};

export default Propertyforsell;