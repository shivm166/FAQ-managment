import express from "express";
import {
  changePassword,
  loginUser,
  logout,
  registerUser,
} from "../controllers/userControlller.js";
import protect from "../middelware/auth.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.put("/changePassword", protect, changePassword);
router.post("/logout", protect, logout);

export default router;
