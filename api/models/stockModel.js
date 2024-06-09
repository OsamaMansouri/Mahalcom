import mongoose, { Schema } from "mongoose";

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

const stockSchema = new mongoose.Schema(
  {
    id_supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
    products: [productSchema],
    name: {
      type: String,
      required: true,
    },
    warehouse: {
      type: String,
      required: true,
    },
    info: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
