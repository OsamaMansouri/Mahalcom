import mongoose from "mongoose";

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
    product_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", 
      required: true,
    },
    price: {
      type: Number,
      required: true,
        },
    status: {
      type: String,
      enum: ["Delivery","On store"],
      default:"On store",
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", orderSchema);