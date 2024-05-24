const mongoose = require("mongoose");
const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcrypt");
const Book = require("./bookModel");

const memberSchema = new mongoose.Schema({
  member_id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  code: {
    type: String,
    unique: true,
    required: [true, "Member Code is Required"],
  },
  name: {
    type: String,
    required: [true, "Member Name is Required"],
  },
  password: {
    type: String,
    required: [true, "Member Password is Required"],
  },
  borrowedBooks: [
    {
      book: { type: mongoose.Schema.Types.ObjectId, ref: "Book" },
      borrowDate: Date,
      dueDate: Date,
      returned: { type: Boolean, default: false },
    },
  ],
  blockedUntil: Date,
});

memberSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
  next();
});

const Member = mongoose.model("Member", memberSchema);

module.exports = Member;
