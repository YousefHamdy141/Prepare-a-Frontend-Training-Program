let todos = [];
let editedTodo = {};
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
      '<span class="delete" onclick="deleteTodo(event,' +
      item.id +
      ')"> Delete </span> <span class="update" onclick="openModal(' +
      item.id +
      ')"> Update </span> ' +
      '<span id="list' +
      item.id +
      '">' +
      item.title +
      "</span>";
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

// Get the modal
var modal = document.getElementById("myModal");

// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal
function openModal(id) {
  editedTodo = todos.find((item) => {
    return item.id == id;
  });

  document.getElementById("editTitle").value = editedTodo.title;
  modal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
  modal.style.display = "none";
};

// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

async function updateData(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "PUT", // *GET, POST, PUT, DELETE, etc.
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

function updateTodo() {
  editedTodo.title = document.getElementById("editTitle").value;
  updateData("http://localhost:3000/todos", editedTodo).then(
    (data) => {
      document.getElementById("list" + editedTodo.id + "").innerText =
        document.getElementById("editTitle").value;

      modal.style.display = "none";
    },
    (err) => {
      alert("couldn't create");
    }
  );
}
/// Trigger Button Click on Enter (ADD) ///
let input = document.getElementById("todoTitle");
input.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("add").click();
  }
});

/// Trigger Button Click on Enter (EDIT) ///
let edit = document.getElementById("editTitle");
edit.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    document.getElementById("edit").click();
  }
});

/// Clear Value From Input///
const btn = document.getElementById("add");
btn.addEventListener("click", function handleClick(event) {
  // if you are submitting a form (prevents page reload)
  event.preventDefault();

  const input = document.getElementById("todoTitle");

  // clear input field
  input.value = "";
});

// create button
// onclick => select parent
// select the value of his parent
// update this value and return it
