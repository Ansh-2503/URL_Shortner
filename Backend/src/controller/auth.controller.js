import userModel from "../models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existUser = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (existUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    const hash = await bcrypt.hash(password, 10);

    await userModel.create({ username, email, password: hash });

    res.json({ msg: "Registered successfully" });
  } catch (error) {
    console.log("ERROR in authController register function", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;

    const user = await userModel.findOne({
      $or: [{ email: identifier }, { username: identifier }],
    });

    if (!user) return res.status(400).json({ msg: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: "Invalid password" });

    const token = jwt.sign(
      { id: user._id, username: user.username },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    res.json({
      token,
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    console.log("ERROR in authController login function", error);
    res.status(500).json({ msg: "Server error: " + error.message });
  }
};
