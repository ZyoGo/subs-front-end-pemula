// gambar.addEventListener('click', function (event) {
//     event.target.parentElement.remove();
//   });
import Book from './book.js';
import * as BookShelf from './dom.js';

document.addEventListener('DOMContentLoaded', function () {
  const inputBookForm = document.getElementById('form');
  const searchBook = document.getElementById('search-button');

  if (BookShelf.isStorageExist()) {
    BookShelf.load();
  }

  searchBook.addEventListener('click', function (event) {
    event.preventDefault();
    const searchBookByTitle = document.getElementById('search-book');
    BookShelf.searchBook(searchBookByTitle.value);
  });

  inputBookForm.addEventListener('submit', function (event) {
    event.preventDefault();

    const title = document.querySelector('#input-title');
    const author = document.querySelector('#input-author');
    const year = document.querySelector('#input-year');
    const isComplete = document.querySelector('#input-isComplete');

    const book = new Book(+new Date(), title.value, author.value, year.value, isComplete.checked);
    BookShelf.addBook(book);
    BookShelf.save();

    title.value = '';
    author.value = '';
    year.value = '';
    isComplete.checked = false;
  });
});

document.addEventListener('onDataSaved', () => {
  console.info('Book addedd successfully to Bookshelf!');
});

document.addEventListener('onDataLoaded', () => {
  console.info('Book loaded successfully from localStorage!');
});
