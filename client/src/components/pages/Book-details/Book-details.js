import React, { Component } from 'react'
import BooksService from '../../../service/books.service'

import BookEdit from './../Book-edit/Book-edit'
import CommentForm from './../Comment-form/Comment-form'

import starGold from './starGold.png'
import starGrey from './starGrey.png'

//import Loader from './../../shared/Spinner/Loader'

import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import './Book-details.css'

import { Link } from 'react-router-dom'



class BookDetails extends Component {

    constructor(props) {

        super(props)
console.log(props)
        this.state = {
            book: undefined,
            showModal: false
        }

        this.booksService = new BooksService()
    }


    componentDidMount = () => {

        const book_id = this.props.match.params.book_id

        this.booksService
            .getBook(book_id)
            .then(res => this.setState({ book: res.data }))
            .catch(err => console.log(err))
    }

    //   .getBook(book_id)({ book: "book_id"})





    handleModal = visible => this.setState({ showModal: visible })


    render() {

        const book_id = this.props.match.params.book_id
        const user_id = this.props.match.params.user_id

        return (

            <Container className="book-details">

                {this.state.book
                    ?
                    <>
                        <h1>{this.state.book.title}</h1>
                        <p>{this.state.book.author}</p>

                        <Row>
                            <Col md={{ span: 6, offset: 1 }} >

                                <img src={this.state.book.image} alt={this.state.book.title} />
                                
                                <h1>COMENTARIOS:</h1>




                            </Col>

                            <Col md={4}>

                                <h3>Descripción</h3>

                                <p>{this.state.book.description}</p>

                                <hr />
    
                                {
                                    this.state.book.status === "1" 
                                        ?
                                        <Row className="star">
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                        </Row>
                                        
                                        :

                                    this.state.book.status === "2" 
                                        ?
                                        <Row className="star">
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                        </Row>
                                        
                                        :
                                            
                                    this.state.book.status === "3" 
                                        ?
                                        <Row className="star">
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                        </Row>
                                        
                                        :
                            
                                    this.state.book.status === "4" 
                                        ?
                                        <Row className="star">
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                        </Row>
                                        
                                        :
                                                    
                                    this.state.book.status === "5"
                                        ?
                                        <Row className="star">
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                            <img src={starGold} alt={this.state.book.status} />
                                        </Row>
                        
                                        :

                                        <Row className="star">
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                            <img src={starGrey} alt={this.state.book.status} />
                                        </Row>
                                }

                                <CommentForm {...this.props}/>

                                <Button onClick={() => this.handleModal(true)} variant="dark" size="sm">Editar</Button>
                                {/* <Link to={`/libros/editar/${book_id}`} className="btn btn-sm btn-dark">Editar</Link> */}
                                <Link to="/libros" className="btn btn-sm btn-dark">Intercambiar</Link>
                                <Link to="/libros" className="btn btn-sm btn-dark">Comprar</Link>
                                <Link to="/libros" className="btn btn-sm btn-dark">Volver</Link>

                            </Col>

                        </Row>
                    </>

                    :

                    <h1>Error</h1>
                }

                <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <BookEdit closeModal={() => this.handleModal(false)} updateList={this.refreshBooks} loggedUser={this.props.loggedUser} book_id={book_id}/>
                    </Modal.Body>
                </Modal>


                
            </Container>
        )
    }
}

export default BookDetails