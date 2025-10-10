import express from "express";
import dotenv from "dotenv";
import database from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import cors from "cors";

dotenv.config();

database();
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.use("/api/users", userRoutes);
app.use("/api/faqs", faqRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
