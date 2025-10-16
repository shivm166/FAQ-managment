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
app.use(helmet());
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Allowed frontend origins
const allowedOrigins = [
  "http://localhost:5173", // local frontend
  "http://127.0.0.1:5173", // Vite alternative localhost
  "https://faqmanagment.netlify.app", // deployed frontend on Netlify
];

// CORS configuration
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true); // allow Postman, curl, server-to-server
      if (allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new Error(`Not allowed by CORS: ${origin}`));
    },
    credentials: true,
  })
);

// Routes
app.use("/api/users", userRoutes);
app.use("/api/faqs", faqRoutes);

app.get("/", (req, res) => res.send("Home route"));

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: err.message });
});

// Start server
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
