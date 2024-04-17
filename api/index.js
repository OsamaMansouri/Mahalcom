import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/userRoute.js";
import authRoute from "./routes/authRoute.js";

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
