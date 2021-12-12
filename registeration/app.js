require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const app = express();
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const Api = process.env.API;
const port = process.env.PORT || 8000;
mongoose.connect(Api, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname,"./client/build")));
app.use(require(path.join(__dirname, "routes/user.js")));
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
});
app.listen(port, () => {
  console.log("Server is Listening on the Port...");
});
