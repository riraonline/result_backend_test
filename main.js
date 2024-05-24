const express = require("express");
const app = express();
const mongoose = require("mongoose");
const morgan = require("morgan");
const dotenv = require("dotenv");
const bcrypt = require("bcrypt");

const bookRoute = require("./routes/bookRoute");
const memberRoute = require("./routes/memberRoute");
const borrowRoute = require("./routes/borrowRoute");
const returnRoute = require("./routes/returnRoute");

dotenv.config();
const port = process.env.PORT;
const db = process.env.DB;

mongoose
  .connect(db)
  .then(() => {
    console.log("Server has connected with MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use(express.json());
app.use(morgan("dev"));

app.use("/api", bookRoute);
app.use("/api", memberRoute);
app.use("/api/borrow", borrowRoute);
app.use("/api/return", returnRoute);

app.listen(port, () => {
  console.log(`Server has running on http://localhost:${port}`);
});
