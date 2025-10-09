import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FAQCategory", // ✅ Must match model name
      required: true,
    },
    question: { type: String, required: true },
    answer: { type: String, required: true },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema, "FAQ");

export default FAQ;
