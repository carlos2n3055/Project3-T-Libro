import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BooksService from '../../../service/books.service'
import CommentsService from '../../../service/comments.service'

import BookEdit from './../Book-edit/Book-edit'
import CommentForm from './../Comment-form/Comment-form'

import starGold from './starGold.png'
import starGrey from './starGrey.png'

//import Loader from './../../shared/Spinner/Loader'  // SI DA TIEMPO PONER SPINNER

import { Container, Row, Col, Button, Modal } from 'react-bootstrap'
import './Book-details.css'



class BookDetails extends Component {

    constructor(props) {

        super(props)

        this.state = {
            book: undefined,
            showModal: false,
            showModalComments: false,
            comments: undefined
        }
        this.booksService = new BooksService()
        this.commentsService = new CommentsService()
    }


    commentsServ = () => {

        const book_id = this.props.match.params.book_id

        this.commentsService
            .getComments()
            .then(res => {
                let commentsBook = res.data.filter(elm => elm.book._id === book_id)
                this.setState({ comments: commentsBook })
                })
            .catch(err => console.log(err))
    }
            

    componentDidMount = () => {

        const book_id = this.props.match.params.book_id

        this.booksService
            .getBook(book_id)
            .then(res => this.setState({ book: res.data }))
            .catch(err => console.log(err))
        
        this.commentsServ()
    }


    refreshComments = () => this.commentsServ()


    handleModalComments = visible => this.setState({ showModalComments: visible })


    handleModal = visible => this.setState({ showModal: visible })


    render() {

        const book_id = this.props.match.params.book_id

        return (
            
            <>
                {this.state.book
                    ?
                    <>
                    <h1 className="detailsTitle">{this.state.book.title}</h1>
                    <p className="detailsAuthor text-muted">{this.state.book.author}</p>
                    </>
                    :
                    <></>
                }
            
                <Container className="book-details paddingTop70">

                    {this.state.book
                        ?
                        <>

                            <Row>

                                <Col md={6} >

                                    <img className="bookImg" src={this.state.book.imageUrl} alt={this.state.book.title} />

                                    {
                                        this.state.book.rating === "1" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                            </Row>
                                            
                                            :

                                        this.state.book.rating === "2" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                            </Row>
                                            
                                            :
                                                
                                        this.state.book.rating === "3" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                            </Row>
                                            
                                            :
                                
                                        this.state.book.rating === "4" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                            </Row>
                                            
                                            :
                                                        
                                        this.state.book.rating === "5"
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                                <img src={starGold} alt={this.state.book.rating} />
                                            </Row>
                            
                                            :

                                            <Row className="star">
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                                <img src={starGrey} alt={this.state.book.rating} />
                                            </Row>
                                    }

                                    <h3 className="paddingTop70">COMENTARIOS:</h3>

                                    {this.state.comments
                                        ?
                                        <>
                                            {this.state.comments.map(elm => <p>{elm.description}. <small>({elm.user.name})</small></p>)}
                                        </>
                                        :
                                        <p>Sin comentarios</p>
                                        }

                                </Col>

                                <Col md={6}>

                                    <h3>Descripción</h3>

                                    <p className="text-justify">{this.state.book.description}</p>

                                        <hr/>
                                        
                                        <p className="btnSeparation">Precio: {this.state.book.price} €</p>

                                    {this.props.loggedUser ? <Button className="btnDetails" onClick={() => this.handleModalComments(true)} variant="#272643" size="sm">Crear comentario</Button> : <></>}

                                    {this.props.loggedUser
                                        ?
                                        this.state.book.owner === this.props.loggedUser._id
                                        ?
                                            <Button className="btnDetails" onClick={() => this.handleModal(true)} variant="#272643" size="sm">Editar</Button>
                                        :
                                        <></>
                                        :
                                        <></>
                                    }

                                    {this.state.book.exchange === true && this.props.loggedUser
                                        ?
                                            <Link to="/libros" className="btn btnDetails btn-sm">Intercambiar</Link>
                                        :
                                        <></>
                                    }
                                    
                                    {this.state.book.sale === true && this.props.loggedUser
                                        ?
                                            <Link to="/libros" className="btn btnDetails btn-sm">Comprar</Link>
                                        :
                                        <></>
                                    }
                                    
                                    <Link to="/libros" className="btn btnDetails btn-sm">Volver</Link>
                                    
                                </Col>

                            </Row>

                        </>

                        :

                        <h1>Cargando...</h1>
                    }

                    <Modal show={this.state.showModal} onHide={() => this.handleModal(false)}>
                        
                        <Modal.Body>
                            <BookEdit closeModal={() => this.handleModal(false)} updateList={this.refreshBooks} loggedUser={this.props.loggedUser} book_id={book_id} />
                        </Modal.Body>

                    </Modal>


                    <Modal show={this.state.showModalComments} onHide={() => this.handleModalComments(false)}>

                        <Modal.Body>
                            <CommentForm {...this.props} closeModal={() => this.handleModalComments(false)} updateListComments={this.refreshComments} />
                        </Modal.Body>
                    
                    </Modal>

                </Container>
            </>
        )
    }
}



export default BookDetails
