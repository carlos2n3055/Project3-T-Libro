import React, { Component } from 'react'
import BooksService from '../../../service/books.service'

import { Form, Button } from 'react-bootstrap'


class BookEdit extends Component {

    constructor(props) {
        super(props)
        this.state = {
            book: undefined
        }
        this.booksService = new BooksService()
    }


    componentDidMount = () => {

        const book_id = this.props.book_id

        this.booksService
            .getBook(book_id)
            .then(res => this.setState({ book: res.data }))
            .catch(err => console.log(err))
    }


    handleInputChange = e => {

        const { name } = e.target
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({ [name]: value } )
    }


    handleSubmit = e => {
        
        e.preventDefault()

        console.log(this.state) // PARA COMPROBAR EL FALLO AL GUARDAR LIBRO!!!

        this.booksService
            .editBook(this.state)
            .then(res => {
                this.props.updateList()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            
            <>
                {this.state.book
                    ?
                    <>
                        <h1>Editar libro</h1>

                        <hr />

                        <Form onSubmit={this.handleSubmit}>

                                <Form.Group controlId="title">
                                    <Form.Label>Titulo</Form.Label>
                                    <Form.Control type="text" name="title" value={this.state.book.title} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="author">
                                    <Form.Label>Autor</Form.Label>
                                    <Form.Control type="text" name="author" value={this.state.book.author} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="description">
                                    <Form.Label>Descripción</Form.Label>
                                    <Form.Control type="text" name="description" value={this.state.book.description} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="image">
                                    <Form.Label>Imagen (URL)</Form.Label>
                                    <Form.Control type="text" name="image" value={this.state.book.image} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="photos">
                                    <Form.Label>Fotos</Form.Label>
                                    <Form.Control type="text" name="photos" value={this.state.book.photos} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Form.Group controlId="status">
                                    <Form.Label>Valoración</Form.Label>
                                    <Form.Control type="text" name="status" onChange={this.handleInputChange} as="select" >
                                        <option>Seleccione:</option>
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                </Form.Control>
                                <p><small>Valoración actual: {this.state.book.status}</small></p>
                                </Form.Group>

                                <Form.Group controlId="exchange">
                                    <Form.Check type="checkbox" name="exchange" checked={this.state.book.exchange} onChange={this.handleInputChange} label="Intercambio de libro" />
                                </Form.Group>

                                <Form.Group controlId="sale">
                                    <Form.Check type="checkbox" name="sale" checked={this.state.book.sale} onChange={this.handleInputChange} label="Venta de libro" />
                                </Form.Group>

                                <Form.Group controlId="price">
                                    <Form.Label>Precio</Form.Label>
                                    <Form.Control type="number" name="price" value={this.state.book.price} onChange={this.handleInputChange} />
                                </Form.Group>

                                <Button variant="dark" type="submit">Guardar cambios</Button>

                            </Form>

                    </>

                    :

                    <h1>error</h1>
                }
            </>
                
            
        )
    }
}



export default BookEdit