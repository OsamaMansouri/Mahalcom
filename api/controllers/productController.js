import Product from "../models/productModel.js";

export const create = async (req, res) => {
  try {
    const productData = new Product(req.body);
    if (!productData) {
      return res.status(404).json({ msg: "Product data not found" });
    }
    const savedData = await productData.save();
    //res.status(200).json(savedData);

    res.status(200).json({ msg: "Product created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const productData = await Product.find();

    if (!productData) {
      return res.status(404).json({ msg: "Product data not found" });
    }

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Product.findById(id);

    if (!productData) {
      return res.status(404).json({ msg: "Product not found" });
    }

    res.status(200).json(productData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Product.findById(id);

    if (!productData) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const product = await Product.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Product updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    const productData = await Product.findById(id);

    if (!productData) {
      return res.status(404).json({ msg: "Product not found" });
    }
    const product = await Product.findByIdAndDelete(id);

    res.status(200).json({ msg: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
