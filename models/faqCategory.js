import mongoose from "mongoose";

const faqCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

export default mongoose.model("FaqCategory", faqCategorySchema, "category");
