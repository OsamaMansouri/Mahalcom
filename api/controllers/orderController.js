import Order from "../models/orderModel.js";

// Create new order
export const create = async (req, res) => {
  try {
    const orderData = new Order(req.body);
    if (!orderData) {
      return res.status(404).json({ msg: "Order data not found" });
    }
    const savedData = await orderData.save();

    res.status(200).json({ msg: "Order created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// Get orders
export const getAll = async (req, res) => {
  try {
    const orderData = await Order.find();

    if (!orderData) {
      return res.status(404).json({ msg: "Order data not found" });
    }

    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

// Get order by ID
export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const orderData = await Order.findById(id);

    if (!orderData) {
      return res.status(404).json({ msg: "Order not found" });
    }

    res.status(200).json(orderData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// Update order
export const updateOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderData = await Order.findById(id);

    if (!orderData) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const order = await Order.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Order updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
// Delete order
export const deleteOrder = async (req, res) => {
  try {
    const id = req.params.id;
    const orderData = await Order.findById(id);

    if (!orderData) {
      return res.status(404).json({ msg: "Order not found" });
    }
    const order = await Order.findByIdAndDelete(id);

    res.status(200).json({ msg: "Order deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
