import mongoose from "mongoose";
const livraisonSchema = new mongoose.Schema(
  {
    IdCommomde:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Commonde" 
    },
    StatutLivraison: {
      type: String,
    },
    AdresseLivraison: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Client" 
    },
    IdLivreur :{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Livreur" 
    },
    DateLivraison :{
        type : Date,
    },
    FraisLivraison :{
        type : Number,
    },
  },
  { timestamps: true }
);

export default mongoose.model("livraison", livraisonSchema);
