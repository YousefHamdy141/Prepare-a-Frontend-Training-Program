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

// delete frontend
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

// const del = document.getElementById("myList");
// del.addEventListener("click", (event) => {
//   if ((event.target.className = "close")) {
//     event.target.parentElement.remove();
//   }
// });
