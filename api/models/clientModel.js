import mongoose from "mongoose";
const clientSchema = new mongoose.Schema(
  {
    fname: {
      type: String,
      required: true,
    },
    lname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    adresse: {
        type: String,
        required: true,
    },
    totalCommande: {
        type: Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Client", clientSchemaSchema);
