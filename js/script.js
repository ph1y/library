/* eslint-disable no-use-before-define */
const library = [];

const newBookBtn = document.querySelector(".new-book-btn");
const addBookDialog = document.querySelector(".add-book-modal");
const addBookForm = document.querySelector(".add-book-form");
const booksTableBody = document.querySelector(".books-table > .table-body");

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function createTableRow(bookValues, index) {
  const tableRow = document.createElement("tr");
  tableRow.dataset.bookIndex = index;

  const deleteBtnTableCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Remove";
  deleteBtn.addEventListener("click", removeBookFromLibrary);

  bookValues.forEach((value) => {
    const tableCell = document.createElement("td");
    const tableCellContent = document.createTextNode(value);
    tableRow.append(tableCell);
    tableCell.append(tableCellContent);
  });

  deleteBtnTableCell.append(deleteBtn);
  tableRow.append(deleteBtnTableCell);
  booksTableBody.append(tableRow);
}

function updateBooksTable() {
  booksTableBody.replaceChildren();

  library.forEach((book, index) => {
    const bookValues = Object.values(book);
    createTableRow(bookValues, index);
  });
}

function removeBookFromLibrary(event) {
  library.splice(event.target.parentNode.parentNode.dataset.bookIndex, 1);
  updateBooksTable();
}

function addBookToLibrary() {
  const author = document.querySelector("#author").value;
  const title = document.querySelector("#title").value;
  const pages = document.querySelector("#pages").value;
  const isRead = document.querySelector("#is-read").value;

  const book = new Book(author, title, pages, isRead);

  addBookForm.reset();

  if (Object.values(book).every((value) => value !== null && value !== "")) {
    library.push(book);
    updateBooksTable();
  } else {
    alert("Please fill out every form field.");
  }
}

newBookBtn.addEventListener("click", () => {
  addBookDialog.showModal();
});
addBookForm.addEventListener("submit", addBookToLibrary);
