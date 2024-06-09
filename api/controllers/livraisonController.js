import Livraison from "../models/livraisonModel.js";
import Order from "../models/orderModel.js";
import Supplier from "../models/livreurModel.js";
import Product from "../models/productModel.js"; // Import the product model
import User from "../models/userModel.js"; // Import the product model

// Create a new livraison
export const create = async (req, res) => {
  try {
    const {
      id_user,
      orders,
      delivery_date,
      message,
      deliveryAddress,
      livraisonStatus,
    } = req.body;

    // Check if the livreur exists
    const supplier = await User.findById(id_user);
    if (!supplier) {
      return res.status(404).json({ message: "Supplier not found" });
    }

    // Populate orders with necessary information
    const populatedOrders = await Promise.all(
      orders.map(async (order) => {
        const orderData = await Order.findById(order.order_id).populate(
          "products.product_id"
        );
        if (!orderData) {
          throw new Error(`Order with ID ${order.order_id} not found`);
        }
        return orderData;
      })
    );

    const livraisonData = {
      id_user,
      orders: populatedOrders,
      delivery_date,
      message,
      livraisonStatus,
      deliveryAddress,
    };

    const livraison = new Livraison(livraisonData);
    const savedLivraison = await livraison.save();

    res.status(201).json(savedLivraison);
  } catch (error) {
    console.error("Error creating livraison:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all livraisons
export const getAll = async (req, res) => {
  try {
    const livraisons = await Livraison.find()
      .populate("id_user")
      .populate("orders.client_id orders.products.product_id");
    res.status(200).json(livraisons);
  } catch (error) {
    console.error("Error fetching livraisons:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get all Undelivered livraisons
export const getUndelivered = async (req, res) => {
  try {
    const livraisons = await Livraison.find({
      livraisonStatus: { $ne: "Delivered" },
    })
      .populate("id_user")
      .populate("orders.client_id orders.products.product_id");
    res.status(200).json(livraisons);
  } catch (error) {
    console.error("Error fetching livraisons:", error);
    res.status(500).json({ error: error.message });
  }
};

// Get a livraison by ID
export const getById = async (req, res) => {
  try {
    const { id } = req.params;
    const livraison = await Livraison.findById(id)
      .populate("id_user")
      .populate("orders.client_id orders.products.product_id");
    if (!livraison) {
      return res.status(404).json({ message: "Livraison not found" });
    }
    res.status(200).json(livraison);
  } catch (error) {
    console.error("Error fetching livraison:", error);
    res.status(500).json({ error: error.message });
  }
};

// Update a livraison
export const update = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      id_user,
      orders,
      delivery_date,
      message,
      livraisonStatus,
      deliveryAddress,
    } = req.body;

    const livraison = await Livraison.findById(id);
    if (!livraison) {
      return res.status(404).json({ message: "Livraison not found" });
    }

    if (id_user) livraison.id_user = id_user;
    if (orders) livraison.orders = orders;
    if (delivery_date) livraison.delivery_date = delivery_date;
    if (message) livraison.message = message;
    if (livraisonStatus) livraison.livraisonStatus = livraisonStatus;
    if (deliveryAddress) livraison.deliveryAddress = deliveryAddress;

    const updatedLivraison = await livraison.save();

    // Populate the orders with client and product details
    const populatedLivraison = await Livraison.findById(updatedLivraison._id)
      .populate("id_user")
      .populate("orders.client_id")
      .populate("orders.products.product_id");

    // Update product quantity if the status is "Delivered"
    if (livraisonStatus === "Delivered") {
      for (const order of populatedLivraison.orders) {
        for (const product of order.products) {
          const productDoc = await Product.findById(product.product_id._id);
          if (productDoc) {
            productDoc.quantity -= product.quantity;
            await productDoc.save();
          }
        }
      }
    }

    res.status(200).json(populatedLivraison);
  } catch (error) {
    console.error("Error updating livraison:", error);
    res.status(500).json({ error: error.message });
  }
};

// Delete a livraison
export const deleteLivraison = async (req, res) => {
  try {
    const { id } = req.params;
    const livraison = await Livraison.findByIdAndDelete(id);
    if (!livraison) {
      return res.status(404).json({ message: "Livraison not found" });
    }
    res.status(200).json({ message: "Livraison deleted successfully" });
  } catch (error) {
    console.error("Error deleting livraison:", error);
    res.status(500).json({ error: error.message });
  }
};
