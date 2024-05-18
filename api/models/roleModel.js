import mongoose from "mongoose";

const roleSchema = new mongoose.Schema(
  {
    role_name: {
      type: String,
      required: true,
      enum: ["manager", "admin"], // restricts role_name to 'manager' or 'admin'
    },
  },
  { timestamps: true }
);

export default mongoose.model("Role", roleSchema);
