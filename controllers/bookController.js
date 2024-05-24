const Book = require("../models/bookModel");

const getBookData = async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {}
};

const createBookData = async (req, res) => {
  try {
    const { code, title, author, stock } = req.body;
    const newBooks = new Book({ code, title, author, stock });
    const saveBooks = await newBooks.save();
    res.status(201).json(saveBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateBookData = async (req, res) => {
  try {
    const book_id = req.params.uuid;
    const { code, title, author, stock } = req.body;

    const updateBook = await Book.findOneAndUpdate(
      { book_id: book_id },
      { code, title, author, stock },
      { new: true }
    );

    if (!updateBook) {
      return res.status(404).json({ error: "Buku tidak ditemukan" });
    }
    res.json(updateBook);
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

const deleteBookData = async (req, res) => {
  try {
    const book_id = req.params.id;
    const deleteBook = await Book.findOneAndDelete(book_id);

    if (!deleteBook) {
      return res.status(404).json({ error: "Buku tidak ditemukan" });
    }
    res.json({ message: "Buku berhasil dihapus" });
  } catch (err) {
    res.status(500).json({ error: err });
  }
};

module.exports = {
  getBookData,
  createBookData,
  updateBookData,
  deleteBookData,
};
