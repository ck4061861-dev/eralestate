import express from "express";
import {
  createBlog,
  getAllBlogs,
  getBlogById,
  updateBlog,
  deleteBlog,
  getPublishedBlogs,
  togglePublishBlog,
  debugAllBlogs,
  publishAllBlogs,
} from "../Controller/blog.controller.js";

const router = express.Router();

// Debug endpoints
router.get("/debug/all", debugAllBlogs);
router.post("/admin/fix/publish-all", publishAllBlogs);

// Admin routes (all blogs) - must come before /:id
router.get("/", getAllBlogs);
router.post("/", createBlog);

// Public routes - specific routes before parameter routes
router.get("/published", getPublishedBlogs);
router.get("/:id", getBlogById);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog);
router.patch("/:id/publish", togglePublishBlog);

export default router;
