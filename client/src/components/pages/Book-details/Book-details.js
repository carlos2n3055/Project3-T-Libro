import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BooksService from '../../../service/books.service'
import CommentsService from '../../../service/comments.service'
import TransationsService from '../../../service/transation.service'
import Alert from './../../shared/Alert/Alert'

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
            comments: undefined,
            transations: {
                book_buyer: [],
                book_owner: undefined,
                buyer: undefined,
                owner: undefined
            },
            showToast: false,
            toastText: ''
        }
        this.booksService = new BooksService()
        this.commentsService = new CommentsService()
        this.transationsService = new TransationsService()
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
        
        this.booksBuyer()
        this.commentsServ()
    }
        
        
    booksBuyer = () => {

        const buyer_id = this.props.loggedUser._id

        this.booksService
            .getBooksBuyer(buyer_id)
            .then(res => this.setState({ transations: { owner: this.state.book.owner, buyer: this.props.loggedUser._id, book_buyer: res.data, book_owner: this.props.match.params.book_id } }))
            .catch(err => console.log(err))
    }
        

    refreshComments = () => this.commentsServ()


    handleModalComments = visible => this.setState({ showModalComments: visible })


    handleModal = visible => this.setState({ showModal: visible })


    transation = () => {

        this.transationsService
            .saveTransation(this.state.transations)
            .then(res => this.setState({ showToast: true, toastText: 'Su petición se ha enviado al dueño del libro' }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        const book_id = this.props.match.params.book_id

        return (
            
            <>
                {this.state.book
                    ?
                    <>
                        <h1 className="detailsTitle book-details">{this.state.book.title}</h1>
                        <p className="detailsAuthor book-details text-muted">{this.state.book.author}</p>
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
                                                <img src={starGold} alt="firstStar" />
                                                <img src={starGrey} alt="secondStar" />
                                                <img src={starGrey} alt="thirdStar" />
                                                <img src={starGrey} alt="fourthStar" />
                                                <img src={starGrey} alt="fifthStar" />
                                            </Row>
                                            
                                            :

                                        this.state.book.rating === "2" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt="firstStar" />
                                                <img src={starGold} alt="secondStar" />
                                                <img src={starGrey} alt="thirdStar" />
                                                <img src={starGrey} alt="fourthStar" />
                                                <img src={starGrey} alt="fifthStar" />
                                            </Row>
                                            
                                            :
                                                
                                        this.state.book.rating === "3" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt="firstStar" />
                                                <img src={starGold} alt="secondStar" />
                                                <img src={starGold} alt="thirdStar" />
                                                <img src={starGrey} alt="fourthStar" />
                                                <img src={starGrey} alt="fifthStar" />
                                            </Row>
                                            
                                            :
                                
                                        this.state.book.rating === "4" 
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt="firstStar" />
                                                <img src={starGold} alt="secondStar" />
                                                <img src={starGold} alt="thirdStar" />
                                                <img src={starGold} alt="fourthStar" />
                                                <img src={starGrey} alt="fifthStar" />
                                            </Row>
                                            
                                            :
                                                        
                                        this.state.book.rating === "5"
                                            ?
                                            <Row className="star">
                                                <img src={starGold} alt="firstStar" />
                                                <img src={starGold} alt="secondStar" />
                                                <img src={starGold} alt="thirdStar" />
                                                <img src={starGold} alt="fourthStar" />
                                                <img src={starGold} alt="fifthStar" />
                                            </Row>
                            
                                            :

                                            <Row className="star">
                                                <img src={starGrey} alt="firstStar" />
                                                <img src={starGrey} alt="secondStar" />
                                                <img src={starGrey} alt="thirdStar" />
                                                <img src={starGrey} alt="fourthStar" />
                                                <img src={starGrey} alt="fifthStar" />
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

                                <Col className= "book-details" md={6}>

                                    <h3 className="book-details">Descripción</h3>

                                    <p className="text-justify">{this.state.book.description}</p>

                                    <hr />
                                    
                                    {this.state.book.sale === true && <p className="btnSeparation">Precio: {this.state.book.price} €</p>}

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

                                    {/* {this.state.book.exchange === true && this.props.loggedUser
                                        ?
                                            <Link to="/libros" className="btn btnDetails btn-sm">Intercambiar</Link>
                                        :
                                        <></>
                                    } */}

                                    {this.state.book.exchange === true && this.props.loggedUser
                                        ?
                                            <Button className="btnDetails" onClick={() => this.transation()} variant="#272643" size="sm">Intercambiar</Button>
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

                    <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

                </Container>
            </>
        )
    }
}



export default BookDetails
