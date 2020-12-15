import React, { Component } from 'react'
import { Container, Form, Button } from 'react-bootstrap'

import TransationService from './../../../service/transation.service'
import BooksService from '../../../service/books.service'


class Profile extends Component {

    constructor(props) {

        super(props)

        this.state = {
            transation: undefined,
            book: undefined
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

        console.log('ESTAS VIENDO EL THIS.STATE')
        console.log(this.props.user._id) // id del usuario que esta logueado dentro de su perfil
        console.log('ESTAS SON LAS PROPS')
        console.log(this.props) // solo nos pasamos el user logueado

        this.booksService
            .editBook(this.state.transation.book_owner._id, this.state.transation.buyer._id) // Tenemos que enviar el id del libro del owner y el id del buyer. 
            .then(res => this.props.closeModal())
            .catch(err => console.log(err))
    }


    handleInputChange = e => this.setState({ ...this.state.transation, ...this.state.book, [e.target.name]: e.target.value })


    render() {

        return (
            
            <Container className="paddingTop70">

                <h1>¡Bienvenid@, {this.props.user.name} {this.props.user.lastname}!</h1>

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
                                            <Form.Control type="text" name="buyer_book" value={this.state.buyer_book} onChange={this.handleInputChange} as="select" >
                                                <option>Seleccione:</option>
                                                    {elm.book_buyer.map(element => <option>{ element._id }</option>)}
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
