import React, { Component } from 'react'

// Services
import BooksService from '../../../service/books.service'

// Components
import BookEdit from './../Book-edit/Book-edit'
import Popup from './../../shared/Popup/Popup'
import Alert from './../../shared/Alert/Alert'

// Styles
import { Col, Card, Button } from 'react-bootstrap'
import './MyBook-card.css'



class MyBookCard extends Component {

    constructor(props) {

        super(props)
    
        this.state = {
            showModal: false,
            showToast: false,
            toastText: ''
        }
        this.booksService = new BooksService()
    }


    deleteBook = () => {

        const book_id = this.props._id

        this.booksService
            .deleteBook(book_id)
            .then(res => {
                this.props.updateList()
                this.setState({ showToast: true, toastText: "Tu libro se ha eliminado con éxito." })
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))

    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    handleModal = visible => this.setState({ showModal: visible })


    render() {

        return (

            <Col className="myBook-card text-center" lg={4}>

                <Card.Img variant="top" src={this.props.imageUrl} />

                <Card.Body>

                    <Card.Title as="h4">{this.props.title}</Card.Title>
                    <Card.Subtitle as="h6" className="text-muted">{this.props.author}</Card.Subtitle>

                    <Button className="btnDetails cardDetails" onClick={() => this.handleModal(true)} variant="#272643" size="sm">Editar</Button>

                    <Button className="btnDetails cardDetails" onClick={this.deleteBook} variant="#272643" size="sm">Eliminar</Button>

                </Card.Body>
                
                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Editar libro">
                        
                    <BookEdit closeModal={() => this.handleModal(false)} updateMyList={this.props.updateList} loggedUser={this.props.loggedUser} book_id={this.props._id} />
                        
                </Popup>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </Col>
        )

    }

}



export default MyBookCard
