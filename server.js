const express = require("express");
const app = express();
app.use(express.json());

let todos = [];

app.get("/", (req, res) => {
  res.send("Home");
});

//endPoint (Get)
app.get("/todos", (req, res) => {
  res.send(todos);
  // const tryFetch = { myString: "I am working fetch" };
  // res.json(tryFetch);
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
    res.send({
      status: "Not found",
    });
    return;
  }
  todos.splice(findUserIndex, 1);
  res.send({
    status: "deleted",
  });
});

function editTodo(todo) {
  let foundTodo = todos.find((item) => {
    return item.id == todo.id;
  });
  todos.forEach((elm) => {
    if (elm.id == foundTodo.id) {
      elm.title = todo.title;
    }
  });
}

app.put("/todos", (req, res) => {
  let todo = req.body;
  if (todo) {
    editTodo(todo);
    res.send({
      status: "updated",
      todos: todos,
    });
  } else {
    res.status(400).send({
      status: "faild",
    });
  }
});

app.listen(3000, () => {
  console.log(" server run on port 3000");
});
