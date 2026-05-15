import { Routes, Route, useLocation, Navigate } from 'react-router-dom'
import Home from './pages/LandingPage.jsx'
import Properties from './pages/Properties.jsx'
import Services from './pages/Services.jsx'
import About from './pages/About.jsx'
import Contact from './pages/Contact.jsx'
import Blog from './pages/Blog.jsx'
import BlogDetail from './pages/BlogDetail.jsx'
import Team from './pages/Team.jsx'
import PropertyDetail from './pages/PropertyDetail.jsx'
import UserLogin from './Auth/UserLogin.jsx'
import UserRegister from './Auth/UserRegister.jsx'
import AdminLogin from './Auth/Adminlogin.jsx'
import AdminRegister from './Auth/AdminRegister.jsx'
import BuyPage from './pages/BuyPage.jsx'
import RentPage from './pages/RentPage.jsx'
import SellPage from './NavPages/SellPage.jsx'
import Profile from './pages/Profile.jsx'
import AdminPanel from './pages/AdminPanel.jsx'
import Propertyforsell from './NavPages/Propertyforsell.jsx'
import LandAndNew from './NavPages/LandAndNew.jsx'
import BuyersGuide from './NavPages/BuyersGuide.jsx'
import PforRent from './NavPages/PforRent.jsx'
import BuyingProperty from './pages/guides/BuyingProperty.jsx'
import SellersGuide from './pages/guides/SellersGuide.jsx'
import LettingGuide from './pages/guides/LettingGuide.jsx'
import TenantsGuide from './pages/guides/TenantsGuide.jsx'
import FreeValuation from './pages/guides/FreeValuation.jsx'
import PropertyAlerts from './pages/guides/PropertyAlerts.jsx'
import SocialSidebar from './components/SocialSidebar.jsx'
import ConsentBanner from './components/ConsentBanner.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className={`min-h-[calc(100vh-4rem)] ${isHome ? '' : 'pt-16'}`}>
      <Navbar />
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/rent" element={<Navigate to="/rent/properties-to-let" replace />} />
          <Route path="/rent/properties-to-let" element={<PforRent />} />
          <Route path="/rent/:slug" element={<RentPage />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/services" element={<Services />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:id" element={<BlogDetail />} />
          <Route path="/team" element={<Team />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/register" element={<UserRegister />} />
          <Route path="/owner" element={<AdminLogin />} />
          <Route path="/owner/register" element={<AdminRegister />} />
          <Route path="/buy" element={<Navigate to="/buy/properties-for-sale" replace />} />
          <Route path="/buy/properties-for-sale" element={<Propertyforsell />} />
          <Route path="/buy/land-and-new-homes" element={<LandAndNew />} />
          <Route path="/buy/buyers-guide" element={<BuyersGuide />} />
          <Route path="/buy/:slug" element={<BuyPage />} />
          <Route path="/sell" element={<Navigate to="/sell/free-valuation" replace />} />
          <Route path="/rent/tenants-guide" element={<TenantsGuide />} />
          <Route path="/guides/buying-property" element={<BuyingProperty />} />
          <Route path="/guides/selling-property" element={<SellersGuide />} />
          <Route path="/guides/letting-property" element={<LettingGuide />} />
          <Route path="/guides/tenants-guide" element={<TenantsGuide />} />
          <Route path="/guides/free-valuation" element={<FreeValuation />} />
          <Route path="/guides/property-alerts" element={<PropertyAlerts />} />
          <Route path="/sell/:slug" element={<SellPage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/admin" element={<AdminPanel />} />
        </Routes>
      </div>

      {!isAdminRoute && <SocialSidebar />}
      {!isAdminRoute && <ConsentBanner />}

      {/* Q&A Section - Only on Landing Page */}
      {isHome && (
        <section className="w-full bg-white py-10 px-4 sm:px-6">
          <div className="mx-auto flex w-full max-w-screen-2xl flex-col gap-6 rounded-4xl border border-slate-200 bg-white p-6 sm:p-8 shadow-[0_24px_80px_rgba(15,23,42,0.1)] text-slate-950">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.22em] text-cyan-600">Q & A</p>
                <h3 className="mt-2 text-2xl sm:text-3xl font-semibold text-slate-950">Top questions, clear answers.</h3>
              </div>
              <p className="max-w-2xl text-sm leading-6 text-slate-600">Quickly scan the most common property questions and get the straight answers you need to move forward.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300 hover:bg-white">
                <p className="text-sm uppercase tracking-[0.18em] text-cyan-600 mb-3">Quick answer</p>
                <p className="text-lg font-semibold text-slate-950 mb-2">How soon can I view a property?</p>
                <p className="text-sm leading-6 text-slate-600">Book a viewing within 24 hours and get dedicated agent support to compare the best options fast.</p>
              </div>

              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300 hover:bg-white">
                <p className="text-sm uppercase tracking-[0.18em] text-cyan-600 mb-3">Quick answer</p>
                <p className="text-lg font-semibold text-slate-950 mb-2">Can I sell my home through your platform?</p>
                <p className="text-sm leading-6 text-slate-600">Yes — hum valuation, listing, marketing aur negotiation tak poora support dete hain.</p>
              </div>

              <div className="group rounded-3xl border border-slate-200 bg-slate-50 p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-cyan-300 hover:bg-white">
                <p className="text-sm uppercase tracking-[0.18em] text-cyan-600 mb-3">Quick answer</p>
                <p className="text-lg font-semibold text-slate-950 mb-2">Do you offer rental management services?</p>
                <p className="text-sm leading-6 text-slate-600">Bilkul. Tenant support, contracts, payment tracking aur maintenance sab manage karte hain.</p>
              </div>
            </div>
          </div>
        </section>
      )}

      {!isAdminRoute && <Footer />}
    </div>
  )
}

export default App
