import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ResponsiveContainer from "./ResponsiveContainer";

function HeroSection() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section className=" h-screen min-h-[480px] sm:min-h-[600px] md:min-h-[700px] lg:min-h-[86vh] overflow-hidden bg-slate-950 text-white">
      {/* BACKGROUND IMAGE */}
      <img
        src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1400&auto=format&fit=crop"
        alt="Beautiful modern home"
        loading="eager"
        fetchPriority="high"
        className="absolute inset-0 h-full w-full object-cover object-center"
        style={{
          transform: `translateY(${scrollY * 0.1}px)`,
        }}
      />

      {/* PREMIUM OVERLAY */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-slate-950/75 to-slate-900/40" />

      {/* LIGHT EFFECT */}
      <div className="absolute top-[-150px] left-[-100px] h-[500px] w-[500px] rounded-full bg-cyan-500/20 blur-[120px]" />

      {/* CONTENT */}
      <ResponsiveContainer centered={false}
        className={"relative z-10 flex h-full flex-col items-start justify-center text-left pl-0 sm:pl-0 md:pl-0"}
      >
        {/* BADGE */}
        <div
          className="
          mb-6
          inline-flex
          items-center
          gap-2
          rounded-full
          border border-white/10
          bg-white/5
          backdrop-blur-xl
          px-5 py-2
        "
        >
          <div className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />

          <span className="text-xs uppercase tracking-[0.2em] text-slate-300 font-medium">
            Premium Real Estate
          </span>
        </div>

        {/* HEADING */}
        <h1
          className="
            text-left
            text-3xl
            sm:text-4xl
            md:text-5xl
            lg:text-6xl
            xl:text-7xl
            font-black
            leading-[1]
            tracking-tight
            text-white
            max-w-xl
            sm:max-w-2xl
            md:max-w-4xl
          "
        >
          Find Your
          <span
            className="
            block
            mt-2
            bg-gradient-to-r
            from-white
            via-cyan-200
            to-cyan-400
            bg-clip-text
            text-transparent
          "
          >
            Dream Home
          </span>
          <span className="block mt-2 text-slate-200">Today</span>
        </h1>

        {/* DESCRIPTION */}
        <p
          className="
            text-left
            mt-5 sm:mt-6
            max-w-xs
            sm:max-w-lg
            md:max-w-2xl
            text-sm
            sm:text-base
            md:text-lg
            lg:text-xl
            leading-8
            text-slate-300
          "
        >
          Buying, selling, or renting — we guide you every step of the way with
          expert advice, trusted support, and a seamless property experience.
        </p>

        {/* BUTTONS */}
        <div
          className="
          mt-8
          flex
          flex-wrap
          items-center
          justify-start
          gap-4
        "
        >
          <Link
            to="/properties"
            className="
              rounded-xl
              bg-cyan-400
              px-5
              sm:px-6
              py-3
              text-sm
              sm:text-base
              font-semibold
              text-black
              shadow-[0_15px_40px_rgba(34,211,238,0.35)]
              transition-all
              duration-300
              hover:scale-105
              hover:bg-cyan-300
            "
          >
            Browse Properties
          </Link>

          <Link
            to="/contact"
            className="
              rounded-xl
              border
              border-white/10
              bg-white/5
              backdrop-blur-xl
              px-5
              sm:px-6
              py-3
              text-sm
              sm:text-base
              font-semibold
              text-white
              transition-all
              duration-300
              hover:bg-white/10
            "
          >
            Free Valuation
          </Link>
        </div>
      </ResponsiveContainer>
    </section>
  );
}

export default HeroSection;
