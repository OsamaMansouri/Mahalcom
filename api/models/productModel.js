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
    image: {
      type: String,
      required: true,
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
      ref: "Stock",
      required: true,
    },
    inStock: {
      type: Boolean,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
