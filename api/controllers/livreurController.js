import Livreur from "../models/livreurModel.js";

export const create = async (req, res) => {
  try {
    const livreurData = new Livreur(req.body);
    if (!livreurData) {
      return res.status(404).json({ msg: "Livreur data not found" });
    }
    const savedData = await livreurData.save();
    //res.status(200).json(savedData);

    res.status(200).json({ msg: "Livreur created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const livreurData = await Livreur.find();

    if (!livreurData) {
      return res.status(404).json({ msg: "Livreur data not found" });
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
      return res.status(404).json({ msg: "Livreur not found" });
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
      return res.status(404).json({ msg: "Livreur not found" });
    }
    const Livreur = await Livreur.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Livreur updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteLivreur = async (req, res) => {
  try {
    const id = req.params.id;
    const livreurData = await Livreur.findById(id);

    if (!livreurData) {
      return res.status(404).json({ msg: "Livreur not found" });
    }
    const Livreur = await Livreur.findByIdAndDelete(id);

    res.status(200).json({ msg: "Livreur deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
