import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
  {
    idFournisseur: {
      type: Number,
    },
    quantite: {
      type: Number,
    },
    categorie: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
