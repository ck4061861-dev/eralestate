import Blog from "../Models/blog.model.js";

// Create a new blog post
export const createBlog = async (req, res) => {
  try {
    const { title, excerpt, content, author, category, image, published } = req.body;
    const adminId = req.user?.id || "admin";

    if (!title || !excerpt || !content || !author || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const blog = new Blog({
      title,
      excerpt,
      content,
      author,
      category,
      image: image || "📝",
      published: published !== undefined ? published : true,
      createdBy: adminId,
    });

    await blog.save();
    res.status(201).json({
      message: "Blog created successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating blog", error: error.message });
  }
};

// Get all blogs
export const getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

// Get single blog by ID
export const getBlogById = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    // Increment views
    blog.views += 1;
    await blog.save();

    res.status(200).json(blog);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blog", error: error.message });
  }
};

// Update blog
export const updateBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, excerpt, content, author, category, image, published } = req.body;

    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    if (title) blog.title = title;
    if (excerpt) blog.excerpt = excerpt;
    if (content) blog.content = content;
    if (author) blog.author = author;
    if (category) blog.category = category;
    if (image) blog.image = image;
    if (typeof published === "boolean") blog.published = published;

    await blog.save();
    res.status(200).json({
      message: "Blog updated successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating blog", error: error.message });
  }
};

// Delete blog
export const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findByIdAndDelete(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    res.status(200).json({
      message: "Blog deleted successfully",
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error deleting blog", error: error.message });
  }
};

// Debug - Get all blogs (for debugging published status)
export const debugAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().select("title published createdAt");
    res.json({
      total: blogs.length,
      blogs: blogs.map((b) => ({
        title: b.title,
        published: b.published,
        createdAt: b.createdAt,
      })),
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Admin Fix - Publish all unpublished blogs
export const publishAllBlogs = async (req, res) => {
  try {
    const result = await Blog.updateMany(
      { published: false },
      { $set: { published: true } }
    );
    
    // Verify the update
    const allBlogs = await Blog.find().select("title published");
    allBlogs.forEach(b => {
    });
    
    res.json({
      message: "All unpublished blogs are now published",
      updated: result.modifiedCount,
      total: allBlogs.length,
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
// Get published blogs
export const getPublishedBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
    blogs.forEach((b, i) => {
    });
    res.status(200).json(blogs);
  } catch (error) {
    res.status(500).json({ message: "Error fetching blogs", error: error.message });
  }
};

// Publish/Unpublish blog
export const togglePublishBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await Blog.findById(id);

    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }

    blog.published = !blog.published;
    await blog.save();

    res.status(200).json({
      message: `Blog ${blog.published ? "published" : "unpublished"} successfully`,
      blog,
    });
  } catch (error) {
    res.status(500).json({ message: "Error toggling publish status", error: error.message });
  }
};
