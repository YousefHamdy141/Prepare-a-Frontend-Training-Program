let todos = [];
// Example POST method implementation:
async function postData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });
  return response.json();
}

// Example GET method implementation:
async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url);
  return response.json(); // parses JSON response into native JavaScript objects
}

getData("http://localhost:3000/todos").then((data) => {
  console.log(data);

  //////////////////////////////////////////////////////

  todos = data;
  let list = document.getElementById("myList");

  todos.forEach((item, index) => {
    let li = document.createElement("li");
    li.innerHTML =
      '<span class="close" onclick="deleteTodo(event,' +
      item.id +
      ')"> Delete </span> <span class="update"> Update </span> ' +
      item.title;
    list.append(li);
  });
});

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
        '<span class="close" onclick="deleteTodo(event,' +
        addedTodo.id +
        ')"> Delete </span>' +
        '<span class="update"> Update </span>' +
        todoTitle;
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
// select todo item
// remove select item

// const del = document.getElementById("myList");

// del.addEventListener("click", (event) => {
//   if ((event.target.className = "close")) {
//     event.target.parentElement.remove();
//   }
// });

// delete backend calling
async function deleteTodoXhr(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "DELETE", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },
    redirect: "follow", // manual, *follow, error
    referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
  });
  return response.json();
}

function deleteTodo(evt, id) {
  let e = evt;
  deleteTodoXhr("http://localhost:3000/todos/" + id).then(
    (data) => {
      e.target.parentElement.remove();
    },
    (err) => {
      alert("couldn't delete");
    }
  );
}

// create button
// onclick => select parent
// select the value of his parent
// update this value and return it
