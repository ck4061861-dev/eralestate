import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'
import {
  ArrowRight,
  Calendar,
  User,
  Clock,
  Bookmark,
  TrendingUp,
  Search,
  Loader2,
  RefreshCw,
  Mail,
  Send,
  ChevronRight,
  Tag
} from 'lucide-react'

export default function Blog() {
  const API_URL = import.meta.env.VITE_API_URL
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true)
      const url = `${API_URL}/api/blogs/published`
      const res = await fetch(url)

      if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`)
      }

      const data = await res.json()
      if (Array.isArray(data)) {
        setBlogs(data)
      } else {
        setBlogs([])
      }

      setError(null)
    } catch (error) {
      setError(error.message)
      setBlogs([])
    } finally {
      setLoading(false)
    }
  }, [API_URL])

  useEffect(() => {
    fetchBlogs()
  }, [fetchBlogs])

  const resolveImage = (image) => {
    if (!image || typeof image !== 'string') return null
    const trimmed = image.trim()
    if (trimmed.startsWith('http') || trimmed.startsWith('/')) return trimmed
    return null
  }

  // Get unique categories
  const categories = ['All', ...new Set(blogs.map(b => b.category).filter(Boolean))]
  
  // Filter blogs
  const filteredBlogs = activeCategory === 'All' 
    ? blogs 
    : blogs.filter(b => b.category === activeCategory)

  const featuredBlog = filteredBlogs[0]
  const otherBlogs = filteredBlogs.slice(1)

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'long', 
      day: 'numeric',
      year: 'numeric'
    })
  }

  return (
    <main 
      className="min-h-screen bg-white text-gray-900 overflow-hidden"
      style={{ fontFamily: "'Poppins', sans-serif" }}
    >
      
      {/* ── HERO SECTION ── */}
      <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="absolute top-0 right-0 w-[700px] h-[700px] bg-gray-50 rounded-full blur-[120px] opacity-40 pointer-events-none -translate-y-1/3 translate-x-1/4" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-gray-100 rounded-full blur-[100px] opacity-30 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto relative z-10">
          
          {/* Top Label */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-gray-200 bg-white shadow-sm">
              <TrendingUp className="w-3.5 h-3.5 text-gray-400" />
              <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-500 uppercase">Insights & Resources</span>
            </div>
          </div>

          <div className="text-center max-w-4xl mx-auto mb-16">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-[0.95] tracking-tight mb-8">
              Real Estate
              <span className="font-light text-gray-400"> Journal</span>
            </h1>
            <p className="text-gray-500 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed font-light">
              Explore market updates, smart investment tactics, and space-worthy stories crafted for homebuyers, sellers, and investors.
            </p>
          </div>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input 
                type="text" 
                placeholder="Search articles..."
                className="w-full pl-14 pr-6 py-5 rounded-full border border-gray-200 bg-white shadow-lg shadow-gray-100/50 text-gray-900 placeholder-gray-400 focus:outline-none focus:border-gray-400 focus:ring-4 focus:ring-gray-100 transition-all"
              />
            </div>
          </div>

          {/* Stats */}
          <div className="flex justify-center gap-12">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">{blogs.length}+</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mt-1">Articles</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">50+</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mt-1">Authors</p>
            </div>
            <div className="w-px bg-gray-200" />
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-900">Weekly</p>
              <p className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.2em] mt-1">Updates</p>
            </div>
          </div>
        </div>
      </section>

      {/* ── CATEGORY FILTER ── */}
      {!loading && !error && blogs.length > 0 && (
        <section className="px-6 py-6 border-y border-gray-100 sticky top-0 z-40 bg-white/80 backdrop-blur-xl">
          <div className="max-w-7xl mx-auto flex items-center gap-3 overflow-x-auto no-scrollbar">
            <span className="text-xs font-semibold text-gray-400 uppercase tracking-wider shrink-0 mr-2">Filter:</span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shrink-0 ${
                  activeCategory === cat
                    ? 'bg-gray-900 text-white shadow-lg shadow-gray-900/20'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </section>
      )}

      <div className="max-w-7xl mx-auto px-6 py-16">
        
        {/* ── LOADING STATE ── */}
        {loading && (
          <div className="space-y-12">
            {/* Featured Skeleton */}
            <div className="grid lg:grid-cols-2 gap-8">
              <div className="h-80 lg:h-[500px] rounded-[2rem] bg-gray-100 animate-pulse" />
              <div className="flex flex-col justify-center space-y-6">
                <div className="h-6 w-32 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-12 w-full rounded-xl bg-gray-100 animate-pulse" />
                <div className="h-12 w-3/4 rounded-xl bg-gray-100 animate-pulse" />
                <div className="h-4 w-full rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 w-5/6 rounded-full bg-gray-100 animate-pulse" />
                <div className="h-4 w-4/6 rounded-full bg-gray-100 animate-pulse" />
              </div>
            </div>
            {/* Grid Skeleton */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((skel) => (
                <div key={skel} className="animate-pulse">
                  <div className="h-56 rounded-[1.5rem] bg-gray-100 mb-5" />
                  <div className="h-4 w-24 rounded-full bg-gray-100 mb-3" />
                  <div className="h-6 w-full rounded-xl bg-gray-100 mb-3" />
                  <div className="h-4 w-full rounded-full bg-gray-100 mb-2" />
                  <div className="h-4 w-5/6 rounded-full bg-gray-100" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── ERROR STATE ── */}
        {!loading && error && (
          <div className="rounded-[2rem] border border-red-100 bg-red-50/50 p-16 text-center">
            <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <RefreshCw className="w-8 h-8 text-red-500" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-3">Could not load blogs</h3>
            <p className="text-gray-500 mb-8 max-w-md mx-auto">{error}</p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg font-medium text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Try Again
            </button>
          </div>
        )}

        {/* ── EMPTY STATE ── */}
        {!loading && !error && blogs.length === 0 && (
          <div className="rounded-[2rem] border border-gray-100 bg-gray-50/50 p-20 text-center">
            <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
              <Bookmark className="w-10 h-10 text-gray-400" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-4">No Articles Yet</h3>
            <p className="text-gray-500 max-w-lg mx-auto leading-relaxed mb-8">
              New market stories and real estate insights are on the way. Visit again soon for fresh updates.
            </p>
            <button
              onClick={fetchBlogs}
              className="inline-flex items-center gap-2 px-8 py-4 border border-gray-300 text-gray-900 rounded-full hover:bg-gray-50 transition-all font-medium text-sm"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </button>
          </div>
        )}

        {/* ── CONTENT ── */}
        {!loading && !error && blogs.length > 0 && (
          <div className="space-y-20">
            
            {/* FEATURED ARTICLE */}
            {featuredBlog && (
              <div className="group">
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-6 block">Featured Story</span>
                <Link to={`/blog/${featuredBlog._id || featuredBlog.id}`} className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-center">
                  <div className="lg:col-span-7 relative">
                    <div className="aspect-[16/10] rounded-[2rem] overflow-hidden bg-gray-100">
                      {resolveImage(featuredBlog.image) ? (
                        <img
                          src={resolveImage(featuredBlog.image)}
                          alt={featuredBlog.title}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          loading="eager"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                          <TrendingUp className="w-16 h-16 text-gray-300" />
                        </div>
                      )}
                    </div>
                    <div className="absolute top-6 left-6">
                      <span className="px-4 py-2 bg-white/90 backdrop-blur-sm rounded-full text-xs font-semibold text-gray-900 uppercase tracking-wider shadow-sm">
                        {featuredBlog.category || 'Featured'}
                      </span>
                    </div>
                  </div>
                  
                  <div className="lg:col-span-5 space-y-6">
                    <div className="flex items-center gap-4 text-sm text-gray-400">
                      <span className="flex items-center gap-1.5">
                        <Calendar className="w-4 h-4" />
                        {formatDate(featuredBlog.createdAt)}
                      </span>
                      <span className="w-1 h-1 rounded-full bg-gray-300" />
                      <span className="flex items-center gap-1.5">
                        <Clock className="w-4 h-4" />
                        5 min read
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight text-gray-900 group-hover:text-gray-600 transition-colors">
                      {featuredBlog.title}
                    </h2>
                    
                    <p className="text-gray-500 text-lg leading-relaxed font-light">
                      {(featuredBlog.excerpt || 'Quick real estate advice and insights for modern homeowners.').slice(0, 200)}
                      {(featuredBlog.excerpt || '').length > 200 ? '...' : ''}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-semibold">
                          {(featuredBlog.author || 'A').charAt(0)}
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{featuredBlog.author || 'Admin'}</p>
                          <p className="text-xs text-gray-400">Author</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm font-semibold text-gray-900 group-hover:translate-x-1 transition-transform">
                        Read Article <ArrowRight className="w-4 h-4" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* DIVIDER */}
            <div className="border-t border-gray-100" />

            {/* ARTICLE GRID */}
            <div>
              <div className="flex items-end justify-between mb-12">
                <div>
                  <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-3 block">Latest</span>
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900">More Stories</h2>
                </div>
                <span className="text-sm text-gray-400 font-light">{otherBlogs.length} articles</span>
              </div>

              <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                {otherBlogs.slice(0, 9).map((blog, index) => (
                  <article
                    key={blog._id || blog.id}
                    className="group flex flex-col"
                  >
                    <Link to={`/blog/${blog._id || blog.id}`} className="block">
                      <div className="relative aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100 mb-6">
                        {resolveImage(blog.image) ? (
                          <img
                            src={resolveImage(blog.image)}
                            alt={blog.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            loading="lazy"
                            decoding="async"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                            <Tag className="w-10 h-10 text-gray-300" />
                          </div>
                        )}
                        <div className="absolute top-4 left-4">
                          <span className="px-3 py-1.5 bg-white/90 backdrop-blur-sm rounded-full text-[10px] font-semibold text-gray-700 uppercase tracking-wider">
                            {blog.category || 'Market'}
                          </span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>

                    <div className="flex flex-col flex-1">
                      <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                        <span className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          {formatDate(blog.createdAt)}
                        </span>
                        <span className="w-1 h-1 rounded-full bg-gray-300" />
                        <span>5 min read</span>
                      </div>

                      <Link to={`/blog/${blog._id || blog.id}`}>
                        <h3 className="text-xl font-semibold text-gray-900 mb-3 leading-snug group-hover:text-gray-600 transition-colors line-clamp-2">
                          {blog.title}
                        </h3>
                      </Link>

                      <p className="text-gray-500 text-sm leading-relaxed font-light line-clamp-3 mb-5 flex-1">
                        {(blog.excerpt || 'Quick real estate advice and insights for modern homeowners.').slice(0, 120)}
                        {(blog.excerpt || '').length > 120 ? '...' : ''}
                      </p>

                      <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-gray-100 text-gray-600 flex items-center justify-center text-xs font-semibold">
                            {(blog.author || 'A').charAt(0)}
                          </div>
                          <span className="text-xs font-medium text-gray-600">{blog.author || 'Admin'}</span>
                        </div>
                        <Link 
                          to={`/blog/${blog._id || blog.id}`}
                          className="text-xs font-semibold text-gray-900 flex items-center gap-1 group-hover:gap-2 transition-all"
                        >
                          Read <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>

          </div>
        )}

      </div>

      {/* ── NEWSLETTER ── */}
      <section className="px-6 py-24 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-[2.5rem] bg-gray-900 p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-30" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-20" />
            
            <div className="relative z-10">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm mb-8">
                <Mail className="w-3.5 h-3.5 text-gray-400" />
                <span className="text-[10px] font-semibold tracking-[0.3em] text-gray-400 uppercase">Newsletter</span>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 tracking-tight">
                Stay Ahead in <span className="font-light text-gray-400">Property</span>
              </h2>
              
              <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10 font-light leading-relaxed">
                Subscribe for weekly property stories and practical market guidance delivered straight to your inbox.
              </p>
              
              <form className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
                <div className="relative flex-1">
                  <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 focus:ring-4 focus:ring-gray-700/30 transition-all"
                    required
                  />
                </div>
                <button
                  type="submit"
                  className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-900 rounded-full font-semibold hover:bg-gray-100 transition-all hover:-translate-y-0.5 shadow-lg"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

    </main>
  )
}