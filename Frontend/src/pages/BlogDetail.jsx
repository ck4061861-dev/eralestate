import { useParams, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function BlogDetail() {
  const { id } = useParams()
  const API_URL = import.meta.env.VITE_API_URL
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

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

  if (loading) {
    return (
      <main className="bg-slate-50 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <p className="text-slate-600 text-lg">Loading blog post...</p>
        </div>
      </main>
    )
  }

  if (error || !blog) {
    return (
      <main className="bg-slate-50 min-h-screen pt-32 pb-20">
        <div className="mx-auto max-w-2xl px-6 sm:px-8 text-center">
          <h1 className="text-3xl font-bold text-slate-900 mb-4">Blog Not Found</h1>
          <p className="text-slate-600 mb-6">{error || 'This blog post could not be found.'}</p>
          <Link
            to="/blog"
            className="inline-block px-6 py-3 bg-cyan-600 text-white font-semibold rounded-lg hover:bg-cyan-700 transition-colors"
          >
            ← Back to Blogs
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="bg-slate-950 text-white min-h-screen">
      {/* Header */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900 px-6 py-20 sm:px-8 lg:px-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%)] pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(59,130,246,0.18),_transparent_30%)] pointer-events-none" />

        <div className="relative mx-auto flex max-w-6xl flex-col gap-6">
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-cyan-300 hover:text-cyan-200 transition-colors text-sm font-semibold"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Blogs
          </Link>

          <div className="rounded-[2rem] border border-white/10 bg-slate-900/80 p-8 shadow-[0_30px_90px_-50px_rgba(0,0,0,0.45)] backdrop-blur-xl">
            <div className="flex flex-wrap items-center gap-4">
              <span className="inline-flex rounded-full bg-cyan-400/10 px-4 py-2 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/20">
                {blog.category || 'Market'}
              </span>
            </div>

            <h1 className="mt-6 text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
              {blog.title}
            </h1>

            <div className="mt-5 flex flex-wrap items-center gap-3 text-sm text-slate-300">
              <span>By <strong className="text-white">{blog.author || 'Admin'}</strong></span>
              <span>•</span>
              <span>
                {new Date(blog.createdAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <span>•</span>
              <span>{blog.views ?? 0} views</span>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-slate-50 py-16 px-6 sm:px-8 lg:px-10">
        <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-[2rem] bg-white shadow-xl">
              {blog.image ? (
                <img src={blog.image} alt={blog.title} className="w-full object-cover" />
              ) : (
                <div className="flex h-56 items-center justify-center bg-slate-100 text-slate-400">
                  No image available
                </div>
              )}
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <p className="text-lg leading-8 text-slate-700">
                {blog.excerpt || 'No excerpt available.'}
              </p>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <article className="prose prose-slate max-w-none">
                <div className="whitespace-pre-wrap text-slate-700 leading-8">
                  {blog.content || blog.excerpt || 'No detailed content available.'}
                </div>
              </article>
            </div>
          </div>

          <div className="space-y-6">
            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900">Post Details</h2>
              <div className="mt-6 space-y-4 text-sm text-slate-600">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span className="font-semibold text-slate-900">Author</span>
                  <span>{blog.author || 'Admin'}</span>
                </div>
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <span className="font-semibold text-slate-900">Published</span>
                  <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-slate-900">Views</span>
                  <span>{blog.views ?? 0}</span>
                </div>
              </div>
            </div>

            <div className="rounded-[2rem] bg-white p-8 shadow-xl">
              <h2 className="text-xl font-bold text-slate-900">Want more updates?</h2>
              <p className="mt-3 text-slate-600">Subscribe for more market reports, real estate tips, and property insights.</p>
              <form className="mt-6 flex flex-col gap-4 sm:flex-row">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 rounded-3xl border border-slate-300 bg-slate-50 px-5 py-3 text-slate-900 outline-none focus:border-cyan-400 focus:ring-2 focus:ring-cyan-200"
                />
                <button className="rounded-3xl bg-cyan-600 px-6 py-3 text-white font-semibold hover:bg-cyan-500 transition-colors">
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
