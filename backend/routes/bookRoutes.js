import express from "express";
import {Book} from "../models/bookModel.js"

const router = express.Router();

//create a book
router.post("/", async (req, res) => {
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

//get all book
router.get("/", async (req, res) => {
  try {
    const books = await Book.find({});
    res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//get a book by id
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    res.status(200).send({
      book,
    });
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//update book
router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.author || !req.body.publishYear) {
      res.status(500).send({ message: "All Field is required" });
    }

    const { id } = req.params;

    const result = await Book.findByIdAndUpdate(id, req.body);
    if (!result) {
      res.status(404).json({ message: "Book not found" });
    } else {
      res.status(201).json({ message: "Book updated successfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//delete a book
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Book.findByIdAndDelete(id);

    if (!book) {
      res.status(500).json({ message: "Book not found" });
    } else {
      res.status(201).json({ message: "Book deleted successfully" });
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

export default router;