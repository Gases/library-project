var input = document.querySelectorAll('input');

let newBook = document.querySelector('#add-new-book');
let modal = document.querySelector('#modal');
let overlay = document.querySelector('.overlay');
let submitBook = document.querySelector('#submit-book');
let container = document.querySelector('.container');

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

    input.forEach(input => input.textContent = '');
}

function bookDetails() {
    let bookTitle = document.querySelector('[name="title"]');
    let bookAuthor = document.querySelector('[name="author"]');
    let bookYear = document.querySelector('[name="year"]');
    let bookPages = document.querySelector('[name="pages"]');
    let bookRead = document.querySelector('[name="read"]');
    
    let book = new Book(bookTitle.value, bookAuthor.value, bookYear.value, bookPages.value, bookRead.checked);
    
    createBook(book);
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
    let parRead = document.createElement('p');
    if (book.read) parRead.textContent = `Read it: Yep`;
    else parRead.textContent = `Read it: Nope`;

    let footer = document.createElement('footer');
    footer.classList.add('card-footer')
    let par = document.createElement('p');
    footer.appendChild(parAuthor);
    bookCard.appendChild(par);

    details.appendChild(parAuthor);
    details.appendChild(parYear);
    details.appendChild(parPages);
    details.appendChild(parRead);

    closeModal();
}

function Book(title, author, year, pages, read) {
    this.title = title;
    this.author = author;
    this.year = year;
    this.pages = pages;
    this.read = read;
}


