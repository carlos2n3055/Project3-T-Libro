import React, { Component } from 'react'

// Services
import BooksService from '../../../service/books.service'

// Components
import MyBookCard from './MyBook-card'
import Alert from './../../shared/Alert/Alert'

// Styles
import { Container, Row, Button } from 'react-bootstrap'
import './MyLibrary.css'



class MyLibrary extends Component {

    constructor() {
        super()
        this.state = {
            books: undefined,
            showToast: false,
            toastText: ''
        }
        this.booksService = new BooksService()
    }


    componentDidMount = () => this.refreshBooks()


    refreshBooks = () => {

        const owner_id = this.props.loggedUser._id

        this.booksService
            .getMyBooks(owner_id)
            .then(res => this.setState({ books: res.data }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        return (
            <>
                <Container fluid className="myBookList paddingTop70">

                    <h2>Mis libros</h2>
                    
                    <Row >
                        {
                            this.state.books
                                ?
                                this.state.books.map(elm => <MyBookCard key={elm._id} {...elm} updateList={this.refreshBooks}/>)
                                :
                                <h3>Cargando...</h3>
                        }
                    </Row>

                </Container>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </>
        )
    }
}



export default MyLibrary
