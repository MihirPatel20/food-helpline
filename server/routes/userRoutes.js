import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Restaurant, NGO, DeliveryAgent } from "../models/User.js";

const router = express.Router();

// Middleware for authentication
const auth = async (req, res, next) => {
  try {
    const token = req.header("Authorization").replace("Bearer ", "");
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ _id: decoded._id });

    if (!user) {
      throw new Error();
    }

    req.token = token;
    req.user = user;
    next();
  } catch (error) {
    res.status(401).send({ error: "Please authenticate." });
  }
};

// Register user
router.post("/register", async (req, res) => {
  try {
    const { userType, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "Email already registered" });
    }

    // Hash password before creating user
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create user with hashed password
    let user;
    const userData = {
      ...req.body,
      password: hashedPassword,
    };

    switch (userType) {
      case "restaurant":
        user = new Restaurant(userData);
        break;
      case "ngo":
        user = new NGO(userData);
        break;
      case "delivery_agent":
        user = new DeliveryAgent(userData);
        break;
      default:
        user = new User(userData);
    }

    await user.save();
    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
    );
    res.status(201).json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Login user
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: "Invalid login credentials" });
    }

    const token = jwt.sign(
      { _id: user._id.toString() },
      process.env.JWT_SECRET
    );
    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Get user profile
router.get("/profile", auth, async (req, res) => {
  try {
    res.json(req.user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update user profile
router.patch("/profile", auth, async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = [
    "name",
    "phone",
    "password",
    "location",
    "operatingHours",
  ];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).json({ error: "Invalid updates" });
  }

  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Delete user account
router.delete("/profile", auth, async (req, res) => {
  try {
    await req.user.remove();
    res.json({ message: "Account deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Get all users (admin only)
router.get("/users", auth, async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const users = await User.find({});
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

// Update user status (admin only)
router.patch("/users/:id/status", auth, async (req, res) => {
  try {
    if (req.user.userType !== "admin") {
      return res.status(403).json({ error: "Access denied" });
    }

    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    user.status = req.body.status;
    await user.save();
    res.json(user);
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: error.message });
  }
});

// Add to userRoutes.js
router.post("/forgot-password", async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    const resetToken = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    // Send reset email with token
    // Implementation depends on your email service

    res.json({ message: "Password reset instructions sent to email" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

router.post("/reset-password", async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded._id);

    if (!user) {
      return res.status(404).json({ error: "Invalid reset token" });
    }

    user.password = newPassword;
    await user.save();

    res.json({ message: "Password reset successful" });
  } catch (error) {
    console.error(error);
    res.status(400).json({ error: "Invalid or expired reset token" });
  }
});

export default router;
