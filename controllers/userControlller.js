import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

export const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.status(400).json({ message: "Please enter All field." });
    }
    const existing = await User.findOne({ email });
    if (existing)
      return res.status(400).json({ message: "User already exists" });

    const hashed = await bcrypt.hash(password, 10);
    const user = await User.create({ fullname, email, password: hashed });
    res.status(201).json({ message: "user register ..", user });
  } catch (error) {
    res.status(500).json({ message: "server error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Please enter both email and password." });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    const isPass = await bcrypt.compare(password, user.password);
    if (!isPass) {
      return res.status(401).json({ message: "Invalid email or password." });
    }

    // 4. Generate JWT
    const token = jwt.sign(
      { ID: user._id, NAME: user.name },
      process.env.JWT_SECRET || "YOUR_SECRET_KEY", // Use actual secret from env
      { expiresIn: "1h" }
    );

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
      maxAge: 60 * 60 * 1000,
    });
    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ message: "An unexpected error occurred during login." });
  }
};

export const changePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.user);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (user.passwordChangeCount >= 3) {
      return res.status(403).json({
        message:
          "You have reached the maximum limit of password changes (3 times).",
      });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Incorrect old password" });

    user.password = await bcrypt.hash(newPassword, 10);
    user.passwordChangeCount += 1;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (error) {
    res.status(401).json({ message: "Invalid credentials" });
  }
};
