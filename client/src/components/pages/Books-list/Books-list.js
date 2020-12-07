import React, { Component } from 'react'

import BooksService from '../../../service/books.service'

import BookCard from './Book-card'
//import Loader from './../../shared/Spinner/Loader'
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
                <Container>

                    <h1>Listado de libros</h1>

                    {<Button onClick={() => this.handleModal(true)} variant="dark" size="sm">Crear un nuevo libro</Button>}

                    {/* //this.props.loggedUser && */}

                    <Row>
                        {
                            this.state.books
                                ?
                                this.state.books.map(elm => <BookCard key={elm._id} {...elm} />)
                                :
                                //    <Loader /> loggedUser={this.props.loggedUser}
                                <h1>error</h1>
                        }
                    </Row>

                </Container>


                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <BookForm closeModal={() => this.handleModal(false)} updateList={this.refreshBooks} />
                    </Modal.Body>
                </Modal>

            </>
        )
    }
}

export default BookList


//loggedUser = { this.props.loggedUser }
