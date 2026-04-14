import { Link } from 'react-router-dom'
import { useState, useEffect, useCallback } from 'react'

export default function Blog() {
  const API_URL = import.meta.env.VITE_API_URL
  const [blogs, setBlogs] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  const featuredBlog = blogs[0]
  const otherBlogs = blogs.slice(1)

  const resolveImage = (image) => {
    if (!image || typeof image !== 'string') return null
    const trimmed = image.trim()
    if (trimmed.startsWith('http') || trimmed.startsWith('/')) return trimmed
    return null
  }

  return (
    <main className="relative min-h-screen overflow-hidden bg-slate-50 text-slate-900">
      <div className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-sky-300/20 blur-3xl" />
      <div className="pointer-events-none absolute top-20 right-8 h-56 w-56 rounded-full bg-cyan-400/15 blur-3xl" />

      <section className="relative overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')] bg-cover bg-center brightness-75" />
        <div className="absolute inset-0 bg-gradient-to-br from-slate-950/80 via-slate-900/20 to-slate-900/95" />

        <div className="relative mx-auto grid max-w-7xl gap-10 px-6 py-24 sm:px-8 lg:grid-cols-[1.1fr_0.9fr] lg:px-10">
          <div className="flex flex-col justify-center gap-8">
            <span className="inline-flex items-center rounded-full border border-white/20 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.32em] text-sky-200 backdrop-blur-sm">
              Insights & Resources
            </span>
            <div className="max-w-3xl">
              <h1 className="text-5xl font-black tracking-tight text-white sm:text-6xl lg:text-7xl">
                Real Estate <span className="text-cyan-400">Blog</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-slate-200 sm:text-xl">
                Explore market updates, smart investment tactics, and space-worthy stories crafted for homebuyers, sellers, and investors.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Authors</p>
                <p className="mt-3 text-2xl font-bold text-white">50+</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Weekly posts</p>
                <p className="mt-3 text-2xl font-bold text-white">Fresh insights</p>
              </div>
              <div className="rounded-3xl border border-white/10 bg-white/10 px-5 py-4 backdrop-blur-xl">
                <p className="text-sm uppercase tracking-[0.3em] text-slate-300">Design</p>
                <p className="mt-3 text-2xl font-bold text-white">Modern cards</p>
              </div>
            </div>
          </div>

          <div className="relative flex items-end justify-center">
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-white/10 bg-white/10 p-6 shadow-[0_30px_80px_-40px_rgba(15,23,42,0.45)] backdrop-blur-xl sm:p-8">
              <div className="flex flex-col gap-4">
                <div className="rounded-[2rem] bg-slate-800 p-5 text-white shadow-lg">
                  <span className="inline-flex rounded-full bg-cyan-500/15 px-3 py-1 text-xs uppercase tracking-[0.22em] text-cyan-200">
                    Featured Story
                  </span>
                  <h2 className="mt-5 text-3xl font-black leading-tight">Tips for First-Time Homebuyers</h2>
                  <p className="mt-4 text-sm leading-6 text-slate-300">
                    Learn the essential steps to buying your first home with confidence — from property search to closing day.
                  </p>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Renting</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">How to spot a good rental</h3>
                  </div>
                  <div className="rounded-[1.75rem] bg-white p-5 shadow-sm">
                    <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Market</p>
                    <h3 className="mt-3 text-xl font-semibold text-slate-900">2026 neighborhood trends</h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto w-full max-w-6xl px-6 py-16 sm:px-8 lg:px-10">
        {loading ? (
          <div className="space-y-8">
            <div className="h-12 w-36 animate-pulse rounded-full bg-slate-200" />
            <div className="grid gap-7 md:grid-cols-2 lg:grid-cols-3">
              {[1, 2, 3, 4, 5, 6].map((skel) => (
                <div key={skel} className="animate-pulse rounded-[1.8rem] border border-slate-200 bg-white p-5">
                  <div className="h-40 rounded-[1.5rem] bg-slate-200" />
                  <div className="mt-5 h-4 w-3/4 rounded-full bg-slate-200" />
                  <div className="mt-3 h-4 w-1/2 rounded-full bg-slate-200" />
                </div>
              ))}
            </div>
          </div>
        ) : error ? (
          <div className="rounded-[2rem] border border-red-200 bg-white p-12 text-center shadow-sm">
            <h3 className="text-2xl font-bold text-slate-900">Could not load blogs</h3>
            <p className="mt-2 text-slate-600">{error}</p>
            <button
              onClick={fetchBlogs}
              className="mt-6 rounded-3xl bg-slate-900 px-6 py-3 font-semibold text-white transition hover:bg-slate-800"
            >
              Try Again
            </button>
          </div>
        ) : blogs.length === 0 ? (
          <div className="rounded-[2rem] border border-slate-200 bg-white p-14 text-center shadow-sm">
            <h3 className="text-3xl font-bold text-slate-900">No Articles Yet</h3>
            <p className="mx-auto mt-3 max-w-xl text-slate-600">
              New market stories and real estate insights are on the way. Visit again soon for fresh updates.
            </p>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {blogs.slice(0, 9).map((blog) => (
              <article
                key={blog._id || blog.id}
                className="overflow-hidden rounded-[1.8rem] border border-slate-200 bg-white shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl"
              >
                <div className="relative h-44 overflow-hidden bg-slate-100">
                  {resolveImage(blog.image) ? (
                    <img
                      src={resolveImage(blog.image)}
                      alt={blog.title}
                      className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center text-slate-400">
                      <svg className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                  )}
                </div>
                <div className="p-5">
                  <div className="flex items-center justify-between text-[0.65rem] uppercase tracking-[0.24em] text-slate-500">
                    <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                    <span className="rounded-full bg-slate-100 px-3 py-1 font-semibold text-slate-700">{blog.category || 'Market'}</span>
                  </div>
                  <h3 className="mt-4 text-xl font-semibold text-slate-900">{blog.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-slate-600">
                    {(blog.excerpt || 'Quick real estate advice and insights for modern homeowners.').slice(0, 120)}{(blog.excerpt || 'Quick real estate advice and insights for modern homeowners.').length > 120 ? '...' : ''}
                  </p>
                  <div className="mt-6 flex items-center justify-between">
                    <span className="text-sm font-medium text-slate-700">{blog.author || 'Admin'}</span>
                    <Link
                      to={`/blog/${blog._id || blog.id}`}
                      className="text-sm font-semibold text-slate-900 transition hover:text-cyan-600"
                    >
                      Read More
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="border-t border-slate-200 bg-slate-950 px-6 py-20 sm:px-8 lg:px-10">
        <div className="mx-auto max-w-5xl rounded-[2rem] border border-slate-800 bg-slate-900/95 p-10 text-center shadow-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-cyan-300">Newsletter</p>
          <h2 className="mt-4 text-3xl font-black text-white sm:text-4xl">Stay Ahead in Property</h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-400">
            Subscribe for weekly property stories and practical market guidance delivered straight to your inbox.
          </p>
          <form className="mx-auto mt-8 flex max-w-2xl flex-col gap-4 sm:flex-row" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded-3xl border border-slate-700 bg-slate-950 px-5 py-4 text-white placeholder-slate-500 focus:border-cyan-400 focus:outline-none focus:ring-2 focus:ring-cyan-400/20"
              required
            />
            <button
              type="submit"
              className="rounded-3xl bg-cyan-500 px-8 py-4 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </main>
  )
}
