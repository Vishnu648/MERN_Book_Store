import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";

import bookRoutes from "./routes/bookRoutes.js"

const port = PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home page");
});

app.use('/books',bookRoutes)

mongoose
  .connect(MONGODB_URL)
  .then(() => {
    app.listen(port, () => {
      console.log(`Running on http://localhost:${port}`);
    });
    console.log("Connected to DB");
  })
  .catch((error) => {
    console.log(error.message);
  });
