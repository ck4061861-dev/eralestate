import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="bg-linear-to-br from-slate-950 via-slate-900 to-slate-950 text-slate-100 px-3 sm:px-4 md:px-6 lg:px-8 py-8 sm:py-10 md:py-12">

      <div className="mx-auto grid max-w-7xl gap-6 sm:gap-8 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">

        {/* BRAND */}
        <div className="col-span-2 sm:col-span-1">
          <Link to="/" className="mb-2 sm:mb-3 inline-block text-lg sm:text-2xl font-bold text-white">
            Nest<span className="text-amber-300">Find</span>
          </Link>

          <p className="max-w-xs text-xs sm:text-sm text-slate-300">
            Your trusted estate agents helping you buy, sell, rent and manage properties with confidence.
          </p>
        </div>

        {/* PROPERTIES */}
        <div>
          <h4 className="heading">Properties</h4>
          <ul className="list text-xs sm:text-sm">
            <li><Link to="/buy/properties-for-sale">For Sale</Link></li>
            <li><Link to="/rent/properties-to-let">To Rent</Link></li>
            <li><Link to="/buy/land-and-new-homes">New Homes</Link></li>
          </ul>
        </div>

        {/* SERVICES */}
        <div>
          <h4 className="heading">Services</h4>
          <ul className="list text-xs sm:text-sm">
            <li><Link to="/sell/free-valuation">Sell Home</Link></li>
            <li><Link to="/rent/properties-to-let">Let Property</Link></li>
            <li><Link to="/sell/free-valuation">Valuation</Link></li>
          </ul>
        </div>

        {/* CONTACT */}
        <div>
          <h4 className="heading">Contact</h4>
          <ul className="list text-xs sm:text-sm">
            <li><a href="tel:02085704848" className="hover:text-white">📞 020 8570 4848</a></li>
            <li><a href="tel:02085704747" className="hover:text-white">📞 020 8570 4747</a></li>
            <li><a href="tel:02085714646" className="hover:text-white">📞 020 8571 4646</a></li>
            <li><a href="mailto:info@nestfind.co.uk" className="hover:text-white">✉️ info@nestfind.co.uk</a></li>
            <li>🕒 9AM - 6PM</li>
          </ul>
        </div>

      </div>

      {/* NEWSLETTER */}
      <div className="mx-auto mt-8 sm:mt-10 flex max-w-7xl flex-wrap items-center justify-between gap-3 sm:gap-4 border-t border-slate-700 pt-4 sm:pt-6 text-xs sm:text-sm text-slate-300">

        <div>
          <strong className="text-white text-xs sm:text-sm">Property Alerts</strong>
          <p className="text-xs">Be first to know.</p>
        </div>

        <form className="flex flex-wrap gap-2 sm:gap-3">
          <input
            type="email"
            placeholder="Email"
            className="input text-xs sm:text-sm"
          />
          <button className="btn text-xs sm:text-sm">Subscribe</button>
        </form>

      </div>

      {/* COPYRIGHT */}
      <div className="mt-6 sm:mt-8 border-t border-slate-700 pt-3 sm:pt-4 text-center text-xs text-slate-400">
        © 2026 NestFind
      </div>

      {/* STYLES */}
      <style>{`
        .heading {
          margin-bottom: 8px;
          font-size: 11px;
          font-weight: bold;
          text-transform: uppercase;
        }
        .list li {
          margin-bottom: 6px;
          font-size: 14px;
          color: #cbd5f5;
        }
        .list li:hover {
          color: white;
        }
        .icon {
          background: rgba(255,255,255,0.1);
          padding: 4px 8px;
          border-radius: 999px;
          font-size: 14px;
        }
        .input {
          background: #020617;
          border: 1px solid #334155;
          padding: 6px 10px;
          border-radius: 6px;
          font-size: 12px;
        }
        .btn {
          background: #06b6d4;
          color: black;
          padding: 6px 12px;
          border-radius: 6px;
          font-weight: 600;
          font-size: 12px;
          cursor: pointer;
        }
      `}</style>

    </footer>
  )
}

export default Footer