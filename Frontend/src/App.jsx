import { lazy, Suspense } from 'react'
import { useLocation, Navigate, Routes, Route } from 'react-router-dom'
import SocialSidebar from './components/SocialSidebar.jsx'
import ConsentBanner from './components/ConsentBanner.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'

const Home = lazy(() => import('./pages/LandingPage.jsx'))
const Properties = lazy(() => import('./pages/Properties.jsx'))
const Services = lazy(() => import('./pages/Services.jsx'))
const About = lazy(() => import('./pages/About.jsx'))
const Contact = lazy(() => import('./pages/Contact.jsx'))
const Blog = lazy(() => import('./pages/Blog.jsx'))
const BlogDetail = lazy(() => import('./pages/BlogDetail.jsx'))
const Team = lazy(() => import('./pages/Team.jsx'))
const PropertyDetail = lazy(() => import('./pages/PropertyDetail.jsx'))
const UserLogin = lazy(() => import('./Auth/UserLogin.jsx'))
const UserRegister = lazy(() => import('./Auth/UserRegister.jsx'))
const AdminLogin = lazy(() => import('./Auth/Adminlogin.jsx'))
const AdminRegister = lazy(() => import('./Auth/AdminRegister.jsx'))
const BuyPage = lazy(() => import('./pages/BuyPage.jsx'))
const RentPage = lazy(() => import('./pages/RentPage.jsx'))
const SellPage = lazy(() => import('./NavPages/SellPage.jsx'))
const Profile = lazy(() => import('./pages/Profile.jsx'))
const AdminPanel = lazy(() => import('./pages/AdminPanel.jsx'))
const Propertyforsell = lazy(() => import('./NavPages/Propertyforsell.jsx'))
const LandAndNew = lazy(() => import('./NavPages/LandAndNew.jsx'))
const BuyersGuide = lazy(() => import('./NavPages/BuyersGuide.jsx'))
const PforRent = lazy(() => import('./NavPages/PforRent.jsx'))
const BuyingProperty = lazy(() => import('./pages/guides/BuyingProperty.jsx'))
const SellersGuide = lazy(() => import('./pages/guides/SellersGuide.jsx'))
const LettingGuide = lazy(() => import('./pages/guides/LettingGuide.jsx'))
const TenantsGuide = lazy(() => import('./pages/guides/TenantsGuide.jsx'))
const FreeValuation = lazy(() => import('./pages/guides/FreeValuation.jsx'))
const PropertyAlerts = lazy(() => import('./pages/guides/PropertyAlerts.jsx'))

function App() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  const isAdminRoute = location.pathname.startsWith('/admin')

  return (
    <div className={`min-h-[calc(100vh-4rem)] ${isHome ? '' : 'pt-16'}`}>
      <Navbar />
      <Suspense
        fallback={
          <div className="flex min-h-[60vh] items-center justify-center bg-white">
            <div className="text-center">
              <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-[3px] border-slate-300 border-t-cyan-500" />
              <p className="text-sm text-slate-500">Loading page...</p>
            </div>
          </div>
        }
      >
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
      </Suspense>

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
