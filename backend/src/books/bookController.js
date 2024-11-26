const Book = require("./bookModel");

//POST book
const postBook = async (req, res) => {
    try {
      const newBook = await Book({ ...req.body });
      await newBook.save();
      res
        .status(200)
        .send({ message: "Book created successfully", book: newBook });
    } catch (error) {
      console.error("Error creating book", error);
      res
        .status(500)
        .send({ message: "Failed to create book" });
    }
  };

//GET all books
const getAllBooks = async(req,res) => {
    try {
        const books = await Book.find().sort({ createdAt: -1})
        res
        .status(200)
        .send(books);
    } catch (error) {
        console.error("Error fetching books", error);
        res
          .status(500)
          .send({ message: "Failed to fetch books" });  
    }
}

//GET single book
const getSingleBook = async(req, res) => {
    try {
        const {id} = req.params
        const book = await Book.findById(id)
        if(!book){
            return res.status(404).send({message: "Book not found"})
        }
        res
        .status(200)
        .send(book);
    } catch (error) {
        console.error("Error fetching book", error);
        res
          .status(500)
          .send({ message: "Failed to fetch book" });  
    }
}

//Update book
const updateBook = async(req, res) => {
    try {
        const {id} = req.params
        const updatedBook = await Book.findByIdAndUpdate(id, req.body, {new: true})
        if(!updatedBook){
            return res.status(404).send({message: "Book not found"})
        }
        res
        .status(200)
        .send({
            message: "Book updated successfully",
            Book: updatedBook
        });
    } catch (error) {
        console.error("Error updating book", error);
        res
          .status(500)
          .send({ message: "Failed to update book" });  
    }
}

//Delete book
const deleteBook = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedBook = await Book.findByIdAndDelete(id);

        if (!deletedBook) {
            return res.status(404).json({ message: "Book not found" });  // Return JSON
        }

        // Return a JSON response instead of plain text
        res.status(200).json({ message: "Book deleted successfully" });  // Send JSON
    } catch (error) {
        console.error("Error deleting book", error);
        res.status(500).json({ message: "Failed to delete book" });  // Return JSON for errors
    }
};

  module.exports = {
    postBook,
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook
  }