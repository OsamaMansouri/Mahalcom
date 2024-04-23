import User from "../models/fournisseurModel.js";

export const create = async (req, res) => {
  try {
    const fournisseurData = new Fournissuer(req.body);
    if (!fournisseurData) {
      return res.status(404).json({ msg: "Fournisseur data not found" });
    }
    const savedData = await fournisseurData.save();

    res.status(200).json({ msg: "Fournisseur created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const fournisseurData = await Fournissuer.find();

    if (!fournisseurData) {
      return res.status(404).json({ msg: "Fournisseur data not found" });
    }

    res.status(200).json(fournisseurData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const fournisseurData = await Fournissuer.findById(id);

    if (!fournisseurData) {
      return res.status(404).json({ msg: "Fournisseur not found" });
    }

    res.status(200).json(fournisseurData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updateFournisseur = async (req, res) => {
  try {
    const id = req.params.id;
    const fournisseurData = await Fournissuer.findById(id);

    if (!fournisseurData) {
      return res.status(404).json({ msg: "Fournisseur not found" });
    }
    const fournisseur = await Fournissuer.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "Fournisseur updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deleteFournisseur = async (req, res) => {
  try {
    const id = req.params.id;
    const fournisseurData = await Fournissuer.findById(id);

    if (!fournisseurData) {
      return res.status(404).json({ msg: "Fournisseur not found" });
    }
    const fournisseur = await Fournissuer.findByIdAndDelete(id);

    res.status(200).json({ msg: "Fournisseur deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
