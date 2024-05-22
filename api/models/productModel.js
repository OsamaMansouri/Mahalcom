import mongoose from "mongoose";
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    description: {
      type: String,
    },
    brand: {
      type: String,
    },
    id_catg: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    price: {
      type: Number,
    },
    quantity: {
      type: Number,
    },
    id_stock: {
      type: mongoose.Schema.Types.ObjectId,
      default: "664e4d941c7063fe3860ebf8",
    },
    inStock: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
