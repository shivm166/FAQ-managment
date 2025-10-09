import jwt from "jsonwebtoken";
import User from "../models/User.js"; // add .js if using ES Modules

const protect = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
      return res.status(401).json({ message: "Token not found" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    if (!decoded || !decoded.ID) {
      return res.status(401).json({ message: "Invalid token" });
    }

    const user = await User.findById(decoded.ID).select("-password");
    if (!user) {
      return res.status(403).json({ message: "Unauthorized access" });
    }

    req.user = user;
    next();
  } catch (error) {
    console.error("Auth Middleware Error:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

export default protect;
