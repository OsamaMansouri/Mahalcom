import Category from "../models/categoryModel.js";

export const create = async (req, res) => {
  try {
    const { catg_name } = req.body;

    if (!catg_name) {
      return res.status(400).json({ msg: "Category name is required" });
    }

    const newCatg = new Category({ catg_name });
    await newCatg.save();

    res.status(201).json({ msg: "Category created successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const catgData = await Category.find();

    if (!catgData) {
      return res.status(404).json({ msg: "Category data not found" });
    }

    res.status(200).json(catgData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const catgData = await Category.findById(id);

    if (!catgData) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json(catgData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updatecatg = async (req, res) => {
  try {
    const id = req.params.id;
    const { catg_name } = req.body;

    const catg = await Category.findByIdAndUpdate(
      id,
      { catg_name },
      { new: true }
    );

    if (!catg) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json({ msg: "Category updated successfully", data: catg });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const deletecatg = async (req, res) => {
  try {
    const id = req.params.id;
    const catg = await Category.findByIdAndDelete(id);

    if (!catg) {
      return res.status(404).json({ msg: "Category not found" });
    }

    res.status(200).json({ msg: "Category deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
