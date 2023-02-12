const library = [];

const addBookForm = document.querySelector(".books-form");
const booksTableBody = document.querySelector(".books-table > .table-body");

function Book(author, title, pages, isRead) {
  this.author = author;
  this.title = title;
  this.pages = pages;
  this.isRead = isRead;
}

function createTableRow(bookValues) {
  const tableRow = document.createElement("tr");
  const deleteBtnTableCell = document.createElement("td");
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Delete";

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

  library.forEach((book) => {
    const bookValues = Object.values(book);
    createTableRow(bookValues);
  });
}

function addBookToLibrary(event) {
  event.preventDefault();

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

addBookForm.addEventListener("submit", addBookToLibrary);
