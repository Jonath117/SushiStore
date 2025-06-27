import express from "express";
import userRouter from "./routers/userRouter.js";
import productRouter from "./routers/productRouter.js";

const router = express.Router();

router.use("/users", userRouter);
router.use("/products", productRouter);

export default router;
