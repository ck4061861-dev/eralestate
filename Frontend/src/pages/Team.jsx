import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  Mail,
  Phone,
  Share2,
  MapPin,
  Award,
  Users,
  Target,
  Handshake,
  ArrowRight,
  Loader2,
  RefreshCw,
  Briefcase
} from 'lucide-react'

export default function Team() {
  const API_URL = (import.meta.env.VITE_API_URL || import.meta.env.API_URL || '').replace(/\/+$/, '')
  const [team, setTeam] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [imageErrors, setImageErrors] = useState({})

  const handleImageError = (memberId) => {
    setImageErrors(prev => ({
      ...prev,
      [memberId]: true
    }))
  }

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const apiUrl = API_URL ? `${API_URL}/api/staff` : '/api/staff'
        const res = await fetch(apiUrl)
        if (!res.ok) throw new Error('Failed to fetch team members')
        const data = await res.json()
        
        const teamWithImages = (data.staff || []).map(member => ({
          ...member,
          imageUrl: member.image && member.image.startsWith('/uploads/')
            ? (API_URL ? `${API_URL}${member.image}` : member.image)
            : null
        }))
        
        setTeam(teamWithImages)
      } catch (err) {
        setError('Could not load team members')
        setTeam([])
      } finally {
        setLoading(false)
      }
    }

    fetchTeam()
  }, [API_URL])

  const getInitials = (name) => {
    if (!name) return '??'
    return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  }

  const getGradient = (index) => {
    const gradients = [
      'from-gray-900 to-gray-700',
      'from-stone-800 to-stone-600',
      'from-neutral-800 to-neutral-600',
      'from-zinc-800 to-zinc-600',
      'from-slate-800 to-slate-600',
      'from-gray-800 to-gray-500',
    ]
    return gradients[index % gradients.length]
  }

  return (
    <main className="min-h-screen bg-white text-gray-900 overflow-hidden" style={{ fontFamily: "'Poppins', sans-serif" }}>

      {/* ── HERO ── */}
      <section className="relative px-6 pt-24 pb-20 lg:pt-32 lg:pb-28">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gray-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-gray-100 rounded-full blur-[100px] opacity-40 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center max-w-4xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm mb-8">
              <Users className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 uppercase">The People</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
              Meet Our 
              <span className="font-light text-gray-400"> Team</span>
            </h1>
            
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Dedicated professionals committed to delivering excellence in real estate services across the United Kingdom.
            </p>
          </div>
        </div>
      </section>

      {/* ── TEAM GRID ── */}
      <section className="px-6 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto">
          
          {loading ? (
            <div className="space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="animate-pulse">
                    <div className="aspect-[3/4] rounded-[2rem] bg-gray-100 mb-6" />
                    <div className="h-6 w-3/4 rounded-xl bg-gray-100 mb-3" />
                    <div className="h-4 w-1/2 rounded-full bg-gray-100 mb-4" />
                    <div className="h-4 w-full rounded-full bg-gray-100 mb-2" />
                    <div className="h-4 w-5/6 rounded-full bg-gray-100" />
                  </div>
                ))}
              </div>
            </div>
          ) : error ? (
            <div className="rounded-[2rem] border border-red-100 bg-red-50/50 p-16 text-center">
              <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <RefreshCw className="w-8 h-8 text-red-500" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Could Not Load Team</h3>
              <p className="text-gray-500 mb-8">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg font-medium text-sm"
              >
                <RefreshCw className="w-4 h-4" />
                Try Again
              </button>
            </div>
          ) : team.length === 0 ? (
            <div className="rounded-[2rem] border border-gray-100 bg-gray-50/50 p-20 text-center">
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
                <Users className="w-10 h-10 text-gray-400" />
              </div>
              <h3 className="text-3xl font-bold text-gray-900 mb-4">No Team Members Yet</h3>
              <p className="text-gray-500 max-w-lg mx-auto leading-relaxed">
                Our team page is being updated. Check back soon to meet the professionals behind our success.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div
                  key={member._id}
                  className="group rounded-[2rem] bg-white border border-gray-100 overflow-hidden hover:shadow-2xl hover:shadow-gray-100 transition-all duration-500 hover:-translate-y-2"
                >
                  {/* Image Area */}
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-50">
                    {member.imageUrl && !imageErrors[member._id] ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                        decoding="async"
                        onError={() => handleImageError(member._id)}
                      />
                    ) : (
                      <div className={`w-full h-full bg-gradient-to-br ${getGradient(index)} flex items-center justify-center`}>
                        <span className="text-5xl font-bold text-white/90">{getInitials(member.name)}</span>
                      </div>
                    )}
                    
                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Social Icons on Hover */}
                    <div className="absolute bottom-6 left-6 right-6 flex gap-3 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                      {member.email && (
                        <a 
                          href={`mailto:${member.email}`}
                          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-colors"
                          title="Email"
                        >
                          <Mail className="w-4 h-4" />
                        </a>
                      )}
                      {member.phone && (
                        <a 
                          href={`tel:${member.phone}`}
                          className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-colors"
                          title="Phone"
                        >
                          <Phone className="w-4 h-4" />
                        </a>
                      )}
                      <a 
                        href="#"
                        className="w-10 h-10 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center text-gray-900 hover:bg-white transition-colors"
                        title="LinkedIn"
                      >
                        <Share2 className="w-4 h-4" />
                      </a>
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-8">
                    <h3 className="text-xl font-bold text-gray-900 mb-1">{member.name}</h3>
                    <p className="text-sm font-semibold text-gray-400 uppercase tracking-wider mb-4">{member.role}</p>
                    
                    {member.bio && (
                      <p className="text-gray-500 text-sm leading-relaxed font-light mb-5 line-clamp-3">
                        {member.bio}
                      </p>
                    )}

                    {/* Expertise Tags */}
                    {member.expertise && member.expertise.length > 0 && (
                      <div className="flex flex-wrap gap-2 mb-2">
                        {member.expertise.slice(0, 3).map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-3 py-1.5 text-[11px] font-semibold text-gray-600 bg-gray-100 rounded-full uppercase tracking-wider"
                          >
                            {skill}
                          </span>
                        ))}
                        {member.expertise.length > 3 && (
                          <span className="inline-block px-3 py-1.5 text-[11px] font-semibold text-gray-400 bg-gray-50 rounded-full">
                            +{member.expertise.length - 3}
                          </span>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ── CORE VALUES ── */}
      <section className="px-6 py-24 bg-gray-50/50 border-y border-gray-100">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-4 block">What We Stand For</span>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">
              Our Core <span className="font-light text-gray-400">Values</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { 
                icon: <Target className="w-7 h-7" strokeWidth={1.5} />, 
                title: 'Integrity', 
                desc: 'We believe in honest dealings and transparent communication with all our clients. Trust is the foundation of every relationship we build.' 
              },
              { 
                icon: <Award className="w-7 h-7" strokeWidth={1.5} />, 
                title: 'Excellence', 
                desc: 'Commitment to delivering the highest quality service in everything we do. We go above and beyond to exceed expectations.' 
              },
              { 
                icon: <Handshake className="w-7 h-7" strokeWidth={1.5} />, 
                title: 'Partnership', 
                desc: 'We work closely with our clients to achieve their real estate goals together. Your success is our success.' 
              },
            ].map((value, index) => (
              <div key={index} className="group p-10 bg-white rounded-[2rem] border border-gray-100 hover:border-gray-200 hover:shadow-xl transition-all duration-500 text-center">
                <div className="inline-flex p-4 bg-gray-50 rounded-2xl text-gray-900 mb-6 group-hover:bg-gray-900 group-hover:text-white transition-all duration-300">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed font-light">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── JOIN TEAM CTA ── */}
      <section className="px-6 py-24">
        <div className="max-w-5xl mx-auto rounded-[2.5rem] bg-gray-900 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-20" />
          
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
              <Briefcase className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">Careers</span>
            </div>
            
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Ready to Join <span className="font-light text-gray-400">Our Team?</span>
            </h2>
            
            <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
              We're always looking for talented individuals to join our growing company. 
              If you're passionate about real estate, we'd love to hear from you.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="mailto:careers@dummy.com"
                className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-gray-900 rounded-full hover:bg-gray-100 transition-all shadow-lg font-medium hover:-translate-y-0.5"
              >
                <span>View Open Positions</span>
                <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a
                href="mailto:careers@dummy.com"
                className="inline-flex items-center gap-3 px-10 py-5 border border-gray-700 text-white rounded-full hover:bg-gray-800 transition-all font-medium"
              >
                <Mail className="w-4 h-4" />
                <span>Send CV</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}