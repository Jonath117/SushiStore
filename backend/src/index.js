import express from "express";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";
import blogRouter from "./routers/blogRouter.js";
import dotenv from "dotenv";
dotenv.config();

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);
router.use("/blogs", blogRouter);

export default router;
