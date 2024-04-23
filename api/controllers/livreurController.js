import Livreur from "../models/livreurModel.js";

export const create = async (req, res) => {
  try {
    const livreurData = new Livreur(req.body);
    if (!livreurData) {
      return res.status(404).json({ msg: "Données du livreur non trouvées" });
    }
    const savedData = await livreurData.save();
    //res.status(200).json(savedData);

    res.status(200).json({ msg: "Livreur créé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const livreurData = await Livreur.find();

    if (!livreurData) {
      return res.status(404).json({ msg: "Données du livreur non trouvées" });
    }

    res.status(200).json(livreurData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const livreurData = await Livreur.findById(id);

    if (!livreurData) {
      return res.status(404).json({ msg: "Livreur non trouvé" });
    }

    res.status(200).json(livreurData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateLivreur = async (req, res) => {
  try {
    const id = req.params.id;
    const livreurData = await Livreur.findById(id);

    if (!livreurData) {
      return res.status(404).json({ msg: "Livreur non trouvé" });
    }
    const Livreur = await Livreur.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Livreur mis à jour avec succès" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteLivreur = async (req, res) => {
  try {
    const id = req.params.id;
    const livreurData = await Livreur.findById(id);

    if (!livreurData) {
      return res.status(404).json({ msg: "Livreur non trouvé" });
    }
    const Livreur = await Livreur.findByIdAndDelete(id);

    res.status(200).json({ msg: "Livreur supprimé avec succès" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
