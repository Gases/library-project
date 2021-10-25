var input = document.querySelectorAll('input');

let newBook = document.querySelector('#add-new-book');
let modal = document.querySelector('#modal');
let overlay = document.querySelector('.overlay');
let submitBook = document.querySelector('#submit-book');
let container = document.querySelector('.container');
let form = document.querySelector('form');


newBook.addEventListener('click', addNewBook);
overlay.addEventListener('click', closeModal);
submitBook.addEventListener('click', bookDetails);

function addNewBook() {
    modal.classList.remove('disappear');
    modal.classList.add('appear');
    newBook.classList.remove('antirotate');
    newBook.classList.add('rotate');
    overlay.classList.add('active');
}

function closeModal() {
    modal.classList.remove('appear');
    modal.classList.add('disappear');
    overlay.classList.remove('active');
    newBook.classList.remove('rotate');
    newBook.classList.add('antirotate');
    
    form.reset();
}

function bookDetails() {
    let bookTitle = document.querySelector('[name="title"]');
    let bookAuthor = document.querySelector('[name="author"]');
    let bookYear = document.querySelector('[name="year"]');
    let bookPages = document.querySelector('[name="pages"]');
    let bookRead = document.querySelector('[name="read"]');
    
    let book = new Book(bookTitle.value, bookAuthor.value, bookYear.value, bookPages.value, bookRead.checked);
    
    if (form.checkValidity()) createBook(book);
}

function createBook(book) {
    let bookCard = document.createElement('div');
    bookCard.classList.add('card-content');
    container.appendChild(bookCard);
    
    let header = document.createElement('header');
    header.classList.add('title');
    bookCard.appendChild(header);
    
    let h1 = document.createElement('h1');
    h1.textContent = book.title;
    header.appendChild(h1);
    
    let details = document.createElement('div');
    details.classList.add('details');
    bookCard.appendChild(details);
    
    let parAuthor = document.createElement('p');
    parAuthor.textContent = `Author: ${book.author}`;
    let parYear = document.createElement('p');
    parYear.textContent = `Year: ${book.year}`;
    let parPages = document.createElement('p');
    parPages.textContent = `Pages: ${book.pages}`;
    let btnRead = document.createElement('button');
    btnRead.classList.add('toggle-read');
    if (book.read) {
        btnRead.classList.add('read');
        btnRead.textContent = 'Read'
    }
    else {
        btnRead.classList.add('not-read');
        btnRead.textContent = 'Not read';
    }
    
    let footer = document.createElement('footer');
    footer.classList.add('card-footer')
    footer.innerHTML = '<button class="delete-button"><i class="fas fa-trash"></i></button>';
    bookCard.appendChild(footer);
    
    details.appendChild(parAuthor);
    details.appendChild(parYear);
    details.appendChild(parPages);
    details.appendChild(btnRead);
    
    let deleteButton = document.querySelectorAll('.delete-button');
    deleteButton.forEach(button => button.addEventListener('click', deleteCard));
    let toggleRead = document.querySelectorAll('.toggle-read');
    toggleRead.forEach(button => button.addEventListener('click',toggleBookRead));
    closeModal();
}

function deleteCard(e) {
    e.target.parentNode.parentNode.parentNode.remove();
}

function toggleBookRead(e) {
    if (e.target.classList.contains('read')) {
        e.target.classList.remove('read');
        e.target.classList.add('not-read');
        e.target.textContent = 'Not read';
    }
    else {
        e.target.classList.remove('not-read');
        e.target.classList.add('read');
        e.target.textContent = 'Read';
    }
}

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}


