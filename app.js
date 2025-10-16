// app.js
import express from "express";
import dotenv from "dotenv";
import database from "./config/db.js";
import userRoutes from "./routes/userRoutes.js";
import faqRoutes from "./routes/faqRoutes.js";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

dotenv.config();

// Connect to MongoDB
database();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet()); // Security headers

// Logging (only in development)
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Allowed frontend origins
const allowedOrigins = [
  process.env.FRONTEND_PROD || "https://faq-managment.onrender.com",
  process.env.FRONTEND_LOCAL || "http://localhost:5173",
  "http://127.0.0.1:5173", // for Vite dev server
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like Postman)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.warn(`Blocked by CORS: ${origin}`);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true, // allow cookies
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/faqs", faqRoutes);

// Home route
app.get("/", (req, res) => {
  res.send("Home route..");
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
