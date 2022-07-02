// Data Structures

class Book {
    constructor(
        title = 'Unknown',
        author = 'Unknown',
        pages = '0',
        isRead = false
    ) {
        this.title = title
        this.author = author
        this.pages = pages
        this.isRead = isRead
    }
}

class Library {
    constructor() {
        this.books = []
    }

    addBook(newBook) {
        if (!this.isInLibrary(newBook)) {
            this.books.push(newBook)
        }
    }

    removeBook(title) {
        this.books = this.books.filter((book) => book.title !== title)
    }

    getBook(title) {
        return this.books.find((book) => book.title === title)
    }

    isInLibrary(newBook) {
        return this.books.some((book) => book.title === newBook.title)
    }
}

const library = new Library()

// User Interface

const addBookBtn = document.getElementById("add-book-btn")
const modal = document.getElementById("modal")
const addBookForm = document.getElementById("add-book-form")
const booksGrid = document.getElementById("books-grid")

////////////////////////////////////////////////////////////

function addBook() {

}

////////////////////////////////////////////////////

const updateBooksGrid = () => {
    resetBooksGrid()
    for (let book of library.books) {
        createBookCard(book)
    }
}

const resetBooksGrid = () => {
    booksGrid.innerHTML = ''
}

const handleKeyboardInput = (e) => {
    if (e.key === 'Escape') closeAddBookModal()
}

const openModal = () => {
    addBookForm.reset()
    modal.classList.add("active");
}

function closeAddBookModal() {
    modal.classList.remove("active");
}

addBookBtn.onclick = openModal
addBookForm.onsubmit = addBook
window.onkeydown = handleKeyboardInput