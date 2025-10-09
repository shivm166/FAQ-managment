import mongoose from "mongoose";

const faqCategorySchema = new mongoose.Schema(
  {
    name: { type: String, required: true, unique: true },
  },
  { timestamps: true }
);

const FAQCategory = mongoose.model(
  "FAQCategory",
  faqCategorySchema,
  "category"
);

export default FAQCategory;
