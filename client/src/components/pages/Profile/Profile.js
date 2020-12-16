import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import TransationService from './../../../service/transation.service'
import BooksService from '../../../service/books.service'
import ProfileEdit from './../Profile/Profile-edit'
import Popup from './../../shared/Popup/Popup'

import Alert from './../../shared/Alert/Alert'

import './Profile.css'


class Profile extends Component {

    constructor(props) {

        super(props)

        this.state = {
            transation: undefined,
            book: {
                owner: ''
            },
            transation_id: '',
            book_owner_id: '',
            book_buyer_select_id: '',
            owner_id: this.props.user._id,
            showToast: false,
            toastText: '',
            showModal: false
        }
        
        this.transitionService = new TransationService()
        this.booksService = new BooksService()
    }


    componentDidMount = () => this.refreshTransations()


    refreshTransations = () => {

        this.transitionService
            .getTransations(this.props.user._id)
            .then(res => {
                res.data[0] && this.setState({ showToast: true, toastText: 'ATENCION. Tiene solicitudes de intercambio o venta pendientes.' })
                this.setState({ transation: res.data })
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleSubmit = e => {
    
        e.preventDefault()
        
        const buyerId = this.state.book
        const ownerId = this.state.owner_id

        this.booksService
            .editBookOwner(this.state.book_owner_id, buyerId) 
            .then(res => {
                this.setState({ book: { owner: ownerId } })
                this.changeOwnerIdInBookBuyer()
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    changeOwnerIdInBookBuyer = () => {

        const ownerId = this.state.book

        this.booksService
            .editBookOwner(this.state.book_buyer_select_id, ownerId) 
            .then(res => this.closeTransation())
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    closeTransation = () => {

        const transId = this.state.transation_id

        this.transitionService
            .closeTransation(transId)
            .then(res => {
                this.setState({ showToast: true, toastText: 'El intercambio se ha completado correctamente.' })
                this.refreshTransations()
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleInputChange = (transactionId, bookOwnerId, buyerId, ownerId, e) => {
   
        this.setState({ book_buyer_select_id: e.target.value, transation_id: transactionId, book_owner_id: bookOwnerId, book: { owner: buyerId }, owner_id: ownerId })
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    handleModal = visible => this.setState({ showModal: visible })


    render() {

        return (
            
            <Container className="paddingTop70 profile">

                <h1>¡Hola, {this.props.user.name} {this.props.user.lastname}!</h1>

                <img src={this.props.user.img} alt={this.props.user.name} />

                <Button className="btnDetails" onClick={() => this.handleModal(true)} variant="#272643" size="sm">Editar perfil</Button>

                {/* <Button variant="#272643" size="sm" type="submit">Mi biblioteca</Button> */}

                <Link variant="#272643" size="sm" to="/libros">Mi biblioteca</Link>
            
                <h4>Tus transacciones:</h4>

                {this.state.transation
                    ?
                    <>
                        {this.state.transation.map(elm => {
                            return (
                                <>
                                    <p><em><strong>{elm.buyer.name}</strong></em> está interesad@ en intercambiar tu libro <em><strong>{elm.book_owner.title}</strong></em>, escoge un libro suyo que te interese para el intercambio:</p>


                                    <Form onSubmit={this.handleSubmit}>
                                
                                        <Form.Group controlId="book_buyer_select_id">
                                            <Form.Label>Seleccionar libro</Form.Label>
                                            <Form.Control type="text" name="book_buyer_select_id" value={this.state.buyer_book} onChange={(e) => this.handleInputChange(elm._id, elm.book_owner._id, elm.buyer._id, elm.owner._id, e)} as="select" >
                                                <option>Seleccione:</option>
                                                {elm.book_buyer.map((element, idx) => <option key={idx} value={element._id}>{element.title}</option>)}
                                            </Form.Control>
                                        </Form.Group>
                                            
                                        <Button variant="#272643" size="sm" type="submit">Intercambiar</Button>
                                    
                                    </Form>
                                </>
                            )
                        })}
                        
                    </>
                    :
                    <p>error</p>
                }

                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Editar Perfil" >

                    <ProfileEdit closeModal={() => this.handleModal(false)} loggedUser={this.props.user._id} />

                </Popup>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </Container>

        )

    }
    
}



export default Profile
