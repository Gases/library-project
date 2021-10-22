let newBook = document.querySelector('#add-new-book');
let modal = document.querySelector('#modal');
let overlay = document.querySelector('.overlay');

newBook.addEventListener('click', addNewBook);
overlay.addEventListener('click', closeModal);

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
}

