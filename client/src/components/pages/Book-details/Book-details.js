import React, { Component } from 'react'
import BooksService from '../../../service/books.service'

import starGold from './starGold.png'
import starGrey from './starGrey.png'

//import Loader from './../../shared/Spinner/Loader'

import { Container, Row, Col } from 'react-bootstrap'
import './Book-details.css'

import { Link } from 'react-router-dom'



class BookDetails extends Component {

    constructor() {

        super()
        this.state = {
            book: undefined
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


    render() {

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

                                <p>Comentarios: {this.state.book.comments}</p>

                                <Link to="/libros" className="btn btn-sm btn-dark">Intercambiar</Link>
                                <Link to="/libros" className="btn btn-sm btn-dark">Comprar</Link>
                                <Link to="/libros" className="btn btn-sm btn-dark">Volver</Link>

                            </Col>

                        </Row>
                    </>

                    :

                    <h1>Error</h1>
                }



            </Container>
        )
    }
}

export default BookDetails