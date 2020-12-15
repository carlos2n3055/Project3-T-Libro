import React, { Component } from 'react'

import CommentsService from '../../../service/comments.service'
import Alert from './../../shared/Alert/Alert'

import { Form, Button } from 'react-bootstrap'



class CommentForm extends Component {

    constructor(props) {
        super(props)
        this.state = {
            description: '',
            book: this.props.match.params.book_id ? this.props.match.params.book_id : '',
            user: this.props.loggedUser ? this.props.loggedUser._id : '',
            showToast: false,
            toastText: ''
        }
        this.commentsService = new CommentsService()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {

        e.preventDefault()

        this.commentsService
            .saveComment(this.state)
            .then(res => { 
                this.setState({ comment: res.data })
                this.props.updateListComments()
                this.props.closeModal()
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }

    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        return (
            <>
                <h4>Crear comentario</h4>

                <hr />

                <Form onSubmit={this.handleSubmit}>

                    <Form.Group controlId="description">
                        <Form.Control as="textarea" rows={6} type="text" name="description" value={this.state.description} onChange={this.handleInputChange} />
                    </Form.Group>

                    <Button variant="#272643" type="submit">Crear comentario</Button>

                    <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

                </Form>

            </>
        )
    }
}



export default CommentForm
