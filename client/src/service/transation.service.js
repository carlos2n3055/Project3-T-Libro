import axios from 'axios'

export default class TransationService {

    constructor() {
        this.apiHandler = axios.create({
            baseURL: 'http://localhost:5000/api/transation',
            withCredentials: true
        })
    }

    getTransations = owner_id => this.apiHandler.get(`/getAllTransation/${owner_id}`)
    saveTransation = transation_info => this.apiHandler.post(`/newTransation`, transation_info)
    changeTransationBuy = transation_id => this.apiHandler.put(`/changeTransationBuy/${transation_id}`)
    closeTransation = transation_id => this.apiHandler.put(`/closeTransation/${transation_id}`)
    editTransation = (transation_id, transation_info) => this.apiHandler.put(`/editTransation/${transation_id}`, transation_info)
}
