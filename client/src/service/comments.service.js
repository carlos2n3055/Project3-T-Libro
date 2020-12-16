import axios from 'axios'

export default class CommentService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/comments',
            withCredentials: true
        })
    }

    getComments = book_id => this.apiHandler.get(`/getAllComments/${book_id}`)
    getComment = comment_id => this.apiHandler.get(`/getOneComment/${comment_id}`)
    saveComment = comment_info => this.apiHandler.post(`/newComment`, comment_info)
    deleteComment = comment_id => this.apiHandler.delete(`/deleteComment/${comment_id}`)
}
