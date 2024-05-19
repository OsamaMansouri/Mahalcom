import User from "../models/userModel.js";
import Role from "../models/roleModel.js";

import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { fname, lname, email, password, id_role } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ msg: "User already exists" });
    }

    // Validate the role ID
    const role = await Role.findById(id_role);
    if (!role) {
      return res.status(400).json({ msg: "Invalid role ID" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const newUser = new User({
      fname,
      lname,
      email,
      password: hashedPassword,
      id_role,
    });
    await newUser.save();

    res.status(201).json({ msg: "User registered successfully" });
  } catch (error) {
    console.error("Error registering user:", error); // Debugging statement
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Check passsword
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    // Send a response to indicate successful logout
    res.status(200).json({ msg: "Logout successful" });
  } catch (error) {
    // Handle errors
    res.status(500).json({ error: error.message });
  }
};

export const getUserDetails = async (req, res) => {
  try {
    const token = req.headers.authorization;

    // Ensure the token is provided
    if (!token) {
      return res.status(401).json({ msg: "Authorization token is missing" });
    }

    // Verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Find the user by ID and populate the role
    const user = await User.findById(decoded.id).populate(
      "id_role",
      "role_name"
    );

    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({ error: error.message });
  }
};
