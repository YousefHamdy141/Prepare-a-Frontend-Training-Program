const express = require("express");
const app = express();
app.use(express.json());

const todos = [];

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/todo", (req, res) => {
  if (todos == 0) {
    res.status(401).send("No List founded");
    return;
  }
  res.send(todos);
});

app.post("/todo", (req, res) => {
  console.log(req.body);
  res.send("created!");
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});
