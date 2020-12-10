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
    saveBook = bookInfo => this.apiHandler.post(`/newBook`, bookInfo)
    editBook = (id, bookInfo) => this.apiHandler.put(`/editBook/${id}`, bookInfo)
    deleteBook = bookId => this.apiHandler.delete(`/deleteBook/${bookId}`)
}
