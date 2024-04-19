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
    categorie: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    expiryDate: {
      type: Date,
    },
    stockId: {
      type: mongoose.Schema.Types.ObjectId,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Product", productSchema);
