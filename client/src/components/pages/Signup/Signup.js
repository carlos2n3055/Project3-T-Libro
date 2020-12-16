import React, { Component } from 'react'

// Services
import AuthService from './../../../service/auth.service'

// Components
import Alert from './../../shared/Alert/Alert'

// Styles
import { Container, Row, Col, Form, Button } from 'react-bootstrap'



class Signup extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
                name: '',
                lastname: '',
                img: '',
                email: '',
                password: ''
            },
            showToast: false,
            toastText: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => this.setState({ formInfo: { ...this.state.formInfo, [e.target.name]: e.target.value } })


    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state.formInfo)
            .then(() => this.props.history.push('/inicio-sesion'))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        return (

            <Container className="paddingTop70">

                <Row>

                    <Col md={{ span: 6, offset: 3 }}>

                        <h1>Registro de usuario</h1>

                        <hr />

                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="name">
                                <Form.Label>Nombre</Form.Label>
                                <Form.Control type="text" name="name" value={this.state.name} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="lastname">
                                <Form.Label>Apellidos</Form.Label>
                                <Form.Control type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button variant="#272643" type="submit">Registrarme</Button>

                        </Form>

                    </Col>

                </Row>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </Container>
        )
    }
}



export default Signup
