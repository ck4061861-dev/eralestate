import { useState, useEffect, useCallback } from "react";

export default function BlogManager() {
  const API_URL = import.meta.env.VITE_API_URL;

  const [blogsData, setBlogsData] = useState([]);
  const [blogSearchQuery, setBlogSearchQuery] = useState("");
  const [showBlogForm, setShowBlogForm] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [message, setMessage] = useState("");

  const [blogForm, setBlogForm] = useState({
    title: "",
    excerpt: "",
    content: "",
    author: "",
    category: "General",
    image: "📝",
    published: true,
  });

  const blogCategories = [
    "General",
    "Buying",
    "Selling",
    "Renting",
    "Market",
    "Investment",
    "Maintenance",
    "Tips",
    "Legal",
  ];

  const blogImages = ["📝", "📰", "🏠", "📈", "💰", "🏡", "🔧", "📋", "🎯", "💡"];

  const getBlogs = useCallback(async () => {
    try {
      const res = await fetch(`${API_URL}/api/blogs`);
      if (!res.ok) throw new Error("Failed to load blogs");
      const data = await res.json();
      const normalized = (Array.isArray(data) ? data : data.blogs || []).map((item) => ({
        ...item,
        id: item._id || item.id,
      }));
      setBlogsData(normalized);
    } catch (error) {
      console.error(error);
      setMessage("Failed to load blogs");
    }
  }, [API_URL]);

  useEffect(() => {
    getBlogs();
  }, [getBlogs]);

  const handleBlogSubmit = async (e) => {
    e.preventDefault();

    const trimmed = {
      ...blogForm,
      title: blogForm.title.trim(),
      excerpt: blogForm.excerpt.trim(),
      content: blogForm.content.trim(),
      author: blogForm.author.trim(),
      category: blogForm.category,
      image: blogForm.image,
      published: blogForm.published,
    };

    if (!trimmed.title || !trimmed.excerpt || !trimmed.content || !trimmed.author) {
      setMessage("All fields are required");
      return;
    }

    try {
      if (editingBlog) {
        const res = await fetch(
          `${API_URL}/api/blogs/${editingBlog._id || editingBlog.id}`,
          {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(trimmed),
          }
        );

        if (!res.ok) throw new Error("Failed to update blog");
        const data = await res.json();
        const normalizedBlog = {
          ...data.blog,
          id: data.blog._id || data.blog.id,
        };
        setBlogsData((prev) =>
          prev.map((b) =>
            b._id === normalizedBlog._id || b.id === normalizedBlog._id
              ? normalizedBlog
              : b
          )
        );
        setMessage("Blog updated successfully");
      } else {
        console.log("📝 Sending blog to backend:", trimmed);
        const res = await fetch(`${API_URL}/api/blogs`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(trimmed),
        });

        if (!res.ok) {
          const failMsg = await res
            .json()
            .then((j) => j.message)
            .catch(() => "Failed to create blog");
          throw new Error(failMsg);
        }

        const data = await res.json();
        const normalizedBlog = {
          ...data.blog,
          id: data.blog._id || data.blog.id,
        };
        setBlogsData((prev) => [normalizedBlog, ...prev]);
        setMessage("Blog created successfully");
      }

      setShowBlogForm(false);
      setEditingBlog(null);
      setBlogForm({
        title: "",
        excerpt: "",
        content: "",
        author: "",
        category: "General",
        image: "📝",
        published: true,
      });
    } catch (error) {
      console.error(error);
      setMessage(error.message || "Blog save failed");
    }
  };

  const handleBlogEdit = (blog) => {
    setEditingBlog(blog);
    setBlogForm({
      title: blog.title || "",
      excerpt: blog.excerpt || "",
      content: blog.content || "",
      author: blog.author || "",
      category: blog.category || "General",
      image: blog.image || "📝",
      published: blog.published || true,
    });
    setShowBlogForm(true);
  };

  const handleBlogDelete = async (blogId) => {
    if (!window.confirm("Delete this blog? This action cannot be undone.")) return;

    try {
      const res = await fetch(`${API_URL}/api/blogs/${blogId}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete blog");
      setBlogsData((prev) => prev.filter((b) => b._id !== blogId && b.id !== blogId));
      setMessage("Blog deleted successfully");
    } catch (error) {
      console.error(error);
      setMessage("Failed to delete blog");
    }
  };

  const togglePublish = async (blogId, currentStatus) => {
    try {
      const res = await fetch(`${API_URL}/api/blogs/${blogId}/publish`, {
        method: "PATCH",
      });
      if (!res.ok) throw new Error("Failed to update publish status");
      const data = await res.json();
      const normalizedBlog = {
        ...data.blog,
        id: data.blog._id || data.blog.id,
      };
      setBlogsData((prev) =>
        prev.map((b) =>
          b._id === blogId || b.id === blogId ? normalizedBlog : b
        )
      );
      setMessage(
        `Blog ${normalizedBlog.published ? "published" : "unpublished"} successfully`
      );
    } catch (error) {
      console.error(error);
      setMessage("Failed to update publish status");
    }
  };

  const filteredBlogs = blogsData.filter((blog) =>
    blog.title?.toLowerCase().includes(blogSearchQuery.toLowerCase()) ||
    blog.author?.toLowerCase().includes(blogSearchQuery.toLowerCase())
  );

  return (
    <div>
      {/* Message Banner */}
      {message && (
        <div className="flex items-center gap-2.5 bg-[#f0f9ff] border border-[#bae6fd] text-[#0369a1] rounded-[10px] px-4 py-3 text-[13px] mb-5">
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <circle cx="12" cy="12" r="10" />
            <line x1="12" y1="8" x2="12" y2="12" />
            <line x1="12" y1="16" x2="12.01" y2="16" />
          </svg>
          {message}
        </div>
      )}

      {/* Blog Form Section */}
      {showBlogForm && (
        <div className="bg-white border border-[#ebebeb] rounded-2xl p-7 mb-5">
          <div className="mb-7">
            <h2 className="text-xl font-bold text-[#111] mb-0.5">
              {editingBlog ? "Edit Blog Post" : "Create New Blog Post"}
            </h2>
            <p className="text-[13px] text-[#999]">
              {editingBlog
                ? "Update the blog details below"
                : "Add a new blog post to engage your audience"}
            </p>
          </div>

          <form onSubmit={handleBlogSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Title */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#111] mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={blogForm.title}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, title: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#ddd] rounded-[8px] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter blog title"
                  required
                />
              </div>

              {/* Excerpt */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#111] mb-2">
                  Excerpt (Short Summary)
                </label>
                <textarea
                  value={blogForm.excerpt}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, excerpt: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#ddd] rounded-[8px] text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Enter a brief excerpt"
                  rows="2"
                  required
                />
              </div>

              {/* Content */}
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-[#111] mb-2">
                  Content
                </label>
                <textarea
                  value={blogForm.content}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, content: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#ddd] rounded-[8px] text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Enter full blog content"
                  rows="8"
                  required
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-[#111] mb-2">
                  Author Name
                </label>
                <input
                  type="text"
                  value={blogForm.author}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, author: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#ddd] rounded-[8px] text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter author name"
                  required
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-[#111] mb-2">
                  Category
                </label>
                <select
                  value={blogForm.category}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, category: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#ddd] rounded-[8px] text-sm focus:outline-none focus:border-blue-500"
                >
                  {blogCategories.map((cat) => (
                    <option key={cat} value={cat}>
                      {cat}
                    </option>
                  ))}
                </select>
              </div>

              {/* Image Emoji */}
              <div>
                <label className="block text-sm font-medium text-[#111] mb-2">
                  Featured Image (Emoji)
                </label>
                <select
                  value={blogForm.image}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, image: e.target.value })
                  }
                  className="w-full px-4 py-2.5 border border-[#ddd] rounded-[8px] text-sm focus:outline-none focus:border-blue-500"
                >
                  {blogImages.map((img) => (
                    <option key={img} value={img}>
                      {img} {["📝", "📰", "🏠", "📈", "💰", "🏡", "🔧", "📋", "🎯", "💡"][blogImages.indexOf(img)]}
                    </option>
                  ))}
                </select>
              </div>

              {/* Published Status */}
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="published"
                  checked={blogForm.published}
                  onChange={(e) =>
                    setBlogForm({ ...blogForm, published: e.target.checked })
                  }
                  className="w-4 h-4 accent-blue-600 cursor-pointer"
                />
                <label htmlFor="published" className="text-sm font-medium text-[#111] cursor-pointer">
                  Publish (default: published)
                </label>
              </div>
            </div>

            {/* Form Actions */}
            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-6 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
              >
                {editingBlog ? "Update Blog" : "Create Blog"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowBlogForm(false);
                  setEditingBlog(null);
                  setBlogForm({
                    title: "",
                    excerpt: "",
                    content: "",
                    author: "",
                    category: "General",
                    image: "📝",
                    published: true,
                  });
                }}
                className="flex items-center gap-2 bg-[#f0f0f0] hover:bg-[#e0e0e0] text-[#111] text-sm font-semibold px-6 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Blogs List Section */}
      <div className="bg-white border border-[#ebebeb] rounded-2xl p-7">
        <div className="flex items-center justify-between gap-4 mb-7">
          <div>
            <h2 className="text-xl font-bold text-[#111] mb-0.5">Blog Posts</h2>
            <p className="text-[13px] text-[#999]">
              Manage all blog posts ({blogsData.length})
            </p>
          </div>
          {!showBlogForm && (
            <button
              onClick={() => setShowBlogForm(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold px-5 py-2.5 rounded-[10px] transition-colors cursor-pointer border-none shrink-0"
            >
              ➕ New Blog
            </button>
          )}
        </div>

        {/* Search Bar */}
        <div className="mb-5">
          <input
            type="text"
            placeholder="Search by title or author..."
            value={blogSearchQuery}
            onChange={(e) => setBlogSearchQuery(e.target.value)}
            className="w-full px-4 py-2.5 border border-[#ddd] rounded-[10px] text-sm focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Blogs Grid */}
        {filteredBlogs.length === 0 ? (
          <div className="text-center py-12">
            <div className="text-[40px] mb-2">📝</div>
            <p className="text-[#999] text-sm">
              {blogSearchQuery ? "No blogs found matching your search" : "No blogs yet. Create one to get started!"}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredBlogs.map((blog) => (
              <div
                key={blog.id}
                className="border border-[#ebebeb] rounded-[12px] overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                {/* Blog Card Image */}
                <div className="h-40 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 flex items-center justify-center text-6xl">
                  {blog.image}
                </div>

                {/* Blog Card Content */}
                <div className="p-4">
                  {/* Badge */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="inline-block px-2.5 py-1 text-xs font-semibold text-cyan-600 bg-cyan-100 rounded-full">
                      {blog.category}
                    </span>
                    <span
                      className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-full ${
                        blog.published
                          ? "bg-emerald-100 text-emerald-600"
                          : "bg-amber-100 text-amber-600"
                      }`}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[14px] font-bold text-[#111] mb-2 line-clamp-2">
                    {blog.title}
                  </h3>

                  {/* Meta */}
                  <div className="text-[12px] text-[#999] mb-3 flex items-center gap-1">
                    <span>✍️ {blog.author}</span>
                  </div>

                  {/* Excerpt */}
                  <p className="text-[12px] text-[#666] mb-4 line-clamp-2">
                    {blog.excerpt}
                  </p>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleBlogEdit(blog)}
                      className="flex-1 text-center px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-600 text-xs font-semibold rounded-[8px] cursor-pointer border-none transition-colors"
                    >
                      ✏️ Edit
                    </button>
                    <button
                      onClick={() =>
                        togglePublish(blog._id || blog.id, blog.published)
                      }
                      className={`flex-1 text-center px-3 py-2 text-xs font-semibold rounded-[8px] cursor-pointer border-none transition-colors ${
                        blog.published
                          ? "bg-amber-50 hover:bg-amber-100 text-amber-600"
                          : "bg-emerald-50 hover:bg-emerald-100 text-emerald-600"
                      }`}
                    >
                      {blog.published ? "🔒 Unpub" : "🔓 Pub"}
                    </button>
                    <button
                      onClick={() => handleBlogDelete(blog._id || blog.id)}
                      className="flex-1 text-center px-3 py-2 bg-red-50 hover:bg-red-100 text-red-600 text-xs font-semibold rounded-[8px] cursor-pointer border-none transition-colors"
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
