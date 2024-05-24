const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const Member = require("./memberModel");

const bookSchema = new mongoose.Schema({
  book_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
    required: [true, "Book Code is Required"],
  },
  title: {
    type: String,
    required: [true, "Book Title is Required"],
  },
  author: {
    type: String,
    required: [true, "Author from Book is Required"],
  },
  stock: {
    type: Number,
    required: [true, "Stock Count is Required"],
  },
  borrower: { type: mongoose.Schema.Types.ObjectId, ref: "Member" },
});

const Book = mongoose.model("Book", bookSchema);

module.exports = Book;
