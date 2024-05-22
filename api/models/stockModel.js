import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
  {
    id_supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
