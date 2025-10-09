import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const MONGO_URL = process.env.MONGO_URL;

const database = async () => {
  if (!MONGO_URL) {
    console.error(
      " ERROR: MONGO_URL is not defined in the environment variables."
    );

    return;
  }

  try {
    await mongoose.connect(MONGO_URL);
    console.log(" Database connected successfully!");
  } catch (error) {
    console.error(" Database connection failed:", error.message);
    process.exit(1);
  }
};

export default database;
