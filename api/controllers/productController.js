import Product from "../models/productModel.js";

export const create = async (req, res) => {
  try {
    const productData = { ...req.body, image: req.file.path };
    const product = new Product(productData);
    const savedProduct = await product.save();
    const populatedProduct = await Product.findById(savedProduct._id).populate(
      "id_catg"
    );
    res.status(201).json(populatedProduct);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getAll = async (req, res) => {
  try {
    const productData = await Product.find().populate("id_catg");
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
    const productData = { ...req.body };
    if (req.file) {
      productData.image = req.file.path;
    }
    const product = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    }).populate("id_catg");

    if (!product) {
      return res.status(404).json({ msg: "Product not found" });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
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
