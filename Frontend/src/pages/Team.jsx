import { useEffect, useState } from 'react'

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
        
        // Map team members to include full image URLs
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

  return (
    <main className="bg-slate-50 min-h-screen">
      {/* Header Section */}
      <section className="relative w-full bg-slate-950 text-white pt-32 pb-24 overflow-hidden border-b border-slate-800">
        <div className="absolute inset-0 bg-linear-to-b from-slate-950 via-slate-900 to-slate-950" />
        <div className="absolute top-1/2 right-10 h-72 w-72 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />

        <div className="relative mx-auto px-6 sm:px-8 lg:px-10 z-10 w-full max-w-6xl">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-400">Our Team</p>
          <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl lg:text-6xl tracking-tight">Meet the Team</h1>
          <p className="mt-6 text-lg text-slate-300 max-w-2xl">
            Dedicated professionals committed to delivering excellence in real estate services.
          </p>
        </div>
      </section>

      {/* Team Grid */}
      <section className="py-20 px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-6xl">
          {loading ? (
            <div className="text-center py-16">
              <div className="text-slate-500 text-lg">Loading team members...</div>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="text-red-500 text-lg">{error}</div>
            </div>
          ) : team.length === 0 ? (
            <div className="text-center py-16">
              <div className="text-slate-500 text-lg">No team members found. Come back soon!</div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member) => (
                <div
                  key={member._id}
                  className="group rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Member Avatar */}
                  <div className="h-80 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 flex items-center justify-center overflow-hidden">
                    {member.imageUrl && !imageErrors[member._id] ? (
                      <img 
                        src={member.imageUrl} 
                        alt={member.name}
                        className="w-full h-full object-cover"
                        onError={() => handleImageError(member._id)}
                      />
                    ) : (
                      <div className="text-7xl flex items-center justify-center w-full h-full">
                        {member.image || '👤'}
                      </div>
                    )}
                  </div>

                  {/* Member Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-slate-900">{member.name}</h3>
                    <p className="text-sm font-semibold text-cyan-600 mb-3">{member.role}</p>
                    <p className="text-sm text-slate-600 mb-4">{member.bio}</p>

                    {/* Expertise Tags */}
                    <div className="flex flex-wrap gap-2">
                      {member.expertise && member.expertise.length > 0 ? (
                        member.expertise.map((skill, idx) => (
                          <span
                            key={idx}
                            className="inline-block px-2 py-1 text-xs font-medium text-cyan-700 bg-cyan-100 rounded-full"
                          >
                            {skill}
                          </span>
                        ))
                      ) : (
                        <span className="text-xs text-slate-400">No expertise listed</span>
                      )}
                    </div>

                    {/* Social Links */}
                    <div className="mt-4 flex gap-3 pt-4 border-t border-slate-200">
                      <a href={`mailto:${member.email}`} className="text-slate-400 hover:text-cyan-500 transition-colors" title="Email">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
                        </svg>
                      </a>
                      <a href={`tel:${member.phone}`} className="text-slate-400 hover:text-cyan-500 transition-colors" title="Phone">
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 sm:px-8 lg:px-10 bg-slate-900 text-white">
        <div className="mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12">Our Core Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="text-xl font-bold mb-2">Integrity</h3>
              <p className="text-slate-300">We believe in honest dealings and transparent communication with all our clients.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💪</div>
              <h3 className="text-xl font-bold mb-2">Excellence</h3>
              <p className="text-slate-300">Commitment to delivering the highest quality service in everything we do.</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🤝</div>
              <h3 className="text-xl font-bold mb-2">Partnership</h3>
              <p className="text-slate-300">We work closely with our clients to achieve their real estate goals together.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Join Team CTA */}
      <section className="py-20 px-6 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-4xl text-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-4">Ready to Join Our Team?</h2>
          <p className="text-lg text-slate-600 mb-8">We're always looking for talented individuals to join our growing company.</p>
          <a
            href="mailto:careers@dummy.com"
            className="inline-block px-8 py-3 rounded-lg bg-cyan-500 text-white font-semibold hover:bg-cyan-600 transition-colors"
          >
            View Careers
          </a>
        </div>
      </section>
    </main>
  )
}
