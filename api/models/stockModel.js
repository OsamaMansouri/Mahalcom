import mongoose from "mongoose";
const stockSchema = new mongoose.Schema(
  {
    idStock: {
      type: Number,
    },
    idFournisseur: {
      type: Number,
    },
    quantite: {
      type: String,
    },
    categorie: {
      type: String,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Stock", stockSchema);
