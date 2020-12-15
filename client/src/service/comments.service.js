import axios from 'axios'

export default class CommentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/comments',
            withCredentials: true
        })
    }

    getComments = bookId => this.apiHandler.get(`/getAllComments/${bookId}`)
    getComment = commentId => this.apiHandler.get(`/getOneComment/${commentId}`)
    saveComment = commentInfo => this.apiHandler.post(`/newComment`, commentInfo)
    deleteComment = commentId => this.apiHandler.delete(`/deleteComment/${commentId}`)
}
