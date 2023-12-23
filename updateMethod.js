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
