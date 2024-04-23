import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import stockRoute from "./routes/stockRoute.js";
import productRoute from "./routes/productRoute.js";
import authRoute from "./routes/authRoute.js";
import livreurRoute from "./routes/livreurRoute.js";
import invoiceRoute from "./routes/invoiceRoute.js";
import clientRoute from "./routes/clientRoute.js";
import fournisseurRoute from "./routes/fournisseurRoute.js";
import livraisonRoute from "./routes/livraisonRoute.js";

dotenv.config();

//express app
const app = express();

//middleware
app.use(bodyParser.json());
app.use(cors());

const PORT = process.env.PORT || 7000;

//connect to db
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

//auth
app.use("/api/auth", authRoute);

//routes
app.use("/api/user", userRoute);
app.use("/api/stock", stockRoute);
app.use("/api/product", productRoute);
app.use("/api/invoice", invoiceRoute);
app.use("/api/client",clientRoute);
app.use("/api/fournisseur",fournisseurRoute);
app.use("/api/livraison",livraisonRoute);
app.use("/api/livreur", livreurRoute);

app.all("*", (req, res) => {
  res.status(404);
  //if (req.accepts("html")) {
  //res.sendFile(path.join(__dirname, "views", "404.html"));
  //}

  if (req.accepts("json")) {
    res.json({ message: "404 Not Found" });
  } else {
    res.type("txt").send("404 Not Found");
  }
});
