import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    customerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", 
      required: true,
    },
    Date: {
      type: Date,
      default: Date.now,
      required: true,
    },
    products: [
      {
        productId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product", 
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
      }
    ],
    status: {
      type: String,
      enum: ["en attente", "en traitement", "expédié", "livré"],
      default:"en attente",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);
