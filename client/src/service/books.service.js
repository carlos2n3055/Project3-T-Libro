import axios from 'axios'

export default class BookService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/books',
            withCredentials: true
        })
    }

    getBooks = () => this.apiHandler.get('/getAllBooks')
    getBook = bookId => this.apiHandler.get(`/getOneBook/${bookId}`)
    getBooksBuyer = buyer_id => this.apiHandler.get(`/getBooksBuyer/${buyer_id}`)
    saveBook = bookInfo => this.apiHandler.post(`/newBook`, bookInfo)
    editBook = (book_id, bookInfo) => this.apiHandler.put(`/editBook/${book_id}`, bookInfo)
    editBookOwnerTransation = (book_id, buyerId) => this.apiHandler.put(`/editBookOwnerTransation/${book_id}`, buyerId)
    deleteBook = bookId => this.apiHandler.delete(`/deleteBook/${bookId}`)
}
