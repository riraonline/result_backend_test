const Book = require("../models/bookModel");
const Member = require("../models/memberModel");

const returnBook = async (req, res) => {
  try {
    const member = await Member.findById(req.params.memberId);
    const book = await Book.findById(req.params.bookId);

    // Cari data peminjaman buku
    const borrowedBookIndex = member.borrowedBooks.findIndex(
      (item) => item.book.toString() === book._id.toString()
    );

    if (borrowedBookIndex === -1) {
      return res
        .status(400)
        .json({ message: "Buku tidak sedang dipinjam oleh member ini" });
    }

    if (!book) {
      return res.status(404).json({ message: "Buku tidak ditemukan" });
    }

    if (!book.borrower) {
      return res.status(400).json({ message: "Buku belum dipinjam" });
    }

    // Update status peminjaman dan stok buku
    member.borrowedBooks[borrowedBookIndex].returned = true;
    book.stock++;
    book.borrower = null; // Hapus data peminjam dari buku

    // Cek keterlambatan
    const dueDate = member.borrowedBooks[borrowedBookIndex].dueDate;
    const returnDate = new Date();
    const lateDays = Math.ceil((returnDate - dueDate) / (1000 * 60 * 60 * 24));

    if (lateDays > 0) {
      // Blokir member jika terlambat lebih dari 7 hari
      const blockedUntil = new Date(Date.now() + 3 * 24 * 60 * 60 * 1000); // 3 hari dari sekarang
      member.blockedUntil = blockedUntil;
      console.log(`Member ${member.name} diblokir hingga ${blockedUntil}`);
    }

    await member.save();
    await book.save();

    res.json({ message: "Buku berhasil dikembalikan" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = returnBook;
