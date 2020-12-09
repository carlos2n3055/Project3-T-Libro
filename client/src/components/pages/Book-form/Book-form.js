import React, { Component } from 'react'

import BooksService from '../../../service/books.service'

import { Form, Button } from 'react-bootstrap'


class BookForm extends Component {

    constructor(props) {

        super(props)

        this.state = {
                title: '',
                author: '',
                description: '',
                image: undefined,       // Para poner una imagen por defecto en el nuevo libro sino se especifica una.
                photos: '',
                status: '1',            // Pone por defecto Status = "1" en caso de no seleccionar nada en la valoración del libro.
                exchange: false,
                sale: false,
                price: '',
                owner: this.props.loggedUser ? this.props.loggedUser._id : ''
        }

        this.booksService = new BooksService()
    }


    handleInputChange = e => {

        const { name } = e.target
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({ [name]: value } )
    }


    handleSubmit = e => {

        e.preventDefault()

        this.booksService
            .saveBook(this.state)
            .then(res => {
                this.props.updateList()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <h1>Crear nuevo libro</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="title">
                        <Form.Label>Titulo</Form.Label>
                        <Form.Control type="text" name="title" value={this.state.title} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="author">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="image">
                        <Form.Label>Imagen (URL)</Form.Label>
                        <Form.Control type="text" name="image" value={this.state.image} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Form.Group controlId="photos">
                        <Form.Label>Fotos</Form.Label>
                        <Form.Control type="text" name="photos" value={this.state.photos} onChange={this.handleInputChange} />
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
                    </Form.Group>

                    <Form.Group controlId="exchange">
                        <Form.Check type="checkbox" name="exchange" checked={this.state.exchange} onChange={this.handleInputChange} label="Intercambio de libro" />
                    </Form.Group>

                    <Form.Group controlId="sale">
                        <Form.Check type="checkbox" name="sale" checked={this.state.sale} onChange={this.handleInputChange} label="Venta de libro" />
                    </Form.Group>

                    <Form.Group controlId="price">
                        <Form.Label>Precio</Form.Label>
                        <Form.Control type="number" name="price" value={this.state.price} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="dark" type="submit">Crear un nuevo libro</Button>

                </Form>

            </>
        )
    }
}



export default BookForm