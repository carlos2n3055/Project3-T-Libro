import axios from 'axios'

export default class TransationService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/transation',
            withCredentials: true
        })
    }

    getTransations = owner_id => this.apiHandler.get(`/getAllTransation/${owner_id}`)
    saveTransation = transationInfo => this.apiHandler.post(`/newTransation`, transationInfo)
    changeTransationBuy = trans_id => this.apiHandler.put(`/changeTransationBuy/${trans_id}`)
    closeTransation = trans_id => this.apiHandler.put(`/closeTransation/${trans_id}`)
}
