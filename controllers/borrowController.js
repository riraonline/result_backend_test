const Book = require("../models/bookModel");
const Member = require("../models/memberModel");

const borrowBook = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId);
    const book = await Book.findById(req.params.bookId);

    // Cek apakah member diblokir
    if (member.blockedUntil && member.blockedUntil > new Date()) {
      return res.status(403).json({ message: "Member sedang diblokir" });
    }

    // Cek apakah buku tersedia
    if (book.borrower) {
      return res.status(400).json({ message: "Buku sedang dipinjam" });
    }

    // Kurangi stok buku
    book.stock--;
    book.borrower = member._id;
    await book.save();

    // Tambahkan buku ke daftar buku yang dipinjam oleh member
    member.borrowedBooks.push({
      book: book._id,
      borrowDate: new Date(),
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 hari dari sekarang
    });
    await member.save();

    res.json({ message: "Buku berhasil dipinjam" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = borrowBook;
