import express from "express";
import {
  addCategory,
  addFAQ,
  deleteFaq,
  listCategories,
  listFAQs,
} from "../controllers/faqController.js";
import protect from "../middelware/auth.js";

const router = express.Router();

router.post("/category", protect, addCategory);
router.post("/add", protect, addFAQ);
router.get("/list", listFAQs);
router.get("/categories", listCategories);
router.delete("/faqDelete/:id", deleteFaq);
export default router;
