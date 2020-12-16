import axios from 'axios'

export default class UserService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/users',
            withCredentials: true
        })
    }

    getUsers = () => this.apiHandler.get('/getAllUsers')
    getUser = user_id => this.apiHandler.get(`/getOneUser/${user_id}`)
    editUser = (user_id, user_info) => this.apiHandler.put(`/editUser/${user_id}`, user_info)
}
