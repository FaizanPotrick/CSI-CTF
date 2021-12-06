const express = require("express");
const mongoose = require("mongoose");
const app = express();
const path = require("path");
const Api =
  "mongodb+srv://FaizanPotrick:Faizan02@cluster0.rmvdc.mongodb.net/data?retryWrites=true&w=majority";

mongoose.connect(Api);

app.use(express.json());
app.use(require(path.join(__dirname, "routes/register.js")));
app.listen(8000);
