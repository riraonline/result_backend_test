const express = require("express");
const router = express.Router();
const returnController = require("../controllers/returnController");

router.put("/:memberId/:bookId", returnController);

module.exports = router;
