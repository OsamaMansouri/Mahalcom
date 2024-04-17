import User from "../models/userModel.js";

export const create = async (req, res) => {
  try {
    const userData = new User(req.body);
    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
    }
    const savedData = await userData.save();
    //res.status(200).json(savedData);

    res.status(200).json({ msg: "User created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const userData = await User.find();

    if (!userData) {
      return res.status(404).json({ msg: "User data not found" });
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
      return res.status(404).json({ msg: "User not found" });
    }

    res.status(200).json(userData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }
    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "User updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteUser = async (req, res) => {
  try {
    const id = req.params.id;
    const userData = await User.findById(id);

    if (!userData) {
      return res.status(404).json({ msg: "User not found" });
    }
    const user = await User.findByIdAndDelete(id);

    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
