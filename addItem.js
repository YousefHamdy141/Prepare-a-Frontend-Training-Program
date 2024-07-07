function addTodo() {
  let todoTitle = document.getElementById("todoTitle").value;
  let addedTodo = {
    title: todoTitle,
  };
  postData("http://localhost:3000/todos", addedTodo).then(
    (data) => {
      addedTodo.id = todos.length;
      console.log(data);
      // document.getElementById("todoTitle").value = "";
      let list = document.getElementById("myList");
      let li = document.createElement("li");
      li.innerHTML =
        '<span class="delete" onclick="deleteTodo(event,' +
        addedTodo.id +
        ')"> Delete </span>' +
        '<span class="update" onclick="openModal(' +
        addedTodo.id +
        ')"> Update </span>' +
        '<span id="list' +
        addedTodo.id +
        '">' +
        addedTodo.title +
        "</span>";
      list.append(li);
      todos.push({
        title: todoTitle,
        id: addedTodo.id,
      });
      console.log(todos);
    },
    (err) => {
      alert("couldn't create");
    }
  );
}
