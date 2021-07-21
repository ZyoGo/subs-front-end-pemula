import * as BookShelf from './dom.js';

class Book {
  constructor(id, title, author, year, isComplete) {
    this.id = id;
    this.title = title;
    this.author = author;
    this.year = year;
    this.isComplete = isComplete;
  }

  createComponent() {
    const bookWrapper = document.createElement('li');
    const bookItem = document.createElement('div');
    const bookTitle = document.createElement('h4');
    const bookAuthor = document.createElement('p');
    const bookYear = document.createElement('p');

    bookWrapper.id = this.id;
    bookWrapper.classList.add('wrapper__book');
    bookItem.classList.add('wrapper__book__p');

    bookTitle.innerText = this.title;
    bookAuthor.innerText = this.author;
    bookYear.innerText = this.year;

    bookItem.appendChild(bookTitle);
    bookItem.appendChild(bookAuthor);
    bookItem.appendChild(bookYear);

    bookWrapper.appendChild(bookItem);

    if (this.isComplete) {
      bookWrapper.appendChild(this.createUnreadButton(this.id));
      bookWrapper.appendChild(this.createRemoveButton(this.id));
    } else {
      bookWrapper.appendChild(this.createReadButton(this.id));
      bookWrapper.appendChild(this.createRemoveButton(this.id));
    }

    return bookWrapper;
  }

  createButtonIcon(icon) {
    const svgIcon = document.createElement('img');
    svgIcon.setAttribute('src', `https://s2.svgbox.net/hero-outline.svg?ic=${icon}&color=2570fa`);
    svgIcon.setAttribute('width', '32');
    svgIcon.setAttribute('height', '32');
    svgIcon.classList.add(`${icon}-button`);

    return svgIcon;
  }

  createUnreadButton(id) {
    const button = this.createButtonIcon('book-open');
    // button.children[0].textContent = 'Mark as unread';

    button.addEventListener('click', function (event) {
      event.preventDefault();
      BookShelf.markUnfinished(id);
    });

    return button;
  }

  createReadButton(id) {
    const button = this.createButtonIcon('check');
    // button.children[0].textContent = 'Mark as read';

    button.addEventListener('click', function (event) {
      event.preventDefault();
      BookShelf.markFinished(id);
    });

    return button;
  }

  createRemoveButton(id) {
    const button = this.createButtonIcon('trash');
    // button.children[0].textContent = 'Remove book';

    button.addEventListener('click', function (event) {
      event.preventDefault();

      const isDelete = confirm('Are you sure for delete this book from list?');

      if (isDelete) {
        BookShelf.deleteItem(id);
        BookShelf.update();
      }
    });

    return button;
  }
}

export default Book;
