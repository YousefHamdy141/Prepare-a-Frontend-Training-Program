const express = require("express");
const app = express();

app.get("/", (req, res) => {
  res.send("welcome");
});

app.get("/todo", (req, res) => {
  res.send("helloooo world!");
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});
