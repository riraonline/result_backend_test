const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

router.get("/books", bookController.getBookData);
router.post("/books", bookController.createBookData);
router.put("/books/:uuid", bookController.updateBookData);
router.delete("/books/:id", bookController.deleteBookData);

module.exports = router;
