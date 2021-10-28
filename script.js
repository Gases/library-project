var myLibrary = [];

let library = document.getElementById('container');
let addBookButton = document.getElementById('add-new-book');
let form = document.getElementById('new-book');
let modal = document.getElementById('modal');
let overlay = document.querySelector('.overlay');

addBookButton.addEventListener('click', toggleModal);
overlay.addEventListener('click', toggleModal);

const addBookToLibrary = (e) => {
  e.preventDefault();
  let bookData = [];
  let input = document.querySelectorAll('input');

  for (let i = 0; i < input.length; i++) {
    if (input[i].type === "checkbox") {
      bookData.push(input[i].checked);
    } else {
      bookData.push(input[i].value);
    }
  }

  const newBook = new Book(...bookData);
  myLibrary.push(newBook.bookCardContent());
  displayLibrary();
  toggleModal();
}

function displayLibrary() {
  form.reset();
  library.innerHTML = '';
  
  myLibrary.forEach(function(book) {
    let bookCard = document.createElement('div');
    let header = document.createElement('h1')
    let bookDetails = document.createElement('div');
    let readStatus = document.createElement('button')
    let footer = document.createElement('footer');
    
    
    bookCard.classList.add('card');
    library.appendChild(bookCard);
    
    header.classList.add('title');
    header.textContent = book.title;
    
    bookDetails.classList.add('content');
    for (let [key, detail] of Object.entries(book.details)) {
      let par = document.createElement('p');
      par.textContent = '';
      par.textContent = detail;
      bookDetails.appendChild(par);
    }
  
    readStatus.classList.add('read-status');
    if (book.read) {
      readStatus.classList.add('read');
      readStatus.textContent = 'Read';
    } else {
      readStatus.classList.add('not-read');
      readStatus.textContent = 'Not read';
    }
    readStatus.addEventListener('click', toggleRead);
    bookDetails.appendChild(readStatus);

    footer.classList.add('card-footer')
    footer.innerHTML = '<button class="delete-button"><i class="fas fa-trash"></i></button>';
    bookCard.append(header,bookDetails,footer);

    let removeBook = document.querySelectorAll('.delete-button');
    removeBook.forEach(book => book.addEventListener('click', removeBookCard));
  });
};

function removeBookCard(e) {
  myLibrary = myLibrary.filter(books => books.title !== e.target.parentNode.parentNode.parentNode.firstChild.innerText);
  displayLibrary();
}

function toggleRead(e) {
  this.textContent = '';
  if (this.classList.contains('read')) {
    this.classList.remove('read');
    this.classList.add('not-read');
    this.textContent = 'Not read';

    myLibrary.forEach(function(book) {
      if(book.title === e.target.parentNode.parentNode.firstChild.innerText) book.read = false;
    });  

  } else {
    this.classList.remove('not-read');
    this.classList.add('read');
    this.textContent = 'Read';

    myLibrary.forEach(function(book) {
      if(book.title === e.target.parentNode.parentNode.firstChild.innerText) book.read = true;
    });

  }
  
  displayLibrary();
}

function toggleModal() {
  if (modal.classList.contains('disappear')) {
    modal.classList.remove('disappear');
    modal.classList.add('appear');
    addBookButton.classList.remove('antirotate');
    addBookButton.classList.add('rotate');
    overlay.classList.add('active');
  } else {
    modal.classList.remove('appear');
    modal.classList.add('disappear');
    addBookButton.classList.remove('rotate');
    addBookButton.classList.add('antirotate');
    overlay.classList.remove('active');
  }
}

form.onsubmit = addBookToLibrary;

class Book {
  constructor(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
  }

  bookCardContent = function() {
    return {
      title: this.title.toUpperCase(),
      details: {
      author: `Author:    ${this.author}`,
      year: `Year:    ${this.year}`,
      pages: `Pages:    ${this.pages}`,
      },
      read: this.read
    }
  }
}