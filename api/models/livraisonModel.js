import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product",
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    client_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client",
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    products: [productSchema],
    totalQuantity: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["Paid", "Unpaid", "Cancelled"],
      default: "Unpaid",
    },
    paymentMethod: {
      type: String,
      enum: ["In Store", "COD", "Online Payment"],
      default: "In Store",
    },
    sendNotif: {
      type: Boolean,
    },
    notes: {
      type: String,
    },
  },
  { _id: false }
);

const livraisonSchema = new mongoose.Schema(
  {
    id_livreur: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livreur",
      required: true,
    },
    orders: [orderSchema],
    delivery_date: {
      type: Date,
      required: true,
    },
    message: {
      type: String,
    },
    livraisonStatus: {
      type: String,
      enum: ["Pending", "In Transit", "Delivered", "Cancelled"],
      default: "Pending",
      required: true,
    },
    trackingInfo: {
      type: String,
    },
    deliveryAddress: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Livraison", livraisonSchema);
