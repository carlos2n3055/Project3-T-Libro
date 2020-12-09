import React, { Component } from 'react'

import CommentsService from '../../../service/comments.service'

import { Form, Button } from 'react-bootstrap'


class CommentForm extends Component {

    constructor(props) {
        
        super(props)

        this.state = {

            description: '',
            book: this.props.book_id ? this.props.book_id : ''  // ESTO FUNCIONAAAAA
            // owner: this.props.loggedUser ? this.props.loggedUser_id : ''
        }

        this.commentsService = new CommentsService()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {

        e.preventDefault()

        this.commentsService
            .saveComment(this.state)
            .then(res => this.setState({ comment: res.data }))
                // this.props.closeModal()
            // })
            .catch(err => console.log(err))
    }


    render() {

        return (
            <>
                <h1>Crear comentario</h1>
                <hr />

                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="description">
                        <Form.Label>Descripción</Form.Label>
                        <Form.Control type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="dark" type="submit">Crear comentario</Button>

                </Form>

            </>
        )
    }
}



export default CommentForm