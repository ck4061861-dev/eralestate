import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  User,
  Share2,
  Link as LinkIcon,
  Bookmark,
  Heart,
  Mail,
  Send,
  ChevronRight,
  Tag,
  Loader2
} from 'lucide-react'

export default function BlogDetail() {
  const { id } = useParams()
  const API_URL = import.meta.env.VITE_API_URL
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [liked, setLiked] = useState(false)
  const [bookmarked, setBookmarked] = useState(false)
  const [relatedBlogs, setRelatedBlogs] = useState([])

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true)
        const res = await fetch(`${API_URL}/api/blogs/${id}`)
        
        if (!res.ok) {
          throw new Error(`HTTP Error: ${res.status}`)
        }
        
        const data = await res.json()
        setBlog(data)
        setError(null)
        
        // Fetch related blogs (mock - in real app you'd filter by category)
        const allRes = await fetch(`${API_URL}/api/blogs/published`)
        if (allRes.ok) {
          const allData = await allRes.json()
          const filtered = allData.filter(b => b._id !== id && b._id !== data._id).slice(0, 3)
          setRelatedBlogs(filtered)
        }
      } catch (error) {
        setError(error.message)
        setBlog(null)
      } finally {
        setLoading(false)
      }
    }

    if (id) {
      fetchBlog()
    }
  }, [id, API_URL])

  const formatDate = (dateString) => {
    if (!dateString) return ''
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  const readingTime = (text) => {
    if (!text) return '3 min read'
    const words = text.split(/\s+/).length
    const mins = Math.ceil(words / 200)
    return `${mins} min read`
  }

  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href)
  }

  if (loading) {
    return (
      <main className="min-h-screen bg-white flex items-center justify-center" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="text-center">
          <Loader2 className="w-10 h-10 text-gray-400 animate-spin mx-auto mb-4" />
          <p className="text-gray-500 text-lg font-light">Loading article...</p>
        </div>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className="min-h-screen bg-white pt-32 pb-20" style={{ fontFamily: "'Poppins', sans-serif" }}>
        <div className="max-w-2xl mx-auto px-6 text-center">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-8">
            <Bookmark className="w-10 h-10 text-gray-400" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-500 mb-8 text-lg font-light">{error || 'This blog post could not be found or has been removed.'}</p>
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full hover:bg-black transition-all shadow-lg font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Journal
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-white text-gray-900" style={{ fontFamily: "'Poppins', sans-serif" }}>
      
      {/* ── READING PROGRESS ── */}
      <div className="fixed top-0 left-0 h-1 bg-gray-900 z-50 transition-all duration-100" style={{ width: '0%' }} id="reading-progress" />

      {/* ── HERO HEADER ── */}
      <section className="relative px-6 pt-24 pb-16 lg:pt-32 lg:pb-20 border-b border-gray-100">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gray-50 rounded-full blur-[120px] opacity-60 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          
          {/* Back Link */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-900 transition-colors text-sm font-medium mb-10 group"
          >
            <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
            Back to Journal
          </Link>

          {/* Category & Meta */}
          <div className="flex flex-wrap items-center gap-4 mb-8">
            <span className="px-4 py-2 bg-gray-900 text-white rounded-full text-xs font-semibold uppercase tracking-wider">
              {blog.category || 'Market'}
            </span>
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4" />
                {formatDate(blog.createdAt)}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <Clock className="w-4 h-4" />
                {readingTime(blog.content)}
              </span>
              <span className="w-1 h-1 rounded-full bg-gray-300" />
              <span className="flex items-center gap-1.5">
                <Eye className="w-4 h-4" />
                {blog.views ?? 0} views
              </span>
            </div>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold leading-[1.05] tracking-tight mb-8 max-w-4xl">
            {blog.title}
          </h1>

          {/* Author & Actions */}
          <div className="flex flex-wrap items-center justify-between gap-6 pt-6 border-t border-gray-100">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center text-lg font-bold">
                {(blog.author || 'A').charAt(0)}
              </div>
              <div>
                <p className="font-semibold text-gray-900">{blog.author || 'Admin'}</p>
                <p className="text-xs text-gray-400 uppercase tracking-wider">Author</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button 
                onClick={() => setLiked(!liked)}
                className={`p-3 rounded-full border transition-all ${liked ? 'bg-red-50 border-red-200 text-red-500' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}
              >
                <Heart className={`w-5 h-5 ${liked ? 'fill-current' : ''}`} />
              </button>
              <button 
                onClick={() => setBookmarked(!bookmarked)}
                className={`p-3 rounded-full border transition-all ${bookmarked ? 'bg-gray-900 border-gray-900 text-white' : 'border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600'}`}
              >
                <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
              </button>
              <div className="relative group">
                <button className="p-3 rounded-full border border-gray-200 text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-all">
                  <Share2 className="w-5 h-5" />
                </button>
                <div className="absolute right-0 top-full mt-2 bg-white border border-gray-100 rounded-2xl shadow-xl p-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all z-50 min-w-[160px]">
                  <button onClick={copyLink} className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <LinkIcon className="w-4 h-4" /> Copy Link
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Send className="w-4 h-4" /> Share on X
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Share2 className="w-4 h-4" /> Facebook
                  </button>
                  <button className="flex items-center gap-3 w-full px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 rounded-xl transition-colors">
                    <Share2 className="w-4 h-4" /> LinkedIn
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FEATURED IMAGE ── */}
      {blog.image && (
        <section className="px-6 -mt-8 mb-16">
          <div className="max-w-6xl mx-auto">
            <div className="aspect-[21/9] rounded-[2rem] overflow-hidden bg-gray-100 shadow-2xl shadow-gray-200/50">
              <img 
                src={blog.image} 
                alt={blog.title} 
                className="w-full h-full object-cover"
                loading="eager"
              />
            </div>
          </div>
        </section>
      )}

      {/* ── MAIN CONTENT ── */}
      <section className="px-6 py-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-12 gap-12">
            
            {/* Article Content */}
            <div className="lg:col-span-8">
              
              {/* Excerpt Card */}
              {blog.excerpt && (
                <div className="p-8 md:p-10 bg-gray-50 rounded-[2rem] border border-gray-100 mb-10">
                  <p className="text-xl md:text-2xl text-gray-600 leading-relaxed font-light italic">
                    "{blog.excerpt}"
                  </p>
                </div>
              )}

              {/* Main Article */}
              <article className="prose prose-lg prose-gray max-w-none">
                <div className="text-gray-600 leading-[1.9] text-lg font-light whitespace-pre-wrap">
                  {blog.content || blog.excerpt || 'No detailed content available for this article.'}
                </div>
              </article>

              {/* Tags */}
              <div className="mt-12 pt-8 border-t border-gray-100">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider mr-2">Tags:</span>
                  {[blog.category, 'Real Estate', 'Property', 'Investment'].filter(Boolean).map((tag, i) => (
                    <span key={i} className="px-4 py-2 bg-gray-100 text-gray-600 rounded-full text-xs font-medium uppercase tracking-wider hover:bg-gray-200 transition-colors cursor-pointer">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* Author Bio */}
              <div className="mt-12 p-8 bg-gray-50 rounded-[2rem] border border-gray-100">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gray-900 to-gray-700 text-white flex items-center justify-center text-xl font-bold shrink-0">
                    {(blog.author || 'A').charAt(0)}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg mb-2">Written by {blog.author || 'Admin'}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed font-light">
                      Real estate professional with expertise in property markets across the UK. 
                      Passionate about helping clients make informed decisions in buying, selling, and investing.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-4 space-y-8">
              
              {/* Post Details */}
              <div className="p-6 bg-white rounded-[2rem] border border-gray-100 shadow-sm sticky top-24">
                <h3 className="font-bold text-gray-900 mb-6 text-sm uppercase tracking-wider">Post Details</h3>
                <div className="space-y-5">
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <span className="text-sm text-gray-400">Author</span>
                    <span className="text-sm font-semibold text-gray-900">{blog.author || 'Admin'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <span className="text-sm text-gray-400">Published</span>
                    <span className="text-sm font-semibold text-gray-900">{formatDate(blog.createdAt)}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <span className="text-sm text-gray-400">Category</span>
                    <span className="text-sm font-semibold text-gray-900">{blog.category || 'General'}</span>
                  </div>
                  <div className="flex items-center justify-between pb-4 border-b border-gray-50">
                    <span className="text-sm text-gray-400">Reading Time</span>
                    <span className="text-sm font-semibold text-gray-900">{readingTime(blog.content)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-gray-400">Views</span>
                    <span className="text-sm font-semibold text-gray-900">{blog.views ?? 0}</span>
                  </div>
                </div>

                {/* Newsletter Mini */}
                <div className="mt-8 pt-8 border-t border-gray-100">
                  <h4 className="font-bold text-gray-900 mb-2 text-sm">Stay Updated</h4>
                  <p className="text-xs text-gray-400 mb-4 leading-relaxed">Get weekly property insights delivered to your inbox.</p>
                  <form className="flex flex-col gap-3" onSubmit={(e) => e.preventDefault()}>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <input
                        type="email"
                        placeholder="Your email"
                        className="w-full pl-11 pr-4 py-3 rounded-xl border border-gray-200 bg-gray-50 text-sm focus:outline-none focus:border-gray-400 transition-all"
                      />
                    </div>
                    <button className="w-full py-3 bg-gray-900 text-white rounded-xl text-sm font-semibold hover:bg-black transition-all">
                      Subscribe
                    </button>
                  </form>
                </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* ── RELATED ARTICLES ── */}
      {relatedBlogs.length > 0 && (
        <section className="px-6 py-24 bg-gray-50/50 border-t border-gray-100">
          <div className="max-w-6xl mx-auto">
            <div className="flex items-end justify-between mb-12">
              <div>
                <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-[0.3em] mb-3 block">Continue Reading</span>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900">Related Stories</h2>
              </div>
              <Link to="/blog" className="text-sm font-semibold text-gray-900 flex items-center gap-1 hover:gap-2 transition-all">
                View All <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {relatedBlogs.map((rblog) => (
                <Link 
                  key={rblog._id || rblog.id} 
                  to={`/blog/${rblog._id || rblog.id}`}
                  className="group block"
                >
                  <div className="aspect-[4/3] rounded-[1.5rem] overflow-hidden bg-gray-100 mb-5">
                    {rblog.image ? (
                      <img 
                        src={rblog.image} 
                        alt={rblog.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-50">
                        <Tag className="w-8 h-8 text-gray-300" />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-3 text-xs text-gray-400 mb-3">
                    <span>{rblog.category || 'Market'}</span>
                    <span className="w-1 h-1 rounded-full bg-gray-300" />
                    <span>{formatDate(rblog.createdAt)}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 group-hover:text-gray-600 transition-colors line-clamp-2 leading-snug">
                    {rblog.title}
                  </h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── BOTTOM CTA ── */}
      <section className="px-6 py-24">
        <div className="max-w-4xl mx-auto rounded-[2.5rem] bg-gray-900 p-12 md:p-20 text-center relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gray-800 rounded-full blur-[100px] opacity-30" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gray-800 rounded-full blur-[80px] opacity-20" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-6 tracking-tight">
              Enjoyed this <span className="font-light text-gray-400">article?</span>
            </h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto mb-10 font-light leading-relaxed">
              Subscribe to our newsletter for weekly property stories and market insights.
            </p>
            
            <form className="max-w-lg mx-auto flex flex-col sm:flex-row gap-4" onSubmit={(e) => e.preventDefault()}>
              <div className="relative flex-1">
                <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-full pl-14 pr-6 py-4 rounded-full border border-gray-700 bg-gray-800 text-white placeholder-gray-500 focus:outline-none focus:border-gray-500 transition-all"
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
      </section>

    </main>
  )
}