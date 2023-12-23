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
