import FAQ from "../models/FAQ.js";
import FAQCategory from "../models/faqCategory.js";

export const addCategory = async (req, res) => {
  const { name } = req.body;
  const exists = await FAQCategory.findOne({ name });
  if (exists)
    return res.status(400).json({ message: "Category already exists" });

  const category = await FAQCategory.create({ name });
  res.status(201).json(category);
};

export const addFAQ = async (req, res) => {
  try {
    const { question, answer, categoryId } = req.body;

    const category = await FAQCategory.findById(categoryId);
    if (!category) {
      return res.status(404).json({ message: "Category not found" });
    }

    const faq = await FAQ.create({
      question,
      answer,
      category: categoryId,
    });
    res.status(201).json({ message: "add sucesfully ", faq });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const listFAQs = async (req, res) => {
  try {
    const faqs = await FAQ.find().populate("category", "categoryName");
    res.status(200).json(faqs);
  } catch (error) {
    res.status(500).json({ message: error.message });
    console.log(error);
  }
};

export const listCategories = async (req, res) => {
  try {
    const categories = await FAQCategory.find();
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
