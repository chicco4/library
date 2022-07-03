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

const createBookCard = (book) => {
    const bookCard = document.createElement('div')
    const title = document.createElement('p')
    const author = document.createElement('p')
    const pages = document.createElement('p')
    const buttonGroup = document.createElement('div')
    const readBtn = document.createElement('button')
    const removeBtn = document.createElement('button')

    bookCard.classList.add('book-card')
    buttonGroup.classList.add('btn-group')
    readBtn.classList.add('read-btn')
    removeBtn.classList.add('remove-btn')
    readBtn.onclick = toggleRead
    removeBtn.onclick = removeBook

    title.textContent = `${book.title}`
    author.textContent = book.author
    pages.textContent = `${book.pages} pages`
    removeBtn.textContent = 'Remove'

    if (book.isRead) {
        readBtn.textContent = 'Read'
        readBtn.classList.add('green')
    } else {
        readBtn.textContent = 'Not read'
        readBtn.classList.add('red')
    }

    bookCard.appendChild(title)
    bookCard.appendChild(author)
    bookCard.appendChild(pages)
    buttonGroup.appendChild(readBtn)
    buttonGroup.appendChild(removeBtn)
    bookCard.appendChild(buttonGroup)
    booksGrid.appendChild(bookCard)
}

const getBookFromInput = () => {
    const title = document.getElementById('title').value
    const author = document.getElementById('author').value
    const pages = document.getElementById('pages').value
    const isRead = document.getElementById('isRead').checked
    return new Book(title, author, pages, isRead)
}

const addBook = (e) => {
    e.preventDefault()
    const newBook = getBookFromInput()

    if (library.isInLibrary(newBook)) {
        console.log("This book already exists in your library")
        return
    }

    library.addBook(newBook)
    saveLocal()
    updateBooksGrid()

    closeAddBookModal()
}

const removeBook = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )

    library.removeBook(title)
    saveLocal()
    updateBooksGrid()

}

const toggleRead = (e) => {
    const title = e.target.parentNode.parentNode.firstChild.innerHTML.replaceAll(
        '"',
        ''
    )
    const book = library.getBook(title)

    book.isRead = !book.isRead
    saveLocal()
    updateBooksGrid()

}

// Local Storage

const saveLocal = () => {
    localStorage.setItem('library', JSON.stringify(library.books))
}

const restoreLocal = () => {
    const books = JSON.parse(localStorage.getItem('library'))
    if (books) {
        library.books = books.map((book) => JSONToBook(book))
    } else {
        library.books = []
    }
}

// Utils

const docsToBooks = (docs) => {
    return docs.map((doc) => {
        return new Book(
            doc.data().title,
            doc.data().author,
            doc.data().pages,
            doc.data().isRead
        )
    })
}

const JSONToBook = (book) => {
    return new Book(book.title, book.author, book.pages, book.isRead)
}

//BASICS

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

function gigio() {
    restoreLocal()
    updateBooksGrid()
}

window.onload = gigio;

addBookBtn.onclick = openModal
addBookForm.onsubmit = addBook
window.onkeydown = handleKeyboardInput