import mongoose from "mongoose";

const faqSchema = new mongoose.Schema(
  {
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "FAQCategory",
      required: true,
    },
    question: {
      type: String,
      required: true,
      trim: true,
    },
    answer: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

const FAQ = mongoose.model("FAQ", faqSchema, "FAQ");
export default FAQ;
