import express from "express";
import { getAllBlogs, getBlogById, updateBlog } from "../handlers/blog.js"; 
import { protect } from "../modules/auth.js";

const router = express.Router();

router.get("/", getAllBlogs);
router.get("/:id", getBlogById);
router.put("/:id", protect, updateBlog);

export default router;