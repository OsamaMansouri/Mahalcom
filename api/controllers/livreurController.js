import User from "../models/userModel.js";
import Role from "../models/roleModel.js"; // Import Role if needed for role checks

export const create = async (req, res) => {
  try {
    // Find the role with the name "Livreur"
    const role = await Role.findOne({ role_name: "Livreur" });

    if (!role) {
      return res.status(400).json({ msg: "Invalid role for livreur" });
    }

    const { fname, lname, email, password } = req.body;

    // Create a new user with the role's ID
    const newUser = new User({
      fname,
      lname,
      email,
      password,
      id_role: role._id, // Assign the role's ID to id_role
    });

    const savedUser = await newUser.save();
    res.status(201).json(savedUser); // Return the full user data
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    // Add a condition to fetch only users with the "Livreur" role
    const livreurRole = await Role.findOne({ role_name: "Livreur" });
    const userData = await User.find({ id_role: livreurRole._id });

    if (!userData) {
      return res.status(404).json({ msg: "Livreur data not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ msg: "Livreur not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateLivreur = async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return res.status(404).json({ msg: "Livreur not found" });
    }
    res.json(updatedUser);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteLivreur = async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return res.status(404).json({ msg: "Livreur not found" });
    }
    res.json({ msg: "Livreur deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
