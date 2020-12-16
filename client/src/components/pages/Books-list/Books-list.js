import React, { Component } from 'react'

// Services
import BooksService from '../../../service/books.service'

// Components
import BookCard from './Book-card'
import BookForm from './../Book-form/Book-form'
import Popup from './../../shared/Popup/Popup'
import Alert from './../../shared/Alert/Alert'

// Styles
import { Container, Row, Button } from 'react-bootstrap'
import './Book-list.css'



class BookList extends Component {

    constructor() {
        super()
        this.state = {
            books: undefined,
            showModal: false,
            showToast: false,
            toastText: ''
        }
        this.booksService = new BooksService()
    }


    componentDidMount = () => this.refreshBooks()


    refreshBooks = () => {

        this.booksService
            .getBooks()
            .then(res => this.setState({ books: res.data }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleModal = visible => this.setState({ showModal: visible })


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


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

               
                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Crear nuevo libro" >
                    
                    <BookForm closeModal={() => this.handleModal(false)} updateList={this.refreshBooks} loggedUser={this.props.loggedUser} />
                  
                </Popup>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </>
        )
    }
}



export default BookList
