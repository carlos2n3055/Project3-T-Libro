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
            book: {
                owner: '' //heyling ID
            },
            transation_id: '', //OK
            book_owner_id: '', // el dominio mental
            book_buyer_select_id: '', // los futbolisimos
            owner_id: this.props.user._id  //carlos
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
        
        const userId = this.state.book

        this.booksService
            .editBookOwnerTransation(this.state.book_owner_id, userId) 
            .then(res => this.props.closeModal())
            .catch(err => console.log(err))
    }


    handleInputChange = (transactionId, bookOwnerId, buyerId, ownerId, e) => {
   
        this.setState({ book_buyer_select_id: e.target.value, transation_id: transactionId, book_owner_id: bookOwnerId, book: { owner: buyerId }, owner_id: ownerId }, console.log(this.state) )
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
                                
                                        <Form.Group controlId="book_buyer_select_id">
                                            <Form.Label>Seleccionar libro</Form.Label>
                                            <Form.Control type="text" name="book_buyer_select_id" value={this.state.buyer_book} onChange={(e) => this.handleInputChange(elm._id, elm.book_owner._id, elm.buyer._id, elm.owner._id, e)} as="select" >
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
