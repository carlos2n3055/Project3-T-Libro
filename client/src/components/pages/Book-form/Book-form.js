import React, { Component } from 'react'

import BooksService from '../../../service/books.service'
import FilesService from './../../../service/upload.service'

import { Form, Button } from 'react-bootstrap'



class BookForm extends Component {

    constructor(props) {

        super(props)

        this.state = {
            book: {
                title: '',
                author: '',
                description: '',
                imageUrl: undefined,
                rating: '1',
                exchange: false,
                sale: false,
                price: '',
                owner: this.props.loggedUser ? this.props.loggedUser._id : ''
            },
            uploadingActive: false     
        }
        this.booksService = new BooksService()
        this.filesService = new FilesService()
    }


    handleInputChange = e => {

        const { name } = e.target
        const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value
        this.setState({ book: { ...this.state.book, [name]: value } })
    }
    

    handleSubmit = e => {

        e.preventDefault()

        this.booksService
            .saveBook(this.state.book)
            .then(res => {
                this.props.updateList()
                this.props.closeModal()
            })
            .catch(err => console.log(err))
    }


    handleImageUpload = e => {

        const uploadData = new FormData()
        uploadData.append('imageUrl', e.target.files[0])

        this.setState({ uploadingActive: true })

        this.filesService
            .uploadImage(uploadData)
            .then(response => {
                this.setState({
                    book: { ...this.state.book, imageUrl: response.data.secure_url },
                    uploadingActive: false
                })
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
                        <p><small>*Campo requerido</small></p>
                    </Form.Group>

                    <Form.Group controlId="author">
                        <Form.Label>Autor</Form.Label>
                        <Form.Control type="text" name="author" value={this.state.author} onChange={this.handleInputChange} />
                        <p><small>*Campo requerido</small></p>
                    </Form.Group>

                    <Form.Group controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                        <p><small>*Campo requerido</small></p>
                    </Form.Group>

                    <Form.Group controlId="imageUrl">
                        <Form.Label>Imagen</Form.Label>
                        {/* <Form.Label>Imagen (file) {this.state.uploadingActive && <Spinner />}</Form.Label> */}
                        <Form.Control type="file" onChange={this.handleImageUpload} />
                    </Form.Group>
                    
                    <Form.Group controlId="rating">
                        <Form.Label>Valoración</Form.Label>
                        <Form.Control type="text" name="rating" onChange={this.handleInputChange} as="select" >
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

                    <Button variant="#272643" type="submit" disabled={this.state.uploadingActive}>{this.state.uploadingActive ? 'Subiendo imagen...' : 'Crear un nuevo libro'}</Button>

                </Form>

            </>
        )
    }
}



export default BookForm
