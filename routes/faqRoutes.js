import express from "express";
import {
  addCategory,
  addFAQ,
  listCategories,
  listFAQs,
} from "../controllers/faqController.js";
import protect from "../middelware/auth.js";

const router = express.Router();

router.post("/category", protect, addCategory);
router.post("/add", protect, addFAQ);
router.get("/list", listFAQs);
router.get("/categories", listCategories);

export default router;
