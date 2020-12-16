import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import BookEdit from './../Book-edit/Book-edit'
import Popup from './../../shared/Popup/Popup'

import { Col, Card, ButtonGroup, Button } from 'react-bootstrap'
import './MyBook-card.css'


class MyBookCard extends Component {

    constructor(props) {

        super(props)
    
        this.state = {
            showModal: false
            // showToast: false,
            // toastText: ''
        }
    }

    handleModal = visible => this.setState({ showModal: visible })


    render() {

        return (

            <Col className="myBook-card text-center" lg={4}>

                <Card.Img variant="top" src={this.props.imageUrl} />

                <Card.Body>

                    <Card.Title as="h3">{this.props.title}</Card.Title>
                    <Card.Subtitle as="h5" className="text-muted">{this.props.author}</Card.Subtitle>

                    <Button className="btnDetails" onClick={() => this.handleModal(true)} variant="#272643" size="sm">Editar</Button>
                
                    {/* <ButtonGroup>
                        <Link className="btn" to={`/libros/${_id}`}>Eliminar</Link>
                    </ButtonGroup> */}

                </Card.Body>
                
                <Popup show={this.state.showModal} handleModal={this.handleModal} title="Editar libro">
                        
                    <BookEdit closeModal={() => this.handleModal(false)} updateMyList={this.props.updateList} loggedUser={this.props.loggedUser} book_id={this.props._id} />
                        
                </Popup>

            </Col>
        )

    }

}



export default MyBookCard
 
