import axios from 'axios'

export default class CommentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/comments',
            withCredentials: true
        })
    }

    getComments = () => this.apiHandler.get('/getAllComments')
    getComment = commentId => this.apiHandler.get(`/getOneComment/${commentId}`)
    saveComment = commentInfo => this.apiHandler.post(`/newComment`, commentInfo)
    deleteComment = commentId => this.apiHandler.delete(`/deleteComment/${commentId}`)
}
