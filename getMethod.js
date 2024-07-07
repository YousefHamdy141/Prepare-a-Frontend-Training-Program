// Example GET method implementation:
async function getData(url = "") {
  // Default options are marked with *
  const response = await fetch(url);
  return response.json(); // parses JSON response into native JavaScript objects
}
getData("http://localhost:3000/todos").then((data) => {
  console.log(data);
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
