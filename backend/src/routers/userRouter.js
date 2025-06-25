import express from "express";
import { loginUser, registerUser } from "../handlers/user.js";
import { requireAuth } from "../middlewares/requireAuth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/profile", requireAuth, getUserProfile);

router.get("/profile", requireAuth, (req, res) => {
  res.json({ message: `Hola ${req.user.username}` });
});

export default router;
