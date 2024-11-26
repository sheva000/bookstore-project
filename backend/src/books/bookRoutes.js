const express = require("express");
const Book = require("./bookModel");
const { postBook, getAllBooks, getSingleBook, updateBook, deleteBook } = require("./bookController");
const verifyAdmin = require("../middleware/verifyAdmin");
const router = express.Router();

//Book POST
router.post("/createbook", verifyAdmin, postBook)

//GET all books
router.get("/", getAllBooks)

//GET single book
router.get("/:id", getSingleBook)

//Update book
router.put("/update/:id", verifyAdmin, updateBook)

//Delete book
router.delete("/:id", verifyAdmin, deleteBook)


module.exports = router;
