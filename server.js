const express = require("express");
const app = express();
app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Home");
});

app.get("/todos", (req, res) => {
  res.send(todos);
  const tryFetch = { myString: "I am working fetch" };
  res.json(tryFetch);
});

//endPoint (Post)
app.post("/todos", (req, res) => {
  todos.push(req.body);

  todos.forEach((item, index) => {
    item.id = index;
  });

  res.send(todos);
});

//endPoint (Delete)
app.delete("/todos/:id", (req, res) => {
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
