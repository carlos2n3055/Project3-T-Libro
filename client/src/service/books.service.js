import axios from 'axios'

export default class BookService {

    constructor() {
        this.apiHandler = axios.create({
            // baseURL: 'http://localhost:5000/api/books',
            baseURL: `${process.env.REACT_APP_API_URL}/books`,
            withCredentials: true
        })
    }

    getBooks = () => this.apiHandler.get('/getAllBooks')
    getMyBooks = owner_id => this.apiHandler.get(`/getMyBooks/${owner_id}`)
    getBook = book_id => this.apiHandler.get(`/getOneBook/${book_id}`)
    getBooksBuyer = buyer_id => this.apiHandler.get(`/getBooksBuyer/${buyer_id}`)
    saveBook = book_info => this.apiHandler.post(`/newBook`, book_info)
    editBook = (book_id, book_info) => this.apiHandler.put(`/editBook/${book_id}`, book_info)
    editBookOwner = (book_id, new_owner_id) => this.apiHandler.put(`/editBookOwner/${book_id}`, new_owner_id)
    deleteBook = book_id => this.apiHandler.delete(`/deleteBook/${book_id}`)
}
