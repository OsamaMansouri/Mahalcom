import Stock from "../models/stockModel.js";

export const create = async (req, res) => {
  try {
    const stockData = new Stock(req.body);
    if (!stockData) {
      return res.status(404).json({ msg: "stock data not found" });
    }
    const savedData = await stockData.save(); 
    //res.status(200).json(savedData);

    res.status(200).json({ msg: "stock created successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getAll = async (req, res) => {
  try {
    const stockData = await Stock.find();

    if (!stockData) {
      return res.status(404).json({ msg: "stock data not found" });
    }

    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const getById = async (req, res) => {
  try {
    const id = req.params.id;
    const stockData = await Stock.findById(id);

    if (!stockData) {
      return res.status(404).json({ msg: "stock not found" });
    }

    res.status(200).json(stockData);
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const updatestock = async (req, res) => {
  try {
    const id = req.params.id;
    const stockData = await Stock.findById(id);

    if (!stockData) {
      return res.status(404).json({ msg: "stock not found" });
    }
    const stock = await Stock.findByIdAndUpdate(id, req.body, {
      new: true,
    });

    res.status(200).json({ msg: "stock updated successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};

export const deletestock = async (req, res) => {
  try {
    const id = req.params.id;
    const stockData = await Stock.findById(id);

    if (!stockData) {
      return res.status(404).json({ msg: "stock not found" });
    }
    const stock = await Stock.findByIdAndDelete(id);

    res.status(200).json({ msg: "stock deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error });
  }
};
