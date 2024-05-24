const express = require("express");
const router = express.Router();
const borrowController = require("../controllers/borrowController");

router.post("/:memberId/:bookId", borrowController);

module.exports = router;
