import express from "express";
import { PORT, MONGODB_URL } from "./config.js";
import mongoose from "mongoose";
import Book from "./models/bookModel.js";

const port = PORT || 3000;
const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("home page");
});

app.post("/books", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(500).send({ message: "All Field is required" });
    }

    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };

    const book = await Book.create(newBook);

    return res.status(201).send(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send(error.message);
  }
});

app.get("/books", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
        count:books.length,
        data:books
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

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
