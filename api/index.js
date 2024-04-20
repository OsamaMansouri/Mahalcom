import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import stockRoute from "./routes/stockRoute.js";
import productRoute from "./routes/productRoute.js";
import orderRoute from "./routes/orderRoute.js";
import authRoute from "./routes/authRoute.js";
dotenv.config(); 

// Express app
const app = express();

// Middleware 
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

// Connect to MongoDB
const URL = process.env.MONGOURL;
mongoose
  .connect(URL)
  .then(() => {
    console.log("DB connected successfully");
    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT} `);
    });
  })
  .catch((error) => console.log(error));

// Authentication routes
app.use("/api/auth", authRoute);

// User routes
app.use("/api/user", userRoute);
app.use("/api/stock", stockRoute);
app.use("/api/product", productRoute);
app.use("/api/invoice", invoiceRoute);

//routes
app.use("/api/livreur", livreurRoute);

// Order routes
app.use("/api/order", orderRoute);

// Error handling middleware
app.all("*", (req, res) => {
  res.status(404);
  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
