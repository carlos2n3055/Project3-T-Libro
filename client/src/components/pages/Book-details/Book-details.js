import React, { Component } from 'react'
import { Link } from 'react-router-dom'

// Services
import BooksService from '../../../service/books.service'
import CommentsService from '../../../service/comments.service'
import TransationsService from '../../../service/transation.service'

// Components
import Alert from './../../shared/Alert/Alert'
import Popup from './../../shared/Popup/Popup'
import CommentForm from './../Comment-form/Comment-form'

import oneStar from './oneStar.png'
import twoStars from './twoStars.png'
import threeStars from './threeStars.png'
import fourStars from './fourStars.png'
import fiveStars from './fiveStars.png'
import starsGrey from './starsGrey.png'

// Styles
import { Container, Row, Col, Button } from 'react-bootstrap'
import './Book-details.css'



class BookDetails extends Component {

    constructor(props) {

        super(props)
    
        this.state = {
            book: undefined,
            showModalComments: false,
            comments: undefined,
            transations: {
                book_buyer: [],
                book_owner: undefined,
                buyer: undefined,
                owner: undefined,
                buy: false
            },
            showToast: false,
            toastText: ''
        }
        this.booksService = new BooksService()
        this.commentsService = new CommentsService()
        this.transationsService = new TransationsService()
    }
       

    componentDidMount = () => {

        const book_id = this.props.match.params.book_id

        this.booksService
            .getBook(book_id)
            .then(res => {
                this.setState({ book: res.data })
                this.props.loggedUser && this.booksBuyer()
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
        
        this.commentsBook()
    }


    booksBuyer = () => {

    const buyer_id = this.props.loggedUser._id

    this.booksService
        .getBooksBuyer(buyer_id)
        .then(res => this.setState({ transations: { owner: this.state.book.owner, buyer: this.props.loggedUser._id, book_buyer: res.data, book_owner: this.props.match.params.book_id } }))
        .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    commentsBook = () => {

        const book_id = this.props.match.params.book_id
        
        this.commentsService
            .getComments(book_id)
            .then(res => this.setState({ comments: res.data }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }
        

    refreshComments = () => this.commentsBook()


    handleModalComments = visible => this.setState({ showModalComments: visible })


    transation = () => {

        this.transationsService
            .saveTransation(this.state.transations)
            .then(res => this.setState({ showToast: true, toastText: 'Su petición se ha enviado al dueño del libro.' }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    buy = () => {

        this.transationsService
            .saveTransation(this.state.transations)
            .then(res => this.changeTransationBuy(res.data._id))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    changeTransationBuy = (trans_id) => {

        this.transationsService
            .changeTransationBuy(trans_id)
            .then(res => this.setState({ showToast: true, toastText: 'Su compra se ha realizado con éxito. El dueño se pondrá en contacto con usted.' }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        const book_id = this.props.match.params.book_id

        return (
            
            <>
                {this.state.book
                    &&
                    <>
                        <h1 className="detailsTitle book-details-font">{this.state.book.title}</h1>
                        <p className="detailsAuthor book-details-font text-muted">{this.state.book.author}</p>
                    </>
                }
            
                <Container className="book-details book-details-font paddingTop70">

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
                                                <img src={oneStar} alt="oneStar" />
                                            </Row>
                                            
                                            :

                                        this.state.book.rating === "2" 
                                            ?
                                            <Row className="star">
                                                <img src={twoStars} alt="twoStars" />
                                            </Row>
                                            
                                            :
                                                
                                        this.state.book.rating === "3" 
                                            ?
                                            <Row className="star">
                                                <img src={threeStars} alt="threeStars" />
                                            </Row>
                                            
                                            :
                                
                                        this.state.book.rating === "4" 
                                            ?
                                            <Row className="star">
                                                <img src={fourStars} alt="fourStars" />
                                            </Row>
                                            
                                            :
                                                        
                                        this.state.book.rating === "5"
                                            ?
                                            <Row className="star">
                                                <img src={fiveStars} alt="fiveStars" />
                                            </Row>
                            
                                            :

                                            <Row className="star">
                                                <img src={starsGrey} alt="starsGrey" />
                                            </Row>
                                    }

                                    <h3 className="paddingTop70">COMENTARIOS:</h3>

                                    {this.state.comments
                                        ?
                                        <>
                                            {this.state.comments.map(elm => <p key={elm._id}>{elm.description}. <small>({elm.user.name})</small></p>)}
                                        </>
                                        :
                                        <p>Sin comentarios</p>
                                        }

                                </Col>

                                <Col className= "book-details-font" md={6}>

                                    <h3 className="book-details-font">Descripción</h3>

                                    <p className="text-justify">{this.state.book.description}</p>

                                    <hr />
                                    
                                    {this.state.book.sale === true && <p className="btnSeparation">Precio: {this.state.book.price} €</p>}

                                    {this.props.loggedUser && <Button className="btnDetails" onClick={() => this.handleModalComments(true)} variant="#272643" size="sm">Crear comentario</Button>}

                                    {this.state.book.exchange === true && this.props.loggedUser
                                        &&
                                        <Button className="btnDetails" onClick={() => this.transation()} variant="#272643" size="sm">Intercambiar</Button>
                                    }

                                    {this.state.book.sale === true && this.props.loggedUser
                                        &&
                                        <Button className="btnDetails" onClick={() => this.buy()} variant="#272643" size="sm">Comprar</Button>
                                    }
                                    
                                    <Link to="/libros" className="btn btnDetails btn-sm">Volver</Link>
                                    
                                </Col>

                            </Row>

                        </>

                        :

                        <h1>Cargando...</h1>
                    }

                    <Popup show={this.state.showModalComments} handleModal= {this.handleModalComments} title="Crear comentario">

                      <CommentForm {...this.props} closeModal={() => this.handleModalComments(false)} updateListComments={this.refreshComments} />
                    
                    </Popup>

                    <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

                </Container>
            </>
        )
    }
}



export default BookDetails
