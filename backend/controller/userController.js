import { User } from "../model/User.profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { fullName, email, password, phoneNumber, role } = req.body;

    // 1️⃣ Validation
    if (!fullName || !email || !password || !phoneNumber || !role) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }

    console.log(fullName, email, password, phoneNumber, role);

    // 2️⃣ Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists, please login",
      });
    }

    // 3️⃣ Check password match
    // if (password !== confirmPassword) {
    //   return res.status(400).json({
    //     success: false,
    //     message: "Password and Confirm Password do not match",
    //   });
    // }

    // 4️⃣ Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // 5️⃣ Create user
    const newUser = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      role,
    });

    console.log("newUser", newUser);

    // 6️⃣ Success response
    return res.status(201).json({
      success: true,
      message: "User created successfully",
      user: newUser,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;

    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ success: false, message: "All fields are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User not found" });
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Incorrect password" });
    }

    if (role.toLowerCase() !== user.role.toLowerCase()) {
      return res
        .status(400)
        .json({ success: false, message: "Role does not match" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.SECRETKEY, {
      expiresIn: "1d",
    });

    const isProduction = process.env.NODE_ENV === "production";
    return res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        secure: isProduction, // must be true for cross-origin (Render)
        sameSite: isProduction ? "none" : "lax", // must be 'none' for cross-origin
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({ message: `Welcome back ${user.fullName}`, userData: user, token });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export const logout = async (req, res) => {
  try {
    const isProduction = process.env.NODE_ENV === "production";
    return res
      .status(200)
      .cookie("token", "", {
        maxAge: 0,
        httpOnly: true,
        secure: isProduction,
        sameSite: isProduction ? "none" : "lax",
      })
      .json({
        message: "Logged out successfully",
        success: true,
      });
  } catch (error) {
    console.log(error);
    return res.status(401).json({
      success: false,
      message: "Logout not found",
    });
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Current User Get",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

