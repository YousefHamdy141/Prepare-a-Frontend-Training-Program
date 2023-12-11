const express = require("express");
const app = express();
app.use(express.json());

const todos = [];

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/todo", (req, res) => {
  res.send(todos);
});

//endPoint (Post)
app.post("/todo", (req, res) => {
  const list = req.body;
  const findUser = todos.find((x) => x.id == list.id);
  if (findUser) {
    res.status(400).send("already exists!");
    return;
  }
  todos.push(list);
  res.send("created!");
});

//endPoint (Delete)
app.delete("/todo/:id", (req, res) => {
  const { id } = req.params;
  const findUserIndex = todos.findIndex((x) => x.id == id);
  if (findUserIndex == -1) {
    res.send("Not found");
    return;
  }
  todos.splice(findUserIndex, 1);
  res.send("deleted");
});

app.listen(3000, () => {
  console.log("server run on port 3000");
});
