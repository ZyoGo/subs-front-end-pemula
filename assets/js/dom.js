import Book from './book.js';

const STORAGE_KEY = 'BOOKSHELF';

let bookShelf =
  localStorage.getItem(STORAGE_KEY) == undefined
    ? []
    : JSON.parse(localStorage.getItem(STORAGE_KEY));

export function isStorageExist() {
  if (typeof Storage === undefined) {
    alert("Your browser doesn't support Web Storage API");
    return false;
  }

  return true;
}

export function append(book) {
  let bookshelfContainer;

  if (book.isComplete) {
    bookshelfContainer = document.querySelector('#list-finished-book');
  } else {
    bookshelfContainer = document.querySelector('#list-reading-book');
  }

  const componentBook = book.createComponent();
  bookshelfContainer.appendChild(componentBook);
}

export function addBook(book) {
  append(book);

  bookShelf.push({
    id: book.id,
    title: book.title,
    author: book.author,
    year: book.year,
    isComplete: book.isComplete,
  });
}

export function save() {
  const booksParsed = JSON.stringify(bookShelf);
  localStorage.setItem(STORAGE_KEY, booksParsed);
  document.dispatchEvent(new Event('onDataSaved'));
}

export function load() {
  clearBookshelf();

  bookShelf.forEach((books) => {
    const book = new Book(books.id, books.title, books.author, books.year, books.isComplete);

    append(book);
  });

  document.dispatchEvent(new Event('onDataLoaded'));
}

export function update() {
  if (isStorageExist()) {
    save();
  }
}

export function deleteItem(id) {
  const indexRemoveBook = findIndex(id);
  bookShelf.splice(indexRemoveBook, 1);
  remove(id);
}

export function remove(id) {
  const removeBook = document.getElementById(`${id}`);
  removeBook.remove();
}

export function markFinished(id) {
  const books = find(id);
  books.isComplete = true;

  const book = new Book(books.id, books.title, books.author, books.year, books.isComplete);

  append(book);
  remove(id);
  update();
}

export function markUnfinished(id) {
  const books = find(id);
  books.isComplete = false;

  const book = new Book(books.id, books.title, books.author, books.year, books.isComplete);

  deleteItem(id);
  addBook(book);
  update();
}

export function searchBook(title) {
  const resultBook = bookShelf.filter((book) => {
    if (book.title.includes(title)) {
      return book;
    }
  });

  clearBookshelf();

  for (const item of resultBook) {
    const book = new Book(item.id, item.title, item.author, item.year, item.isComplete);

    append(book);
  }
}

export function clearBookshelf() {
  document.querySelector('#list-reading-book').innerHTML = '';
  document.querySelector('#list-finished-book').innerHTML = '';
}

export function find(id) {
  let book = undefined;

  for (const item of bookShelf) {
    if (item.id === parseInt(id)) {
      book = item;
    }
  }

  return book;
}

export function findIndex(id) {
  let index = 0;

  for (const item of bookShelf) {
    if (item.id === id) {
      return index;
    }
    index++;
  }

  return -1;
}
