import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import TransationService from './../../../service/transation.service'
import BooksService from '../../../service/books.service'

import './Profile.css'


class Profile extends Component {

    constructor(props) {

        super(props)

        this.state = {
            transation: undefined,
            book: undefined,
            transationSelect: {
                idTrans: ''
            },
            book_buyer: ''
        }
        
        this.transitionService = new TransationService()
        this.booksService = new BooksService()
    }


    componentDidMount = () => {

        this.transitionService
            .getTransations(this.props.user._id)
            .then(res => this.setState({ transation: res.data }))
            .catch(err => console.log(err))
    }


    handleSubmit = e => {
    
        e.preventDefault()

        const one = this.state.transation 

        console.log('ESTAS VIENDO EL THIS.STATE')
        console.log(this.props.user._id) // id del usuario que esta logueado dentro de su perfil
        console.log('ESTO ES THIS.STATE AQUIIIIIIIIII')
        console.log(this.state) // solo nos pasamos el user logueado

        this.booksService
            .editBook(this.state.transation.book_owner._id, this.state.transation.buyer._id) // Tenemos que enviar el id del libro del owner y el id del buyer. 
            .then(res => this.props.closeModal())
            .catch(err => console.log(err))
    }


    handleInputChange = (idTransaction, e) => {
        console.log("ID TRANSACTION")
        console.log(idTransaction)
        console.log("EEEEEEEEE")
         console.log(e.target.value)
        
        this.setState({ ...this.state.transation, ...this.state.book, transationSelect: { idTrans: idTransaction }, book_buyer: { [e.target.name]: e.target.value } })
    }


    render() {

        return (
            
            <Container className="paddingTop70 perfil">

                <h1>¡Hola, {this.props.user.name} {this.props.user.lastname}!</h1>

                <img src={this.props.user.img} alt={this.props.user.name} />
            
                <h3>Tus transacciones:</h3>

                {this.state.transation
                    ?
                    <>
                        {this.state.transation.map(elm => {
                            return (
                                <>
                                    <p><strong>{elm.buyer.name}</strong> está interesad@ en intercambiar tu libro <strong>{elm.book_owner.title}</strong>, escoge el libro que te interese:</p>


                                    <Form onSubmit={this.handleSubmit}>
                                
                                        <Form.Group controlId="buyer_book">
                                            <Form.Label>Seleccionar libro</Form.Label>
                                            <Form.Control type="text" name="buyer_book" value={this.state.buyer_book} onChange={(e) => this.handleInputChange(elm._id, e)} as="select" >
                                                <option>Seleccione:</option>
                                                {elm.book_buyer.map(element => <option value={element._id}>{element.title}</option>)}
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

            </Container>

        )

    }
    
}



export default Profile
