function handleSubmit(e) {
  e.preventDefault();
  addItem(document.querySelector("#item-form-text").value);
}

document.querySelector("#item-form").addEventListener("submit", handleSubmit);

function addItem(itemName) {
  // Add item to list
  let newLi = document.createElement("li");
  newLi.textContent = itemName;
  newLi.classList.add("list-item");
  let newLiID = itemName.replace(/ /g, "-");
  newLiID = `${newLiID}-list-item`;
  newLi.id = newLiID;

  // Avoid adding duplicate items
  if (document.querySelector(`#${newLiID}`)) {
    return;
  }
  document.querySelector("#list-container").appendChild(newLi);
  document.querySelector("#item-form-text").value = "";

  // Add delete button next to newly added item
  let newDeleteButton = document.createElement("button");
  newDeleteButton.textContent = "X";
  newDeleteButton.classList.add("delete-button");
  newDeleteButton.onclick = function() {
    document.querySelector(`#${newLiID}`).remove();
  };
  document.querySelector(`#${newLiID}`).prepend(newDeleteButton);
}

function addItems() {
  fetch("https://jsonplaceholder.typicode.com/todos")
    .then(response => response.json())
    .then(response => {
      response.forEach(item => addItem(item.title));
    });
}

function handleSearch(e) {
  search(e.target.value);
}

document.querySelector("#search-bar").addEventListener("input", handleSearch);

function search(searchName) {
  let searchNameLowCase = searchName.toLowerCase();

  // Loop through list and hide items that aren't included in searchNameLowCase
  document
    .querySelector("#list-container")
    .childNodes.forEach(function(listItem) {
      let listItemID = listItem.id.toLowerCase();
      listItemID = listItemID.replace(/-/g, " ");
      if (listItemID.includes(searchNameLowCase)) {
        listItem.style.display = "list-item";
      } else {
        listItem.style.display = "none";
      }
    });
}

function deleteAllItems() {
  let itemsToRemove = [];
  document.querySelector("#list-container").childNodes.forEach(function(item) {
    itemsToRemove.push(item);
  });
  itemsToRemove.forEach(function(item) {
    item.remove();
  });
}
