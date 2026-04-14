import { Link, useLocation } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import {
  BUY_MENU_ITEMS,
  RENT_MENU_ITEMS,
  SELL_MENU_ITEMS,
  LANDLORD_MENU_ITEMS,
} from "../data/menuItems";

function Navbar() {
  const location = useLocation();
  const isAdminPanel = location.pathname === "/admin";
  const [openMenu, setOpenMenu] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef(null);

  useEffect(() => {
    const onClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenu(null);
      }
    };

    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleMenu = (menu) => {
    setOpenMenu((prev) => (prev === menu ? null : menu));
  };

  const isActivePath = (path) =>
    location.pathname === path || location.pathname.startsWith(`${path}/`)

  const activeItemClass = (path) =>
    `inline-flex items-center gap-1 rounded-md px-3 py-2 ${
      isActivePath(path)
        ? 'bg-slate-700 text-white'
        : 'text-slate-200 hover:bg-slate-700'
    } cursor-pointer`

  const user = (() => {
    const savedUser = localStorage.getItem("user");
    if (!savedUser) return null;

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem("user");
      return null;
    }
  })();

  return (
    <nav
      ref={navRef}
      className="fixed inset-x-0 top-0 z-50 border-b border-slate-800 bg-slate-900/95 backdrop-blur-md"
    >
      <div className="flex h-16 mx-1.5 items-center justify-between px-2 sm:px-3 lg:px-4">
        <div className="flex gap-3">
          <Link
            to="/"
            className="text-xl font-extrabold tracking-tight text-white"
          >
            🏠 Dum<span className="text-amber-300">my</span>
          </Link>
        </div>

        {isAdminPanel ? (
          // Admin Panel - Only Profile Icon
          <div className="flex items-center">
            {user ? (
              <Link
                to="/admin"
                className="inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                title="Profile"
              >
                <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-blue-700">
                  {user.name
                    ? user.name[0].toUpperCase()
                    : (user.email || "U")[0].toUpperCase()}
                </span>
              </Link>
            ) : null}
          </div>
        ) : (
          // Regular Pages - Full Navigation + Mobile Toggle
          <>
            {/* HAMBURGER BUTTON FOR MOBILE */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-white p-2"
              title="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={mobileMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
              </svg>
            </button>

            {/* DESKTOP NAVIGATION */}
            <div className="hidden items-center justify-end gap-2 text-sm font-medium text-slate-200 lg:flex">
            <nav className="flex items-center gap-2">
              <div className="relative">
                <span
                  onClick={() => toggleMenu("buy")}
                  className={activeItemClass('/buy')}
                >
                  Buy
                  <svg
                    className="h-3 w-3 text-slate-200"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div
                  className={`${openMenu === "buy" ? "visible opacity-100" : "invisible opacity-0"} absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg transition duration-150`}
                >
                  {BUY_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/buy/${item.slug}`}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center">
                <span
                  onClick={() => toggleMenu("rent")}
                  className={activeItemClass('/rent')}
                >
                  Rent
                  <svg
                    className="h-3 w-3 text-slate-200"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div
                  className={`${openMenu === "rent" ? "visible opacity-100" : "invisible opacity-0"} absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg transition duration-150`}
                >
                  {RENT_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/rent/${item.slug}`}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center">
                <span
                  onClick={() => toggleMenu("let")}
                  className={activeItemClass('/rent')}
                >
                  Let
                  <svg
                    className="h-3 w-3 text-slate-200"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div
                  className={`${openMenu === "let" ? "visible opacity-100" : "invisible opacity-0"} absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg transition duration-150`}
                >
                  {LANDLORD_MENU_ITEMS.map((item) => (
                    <Link
                      key={item.slug}
                      to={`/rent/${item.slug}`}
                      className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                    >
                      <span>{item.title}</span>
                    </Link>
                  ))}
                </div>
              </div>

              <div className="relative flex items-center">
                <span
                  onClick={() => toggleMenu("about")}
                  className={activeItemClass('/about')}
                >
                  About
                  <svg
                    className="h-3 w-3 text-slate-200"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                <div
                  className={`${openMenu === "about" ? "visible opacity-100" : "invisible opacity-0"} absolute left-0 top-full z-50 mt-1 w-56 rounded-lg border border-slate-700 bg-slate-900 p-2 shadow-lg transition duration-150`}
                >
                  <Link
                    to="/about"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    <span>About Us</span>
                  </Link>
                  <Link
                    to="/blog"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    <span>Blog</span>
                  </Link>
                  <Link
                    to="/team"
                    className="flex items-center justify-between rounded-md px-3 py-2 text-sm text-slate-100 hover:bg-slate-800"
                  >
                    <span>Meet the Team</span>
                  </Link>
                </div>
              </div>
              <Link
                to="/contact"
                className="rounded-md px-3 py-2 hover:bg-slate-700"
              >
                Contact
              </Link>
            </nav>
            <div className="ml-1 flex items-center gap-1.5">
              {user ? (
                <Link
                  to={
                    user.role && user.role.toLowerCase() === "admin"
                      ? "/admin"
                      : "/profile"
                  }
                  className="inline-flex items-center justify-center rounded-full bg-blue-500 p-2 text-white hover:bg-blue-600"
                  title="Profile"
                >
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-base font-bold text-blue-700">
                    {user.name
                      ? user.name[0].toUpperCase()
                      : (user.email || "U")[0].toUpperCase()}
                  </span>
                </Link>
              ) : (
                <Link
                  to="/login"
                  className="rounded-lg bg-cyan-500 px-5 py-2 text-xs font-semibold text-white hover:bg-cyan-600"
                >
                  Login
                </Link>
              )}
            </div>
            </div>

            {/* MOBILE MENU */}
            {mobileMenuOpen && (
              <div className="lg:hidden absolute top-16 left-0 right-0 bg-slate-900 border-b border-slate-800 p-4 space-y-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="text-xs font-semibold uppercase text-slate-400 mb-3">Buy</div>
                {BUY_MENU_ITEMS.map((item) => (
                  <Link key={item.slug} to={`/buy/${item.slug}`} className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                    {item.title}
                  </Link>
                ))}
                
                <div className="text-xs font-semibold uppercase text-slate-400 mt-4 mb-2">Rent</div>
                {RENT_MENU_ITEMS.map((item) => (
                  <Link key={item.slug} to={`/rent/${item.slug}`} className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                    {item.title}
                  </Link>
                ))}
                
                <div className="text-xs font-semibold uppercase text-slate-400 mt-4 mb-2">Let</div>
                {LANDLORD_MENU_ITEMS.map((item) => (
                  <Link key={item.slug} to={`/rent/${item.slug}`} className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                    {item.title}
                  </Link>
                ))}
                
                <div className="text-xs font-semibold uppercase text-slate-400 mt-4 mb-2">About</div>
                <Link to="/about" className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                  About Us
                </Link>
                <Link to="/blog" className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                  Blog
                </Link>
                <Link to="/team" className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                  Meet the Team
                </Link>
                <Link to="/contact" className="block px-3 py-2 text-sm text-slate-200 hover:bg-slate-800 rounded">
                  Contact
                </Link>
              </div>
            )}
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
