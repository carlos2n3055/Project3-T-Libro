import React, { Component } from 'react'

import BooksService from '../../../service/books.service'

import BookCard from './Book-card'
//import Loader from './../../shared/Spinner/Loader'  //SI DA TIEMPO PONEMOS SPINNER
import BookForm from './../Book-form/Book-form'

import { Container, Row, Button, Modal } from 'react-bootstrap'
import './Book-list.css'



class BookList extends Component {

    constructor() {
        super()
        this.state = {
            books: undefined,
            showModal: false
        }
        this.booksService = new BooksService()
    }


    componentDidMount = () => this.refreshBooks()


    refreshBooks = () => {

        this.booksService
            .getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => console.log(err))
    }


    handleModal = visible => this.setState({ showModal: visible })


    render() {

        return (
            <>
                <Container fluid className="bookList paddingTop70">

                    <h1>Libros disponibles</h1>

                    {this.props.loggedUser && <Button onClick={() => this.handleModal(true)} variant="#272643" size="sm">Crear un nuevo libro</Button>}
                    
                    <Row >
                        {
                            this.state.books
                                ?
                                this.state.books.map(elm => <BookCard key={elm._id} {...elm} />)
                                :
                                <h3>Cargando...</h3>
                        }
                    </Row>

                </Container>

                <Modal className="font" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    
                    <Modal.Body>
                        <BookForm closeModal={() => this.handleModal(false)} updateList={this.refreshBooks} loggedUser={this.props.loggedUser} />
                    </Modal.Body>
                    
                </Modal>

            </>
        )
    }
}



export default BookList
