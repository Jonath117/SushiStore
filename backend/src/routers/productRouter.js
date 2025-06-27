import express from "express";
import { getProductsByCategory } from "../handlers/product.js";

const router = express.Router();

router.get("/category/:id", getProductsByCategory);

export default router;
