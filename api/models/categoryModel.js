import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    catg_name: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);
