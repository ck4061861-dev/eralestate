import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback, useContext } from 'react'
import { NotificationContext } from '../contexts/NotificationContext'

function PropertyDetail() {
  const API_URL = import.meta.env.VITE_API_URL || import.meta.env.API_URL || 'http://localhost:3000'
  const { id } = useParams()
  const navigate = useNavigate()
  const { addNotification } = useContext(NotificationContext)
  const [property, setProperty] = useState(null)
  const [agent, setAgent] = useState(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imagesLoaded, setImagesLoaded] = useState(false)
  const [activeTab, setActiveTab] = useState('overview')
  const [showBookingModal, setShowBookingModal] = useState(false)
  const [showGalleryModal, setShowGalleryModal] = useState(false)
  const [galleryIndex, setGalleryIndex] = useState(0)
  const [bookingData, setBookingData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    message: ''
  })
  const [bookingStatus, setBookingStatus] = useState(null)

  // Get logged-in user
  const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user') || 'null') : null

  const defaultImage = 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
    <svg width="1200" height="600" xmlns="http://www.w3.org/2000/svg">
      <rect width="1200" height="600" fill="#CBD5E1" />
      <text x="50%" y="50%" text-anchor="middle" fill="#64748B" font-size="36" font-family="Arial, sans-serif" dy="0.35em">No Image Available</text>
    </svg>
  `)

  const getImageSrc = useCallback((img, fallbackId) => {
    if (fallbackId) return `${API_URL}/api/properties/images/${fallbackId}`
    if (!img) return defaultImage
    if (typeof img === 'string') {
      if (img.startsWith('data:') || img.startsWith('http://') || img.startsWith('https://') || img.startsWith('/')) return img
      return defaultImage
    }
    if (img.fileId) return `${API_URL}/api/properties/images/${img.fileId}`
    if (img.externalUrl) return img.externalUrl
    if (img.url) {
      if (img.url.startsWith('data:') || img.url.startsWith('http://') || img.url.startsWith('https://') || img.url.startsWith('/')) return img.url
    }
    const data = img.data || ''
    if (data.startsWith('data:') || data.startsWith('http://') || data.startsWith('https://')) return data
    return defaultImage
  }, [API_URL, defaultImage])

  const preloadImage = (src) => new Promise((resolve) => {
    if (!src) return resolve()
    const img = new Image()
    img.onload = () => resolve()
    img.onerror = () => resolve()
    img.src = src
  })

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        if (showBookingModal) setShowBookingModal(false)
        if (showGalleryModal) setShowGalleryModal(false)
      }
    }
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [showBookingModal, showGalleryModal])

  // Auto-fill booking form with user details when modal opens
  useEffect(() => {
    if (showBookingModal && user) {
      setBookingData(prev => ({
        ...prev,
        name: prev.name || user.name || '',
        email: prev.email || user.email || '',
        phone: prev.phone || user.phone || ''
      }))
    }
  }, [showBookingModal, user])

  // Gallery keyboard navigation
  useEffect(() => {
    const handleGalleryKeyboard = (e) => {
      if (!showGalleryModal) return
      if (e.key === 'ArrowLeft') {
        e.preventDefault()
        setGalleryIndex((i) => {
          const cover = getImageSrc(property?.coverImage, property?.coverImageId)
          const gallery = (property?.images || []).map((img) => getImageSrc(img))
          const images = [cover, ...(gallery || [])].filter((src) => src && src !== defaultImage)
          return (i - 1 + images.length) % images.length
        })
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        setGalleryIndex((i) => {
          const cover = getImageSrc(property?.coverImage, property?.coverImageId)
          const gallery = (property?.images || []).map((img) => getImageSrc(img))
          const images = [cover, ...(gallery || [])].filter((src) => src && src !== defaultImage)
          return (i + 1) % images.length
        })
      }
    }
    if (showGalleryModal) {
      document.addEventListener('keydown', handleGalleryKeyboard)
      return () => document.removeEventListener('keydown', handleGalleryKeyboard)
    }
  }, [showGalleryModal, property, getImageSrc, defaultImage])

  useEffect(() => {
    const prefetchImages = async (propertyData) => {
      const cover = getImageSrc(propertyData.coverImage, propertyData.coverImageId)
      const gallery = (propertyData.images || []).map((img) => getImageSrc(img))
      const imageUrls = [cover, ...gallery].filter((src) => src && src !== defaultImage)
      if (!imageUrls.length) { setImagesLoaded(true); return }
      await Promise.all(imageUrls.map(preloadImage))
      setImagesLoaded(true)
    }

    const fetchAgentDetails = async (agentName) => {
      if (!agentName || agentName.trim() === '') return
      try {
        const res = await fetch(`${API_URL}/api/agents`)
        if (!res.ok) return
        const data = await res.json()
        if (!data.agents || !Array.isArray(data.agents)) return
        let foundAgent = data.agents.find(a => a.name && a.name.toLowerCase().trim() === agentName.toLowerCase().trim())
        if (!foundAgent) foundAgent = data.agents.find(a => a.name && a.name.toLowerCase().includes(agentName.toLowerCase()))
        if (foundAgent) setAgent(foundAgent)
      } catch {
        // Silent fail on agent fetch
      }
    }

    const fetchProperty = async () => {
      try {
        const res = await fetch(`${API_URL}/api/properties/${id}`)
        if (!res.ok) throw new Error('Property not found')
        const data = await res.json()
        setProperty(data.property)
        const savedAgent = data.property.agent || null
        if (savedAgent && savedAgent.agentName) {
          setAgent({
            _id: savedAgent.agentId,
            name: savedAgent.agentName,
            phone: savedAgent.agentPhone,
            email: savedAgent.agentEmail,
            experience: savedAgent.agentExperience,
            status: savedAgent.agentStatus,
            specialization: savedAgent.agentSpecialization,
          })
        } else if (data.property.agentName) {
          await fetchAgentDetails(data.property.agentName)
        }
        await prefetchImages(data.property)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchProperty()
  }, [id, API_URL, defaultImage, getImageSrc])

  if (loading || !imagesLoaded) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-slate-50">
        <div className="text-center">
          <div className="w-12 h-12 border-[3px] border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-slate-400 text-sm tracking-wide">Loading property…</p>
        </div>
      </div>
    )
  }

  if (error || !property) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-slate-50 px-4">
        <h1 className="text-2xl font-bold text-slate-800 mb-4">{error || 'Property Not Found'}</h1>
        <button onClick={() => navigate('/')} className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-xl font-semibold transition">
          ← Back to Home
        </button>
      </div>
    )
  }

  const allImages = [
    getImageSrc(property.coverImage, property.coverImageId),
    ...(property.images || []).map((img) => getImageSrc(img))
  ].filter((src) => src && src !== defaultImage)

  const activeImage = allImages[activeIndex] || defaultImage
  const isRent = property.type === 'rent'

  const displayAgent = agent || (property.agent?.agentName ? {
    _id: property.agent.agentId,
    name: property.agent.agentName,
    phone: property.agent.agentPhone,
    email: property.agent.agentEmail,
    experience: property.agent.agentExperience,
    status: property.agent.agentStatus,
    specialization: property.agent.agentSpecialization,
  } : null)

  const prev = () => setActiveIndex((i) => (i - 1 + allImages.length) % allImages.length)
  const next = () => setActiveIndex((i) => (i + 1) % allImages.length)

  const handleBookingChange = (e) => {
    const { name, value } = e.target
    setBookingData(prev => ({ ...prev, [name]: value }))
  }

  const handleBookingSubmit = async (e) => {
    e.preventDefault()
    setBookingStatus('loading')
    
    try {
      const bookingPayload = {
        propertyTitle: property.title,
        customerName: bookingData.name,
        customerEmail: bookingData.email.toLowerCase().trim(),
        customerPhone: bookingData.phone,
        visitDate: bookingData.date,
        visitTime: bookingData.time,
        notes: bookingData.message,
        agent: displayAgent?.name || 'Unassigned',
        createdBy: 'USER'
      }
      
      const res = await fetch(`${API_URL}/api/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingPayload)
      })

      if (res.ok) {
        await res.json()
        setBookingStatus('success')
        addNotification(
          `✓ Booking confirmed for ${property.title}! Visit scheduled for ${bookingData.date} at ${bookingData.time}`,
          'success',
          5000
        )
        setBookingData({ name: '', email: '', phone: '', date: '', time: '', message: '' })
        setTimeout(() => {
          setShowBookingModal(false)
          setBookingStatus(null)
        }, 2000)
      } else {
        await res.json()
        setBookingStatus('error')
        addNotification(
          'Failed to create booking. Please try again or contact support.',
          'error',
          5000
        )
      }
    } catch {
      setBookingStatus('error')
      addNotification(
        'An error occurred while booking. Please try again.',
        'error',
        5000
      )
    }
  }

  return (
    <div className="min-h-screen" style={{ background: '#fafbfc' }}>

      {/* ══ PREMIUM HERO ══ */}
      <div className="relative w-full h-87.5 sm:h-112.5 md:h-137.5 overflow-hidden bg-slate-300">
        <img
          src={activeImage}
          alt={property.title}
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/20 to-transparent" />

        {/* Back button - Premium style */}
        <button
          onClick={() => navigate('/')}
          className="absolute top-8 left-8 z-20 inline-flex items-center gap-2 bg-white/90 backdrop-blur-md text-slate-900 text-sm font-semibold px-5 py-2.5 rounded-full shadow-xl hover:bg-white hover:shadow-2xl transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back
        </button>

        {/* Premium badges */}
        <div className="absolute top-8 right-8 z-20 flex gap-3">
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${
            property.available ? 'bg-emerald-500/90 text-white' : 'bg-red-500/90 text-white'
          }`}>
            {property.available ? '✓ Available' : '✕ Unavailable'}
          </span>
          <span className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md shadow-lg ${
            isRent ? 'bg-teal-500/90 text-white' : 'bg-sky-500/90 text-white'
          }`}>
            {isRent ? 'For Rent' : 'For Sale'}
          </span>
        </div>

        {/* Image navigation - Premium arrows */}
        {allImages.length > 1 && (
          <>
            <button onClick={prev} className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 text-slate-700 text-2xl font-light">
              ‹
            </button>
            <button onClick={next} className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 bg-white/80 hover:bg-white backdrop-blur-md rounded-full flex items-center justify-center shadow-xl hover:shadow-2xl transition-all duration-300 text-slate-700 text-2xl font-light">
              ›
            </button>

            {/* Counter badge */}
            <div className="absolute bottom-6 right-6 z-20 bg-black/50 backdrop-blur-md text-white text-xs font-semibold px-4 py-2 rounded-full">
              {activeIndex + 1} / {allImages.length}
            </div>

            {/* Premium dots */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2 bg-black/30 backdrop-blur-md px-4 py-2 rounded-full">
              {allImages.slice(0, 10).map((_, i) => (
                <button key={i} onClick={() => setActiveIndex(i)}
                  className={`rounded-full transition-all duration-300 ${i === activeIndex ? 'w-6 h-2.5 bg-white shadow-lg' : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'}`}
                />
              ))}
            </div>
          </>
        )}
      </div>

      {/* ══ THUMBNAIL GALLERY ══ */}
      {allImages.length > 1 && (
        <div className="bg-white border-b border-slate-100 sticky top-0 z-10 shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex gap-3 overflow-x-auto pb-1" style={{ scrollbarWidth: 'thin' }}>
              {allImages.map((src, i) => (
                <button key={i} onClick={() => setActiveIndex(i)}
                  className={`shrink-0 rounded-lg overflow-hidden transition-all duration-200 ${
                    i === activeIndex ? 'ring-2 ring-teal-500 scale-110 shadow-lg' : 'opacity-60 hover:opacity-90 hover:scale-105'
                  }`}
                >
                  <img src={src} alt={`photo-${i + 1}`} className="h-20 w-28 object-cover" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ MAIN CONTENT ══ */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">

        {/* ── HEADER SECTION ── */}
        <div className="space-y-3">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div className="flex-1">
              <h1 className="text-4xl sm:text-5xl font-bold text-slate-900 leading-tight tracking-tight">
                {property.title}
              </h1>
              {property.location && (
                <p className="flex items-center gap-2 text-slate-600 text-lg mt-3 font-medium">
                  <svg className="w-5 h-5 text-teal-600 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                  </svg>
                  {property.location}
                </p>
              )}
            </div>
            <div className="text-right">
              <p className="text-4xl sm:text-5xl font-bold text-teal-600 tracking-tight">
                £{Number(property.price).toLocaleString()}
              </p>
              <p className="text-slate-500 text-sm mt-1 font-medium">{isRent ? 'Monthly' : 'Asking Price'}</p>
            </div>
          </div>

          {/* Quick stats strip */}
          <div className="grid grid-cols-4 gap-3 pt-2">
            {[
              { icon: '🛏️', label: 'Bed', value: property.bedrooms },
              { icon: '🚿', label: 'Bath', value: property.bathrooms },
              { icon: '📐', label: 'Area', value: property.area ? `${property.area} sqft` : '—' },
              { icon: '📷', label: 'Photos', value: allImages.length, clickable: true },
            ].map(({ icon, label, value, clickable }) => (
              <div key={label} 
                className={`bg-linear-to-br from-slate-50 to-slate-100 rounded-lg p-3 border border-slate-200 text-center transition-all duration-300 ${
                  clickable ? 'hover:from-teal-100 hover:to-teal-50 hover:border-teal-300 cursor-pointer hover:shadow-lg hover:scale-105' : 'hover:from-slate-100 hover:to-slate-200'
                }`}
                onClick={clickable ? () => { setShowGalleryModal(true); setGalleryIndex(0); } : undefined}
              >
                <p className="text-2xl mb-1">{icon}</p>
                <p className="text-xs text-slate-600 font-semibold">{label}</p>
                <p className="text-base font-bold text-slate-900 mt-0.5">{value}</p>
              </div>
            ))}
          </div>
        </div>

        {/* ── TAB NAVIGATION ── */}
        <div className="border-b border-slate-200">
          <div className="flex gap-1 mb-px">
            {[
              { id: 'overview', label: 'Overview', icon: '📋' },
              { id: 'details', label: 'Details', icon: '📊' },
              { id: 'agent', label: 'Agent', icon: '👤' },
            ].map(tab => (
              <button key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-6 py-3 font-semibold text-sm flex items-center gap-2 border-b-2 transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'border-teal-600 text-teal-600 bg-teal-50'
                    : 'border-transparent text-slate-600 hover:text-slate-900'
                }`}
              >
                <span>{tab.icon}</span>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* ── TAB CONTENT ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT CONTENT */}
          <div className="lg:col-span-2">

            {/* OVERVIEW TAB */}
            {activeTab === 'overview' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-linear-to-b from-teal-600 to-teal-400 rounded-full"></span>
                    About This Property
                  </h2>
                  <p className="text-slate-700 text-base leading-relaxed whitespace-pre-line font-medium">
                    {property.description || 'No description provided.'}
                  </p>
                </div>
              </div>
            )}

            {/* DETAILS TAB */}
            {activeTab === 'details' && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-linear-to-b from-teal-600 to-teal-400 rounded-full"></span>
                    Property Details
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {[
                      { label: 'Type', value: property.type, icon: '🏠' },
                      { label: 'Status', value: property.available ? 'Available' : 'Unavailable', icon: '✅', highlight: property.available },
                      { label: 'Created By', value: property.createdBy || 'Admin', icon: '👨‍💼' },
                      { label: 'Listed On', value: property.createdAt ? new Date(property.createdAt).toLocaleDateString() : '—', icon: '📅' },
                      { label: 'Updated', value: property.updatedAt ? new Date(property.updatedAt).toLocaleDateString() : '—', icon: '🔄' },
                      { label: 'Total Area', value: property.area ? `${property.area} sq ft` : '—', icon: '📐' },
                    ].map(({ label, value, icon, highlight }) => (
                      <div key={label} className="bg-linear-to-br from-slate-50 to-slate-100 rounded-xl p-5 border border-slate-200 hover:from-slate-100 hover:to-slate-150 transition-all duration-300">
                        <div className="flex items-center gap-3 mb-3">
                          <span className="text-xl">{icon}</span>
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</p>
                        </div>
                        <p className={`font-bold text-lg ${
                          highlight === true ? 'text-emerald-600' : highlight === false ? 'text-red-600' : 'text-slate-900'
                        }`}>
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AMENITIES SECTION */}
                {Array.isArray(property.amenities) && property.amenities.length > 0 && (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                      <span className="w-1.5 h-8 bg-linear-to-b from-teal-600 to-teal-400 rounded-full"></span>
                      Amenities
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {property.amenities.map((amenity, i) => (
                        <div key={i} className="flex items-center gap-4 bg-linear-to-r from-emerald-50 to-slate-50 rounded-xl border border-emerald-200/50 px-5 py-4 hover:from-emerald-100 hover:to-slate-100 transition-all duration-300">
                          <div className="w-6 h-6 rounded-full bg-emerald-600 flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-semibold text-slate-900">{amenity}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* FEATURES TAB */}
            {activeTab === 'features' && (
              <div className="space-y-6 animate-fadeIn">
                {Array.isArray(property.features) && property.features.length > 0 ? (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-linear-to-b from-teal-600 to-teal-400 rounded-full"></span>
                      Key Features
                    </h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {property.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-4 bg-linear-to-r from-teal-50 to-slate-50 rounded-xl border border-teal-200/50 px-5 py-4 hover:from-teal-100 hover:to-slate-100 transition-all duration-300">
                          <div className="w-6 h-6 rounded-full bg-teal-600 flex items-center justify-center shrink-0 shadow-sm">
                            <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                            </svg>
                          </div>
                          <span className="font-semibold text-slate-900">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="bg-white rounded-2xl p-8 border border-slate-200 text-center">
                    <p className="text-slate-500">No features listed for this property.</p>
                  </div>
                )}
              </div>
            )}

            {/* AGENT TAB */}
            {activeTab === 'agent' && displayAgent?.name && (
              <div className="space-y-6 animate-fadeIn">
                <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <h2 className="text-2xl font-bold text-slate-900 mb-8 flex items-center gap-3">
                    <span className="w-1.5 h-8 bg-linear-to-b from-teal-600 to-teal-400 rounded-full"></span>
                    Meet Your Agent
                  </h2>

                  {/* Agent card */}
                  <div className="bg-linear-to-br from-teal-50 to-slate-50 rounded-2xl p-8 border border-teal-200/50">
                    <div className="flex items-center gap-6 mb-8">
                      <div className="w-20 h-20 rounded-full bg-linear-to-br from-teal-600 to-teal-700 flex items-center justify-center shrink-0 shadow-lg">
                        <svg className="w-10 h-10 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                        </svg>
                      </div>
                      <div>
                        <p className="text-2xl font-bold text-slate-900">{displayAgent.name}</p>
                        {displayAgent.specialization && (
                          <p className="text-teal-600 font-semibold mt-1">{displayAgent.specialization}</p>
                        )}
                        {displayAgent.status && (
                          <span className={`inline-flex items-center gap-2 text-xs font-bold mt-2 ${displayAgent.status === 'Active' ? 'text-emerald-600' : 'text-slate-500'}`}>
                            <span className={`w-2.5 h-2.5 rounded-full ${displayAgent.status === 'Active' ? 'bg-emerald-500' : 'bg-slate-300'}`}></span>
                            {displayAgent.status}
                          </span>
                        )}
                      </div>
                    </div>

                    {/* Contact details grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                      {displayAgent.email && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Email</p>
                          <p className="font-semibold text-slate-900 break-all text-sm">{displayAgent.email}</p>
                        </div>
                      )}
                      {displayAgent.phone && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Phone</p>
                          <p className="font-semibold text-slate-900 text-sm">{displayAgent.phone}</p>
                        </div>
                      )}
                      {displayAgent.experience > 0 && (
                        <div className="bg-white rounded-xl p-4 border border-slate-200">
                          <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">Experience</p>
                          <p className="font-semibold text-slate-900 text-sm">{displayAgent.experience} years</p>
                        </div>
                      )}
                    </div>

                    {/* Action buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {displayAgent.phone && (
                        <a href={`tel:${displayAgent.phone}`}
                          className="bg-teal-600 hover:bg-teal-700 active:bg-teal-800 text-white font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
                        >
                          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                          </svg>
                          Call Now
                        </a>
                      )}
                      {displayAgent.email && (
                        <a href={`mailto:${displayAgent.email}`}
                          className="bg-white border-2 border-teal-600 text-teal-600 hover:bg-teal-50 active:bg-teal-100 font-bold py-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-2"
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                          </svg>
                          Email Agent
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'agent' && !displayAgent?.name && (
              <div className="bg-white rounded-2xl p-12 border border-slate-200 text-center">
                <div className="w-16 h-16 rounded-full bg-slate-100 flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-slate-300" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-slate-600 text-lg font-semibold">No Agent Assigned</p>
                <p className="text-slate-400 text-sm mt-2">Contact support for more information.</p>
              </div>
            )}
          </div>

          {/* RIGHT SIDEBAR */}
          <div className="lg:sticky lg:top-8 h-fit">
            <div className="space-y-5">

              {/* Premium CTA Card */}
              <div className="bg-linear-to-br from-teal-600 to-teal-700 rounded-2xl p-8 text-white shadow-xl hover:shadow-2xl transition-shadow duration-300 border border-teal-500/30">
                <h3 className="text-xl font-bold mb-4">Schedule Your Viewing</h3>
                <p className="text-teal-100 text-sm mb-6">Don't miss this opportunity. Book your property tour today.</p>
                <button onClick={() => setShowBookingModal(true)} className="w-full bg-white text-teal-600 font-bold py-3 rounded-xl hover:bg-teal-50 active:bg-teal-100 transition-all duration-300 shadow-lg">
                  Book Viewing Now
                </button>
              </div>

              {/* Quick Contact Card */}
              {displayAgent?.name && (
                <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-14 h-14 rounded-full bg-linear-to-br from-teal-500 to-teal-600 flex items-center justify-center">
                      <svg className="w-7 h-7 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-slate-900 text-sm">{displayAgent.name}</p>
                      <p className="text-xs text-teal-600 font-semibold">{displayAgent.specialization || 'Agent'}</p>
                    </div>
                  </div>
                  <div className="space-y-2">
                    {displayAgent.phone && (
                      <a href={`tel:${displayAgent.phone}`} className="flex items-center gap-2 p-3 bg-teal-50 rounded-lg hover:bg-teal-100 transition-colors duration-300 text-sm font-semibold text-teal-700">
                        <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                        </svg>
                        {displayAgent.phone}
                      </a>
                    )}
                    {displayAgent.email && (
                      <a href={`mailto:${displayAgent.email}`} className="flex items-center gap-2 p-3 bg-slate-100 rounded-lg hover:bg-slate-200 transition-colors duration-300 text-sm font-semibold text-slate-700">
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                        Email
                      </a>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* ══ BOOKING MODAL ══ */}
      {showBookingModal && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4" 
          style={{ background: 'rgba(0,0,0,0.5)' }}
          onClick={(e) => e.target === e.currentTarget && setShowBookingModal(false)}
        >
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto modal-no-scrollbar"
            onClick={(e) => e.stopPropagation()}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {/* Modal Header */}
            <div className="sticky top-0 bg-linear-to-r from-teal-600 to-teal-700 px-8 py-6 flex items-center justify-between text-white">
              <h2 className="text-2xl font-bold">Book Property Viewing</h2>
              <button onClick={() => setShowBookingModal(false)} className="text-white hover:bg-white/20 w-8 h-8 rounded-full flex items-center justify-center transition-colors">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-8">
              {bookingStatus === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
                    <svg className="w-8 h-8 text-emerald-600" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Booking Confirmed!</h3>
                  <p className="text-slate-600">Your viewing has been scheduled. You'll receive a confirmation email shortly.</p>
                </div>
              ) : (
                <>
                  {!user && (
                    <div className="mb-4 p-3 bg-amber-50 border border-amber-200 rounded-lg">
                      <p className="text-sm text-amber-800"><strong>ℹ️ Tip:</strong> Log in to auto-fill your details and see your booking in your profile.</p>
                    </div>
                  )}
                  {user && (
                    <div className="mb-4 p-3 bg-emerald-50 border border-emerald-200 rounded-lg">
                      <p className="text-sm text-emerald-800"><strong>✓</strong> Your details are pre-filled. This booking will appear in your profile.</p>
                    </div>
                  )}
                <form onSubmit={handleBookingSubmit} className="space-y-5">
                  {/* Name */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Full Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={bookingData.name}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={bookingData.email}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      placeholder="john@example.com"
                    />
                  </div>

                  {/* Phone */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Phone Number *</label>
                    <input
                      type="tel"
                      name="phone"
                      value={bookingData.phone}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                      placeholder="+44 7700 900000"
                    />
                  </div>

                  {/* Date */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Date *</label>
                    <input
                      type="date"
                      name="date"
                      value={bookingData.date}
                      onChange={handleBookingChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    />
                  </div>

                  {/* Time */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Preferred Time *</label>
                    <select
                      name="time"
                      value={bookingData.time}
                      onChange={handleBookingChange}
                      required
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition"
                    >
                      <option value="">Select a time slot</option>
                      <option value="10:00">10:00 AM</option>
                      <option value="11:00">11:00 AM</option>
                      <option value="12:00">12:00 PM</option>
                      <option value="14:00">2:00 PM</option>
                      <option value="15:00">3:00 PM</option>
                      <option value="16:00">4:00 PM</option>
                      <option value="17:00">5:00 PM</option>
                    </select>
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-sm font-semibold text-slate-700 mb-2">Additional Message</label>
                    <textarea
                      name="message"
                      value={bookingData.message}
                      onChange={handleBookingChange}
                      className="w-full px-4 py-2.5 border border-slate-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition resize-none"
                      rows="3"
                      placeholder="Any special requirements or questions?"
                    />
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-3 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowBookingModal(false)}
                      className="flex-1 px-4 py-2.5 border border-slate-300 text-slate-700 font-semibold rounded-lg hover:bg-slate-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={bookingStatus === 'loading'}
                      className={`flex-1 px-4 py-2.5 font-semibold rounded-lg text-white transition-all ${
                        bookingStatus === 'loading'
                          ? 'bg-slate-400 cursor-not-allowed'
                          : 'bg-teal-600 hover:bg-teal-700 active:bg-teal-800'
                      }`}
                    >
                      {bookingStatus === 'loading' ? 'Booking...' : 'Confirm Booking'}
                    </button>
                  </div>

                  {bookingStatus === 'error' && (
                    <div className="mt-4 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-sm">
                      <p className="font-semibold">Booking failed. Please try again.</p>
                    </div>
                  )}
                </form>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ══ FULL-PAGE GALLERY MODAL ══ */}
      {showGalleryModal && (
        <div 
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          onClick={() => setShowGalleryModal(false)}
        >
          {/* Close button */}
          <button
            onClick={() => setShowGalleryModal(false)}
            className="absolute top-8 right-8 z-10 w-12 h-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all"
          >
            <svg className="w-6 h-6 text-slate-900" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Main image */}
          <div className="relative w-full h-full flex items-center justify-center" onClick={(e) => e.stopPropagation()}>
            <img
              src={allImages[galleryIndex]}
              alt={`Gallery ${galleryIndex + 1}`}
              className="max-w-full max-h-full object-contain"
            />

            {/* Navigation arrows */}
            {allImages.length > 1 && (
              <>
                <button
                  onClick={() => setGalleryIndex((i) => (i - 1 + allImages.length) % allImages.length)}
                  className="absolute left-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all text-slate-900 text-2xl font-light"
                >
                  ‹
                </button>
                <button
                  onClick={() => setGalleryIndex((i) => (i + 1) % allImages.length)}
                  className="absolute right-8 top-1/2 -translate-y-1/2 w-14 h-14 bg-white/80 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all text-slate-900 text-2xl font-light"
                >
                  ›
                </button>
              </>
            )}

            {/* Counter and dots */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4">
              {/* Dots */}
              <div className="flex gap-2 bg-black/40 backdrop-blur-md px-4 py-2 rounded-full">
                {allImages.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setGalleryIndex(i)}
                    className={`rounded-full transition-all duration-300 ${
                      i === galleryIndex
                        ? 'w-6 h-2.5 bg-white shadow-lg'
                        : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/70'
                    }`}
                  />
                ))}
              </div>
              {/* Counter */}
              <div className="bg-black/40 backdrop-blur-md text-white text-sm font-semibold px-4 py-2 rounded-full">
                {galleryIndex + 1} / {allImages.length}
              </div>
            </div>
          </div>
        </div>
      )}

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
        /* Hide scrollbar for modal */
        .modal-no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  )
}

export default PropertyDetail