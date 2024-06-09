import Stock from "../models/stockModel.js";
import Product from "../models/productModel.js"; // Import your Product model

// Create new stock
export const create = async (req, res) => {
  try {
    const { id_supplier, products, name, warehouse, info } = req.body;

    const populatedProducts = await Promise.all(
      products.map(async (item) => {
        const product = await Product.findById(item.product_id);
        if (!product) {
          throw new Error(`Product with ID ${item.product_id} not found`);
        }
        return {
          product_id: product._id,
          name: product.name,
          price: product.price,
          image: product.image,
          quantity: item.quantity,
        };
      })
    );

    const stockData = new Stock({
      id_supplier,
      products: populatedProducts,
      name,
      warehouse,
      info,
    });

    await stockData.save();
    res
      .status(200)
      .json({ msg: "Stock created successfully", stock: stockData });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get all stocks
export const getAll = async (req, res) => {
  try {
    const stockData = await Stock.find().populate("id_supplier");
    if (!stockData) {
      return res.status(404).json({ msg: "No stock data found" });
    }
    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Get stock by ID
export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const stockData = await Stock.findById(id).populate("id_supplier");
    if (!stockData) {
      return res.status(404).json({ msg: "Stock not found" });
    }
    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update stock
export const updatestock = async (req, res) => {
  try {
    const id = req.params.id;
    const stockData = await Stock.findById(id);

    if (!stockData) {
      return res.status(404).json({ msg: "Stock not found" });
    }
    const updatedStock = await Stock.findByIdAndUpdate(id, req.body, {
      new: true,
    }).populate("id_supplier");
    res
      .status(200)
      .json({ msg: "Stock updated successfully", stock: updatedStock });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Delete stock
export const deletestock = async (req, res) => {
  try {
    const id = req.params.id;
    const stockData = await Stock.findById(id);

    if (!stockData) {
      return res.status(404).json({ msg: "Stock not found" });
    }
    await Stock.findByIdAndDelete(id);
    res.status(200).json({ msg: "Stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
