import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'

import Alert from './../../shared/Alert/Alert'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'



class Login extends Component {

    constructor() {
        super()
        this.state = {
            formInfo: {
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
            .login(this.state.formInfo)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/perfil')
            })
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


    render() {

        return (

            <Container className="paddingTop70">

                <Row>

                    <Col md={{ span: 6, offset: 3 }}>

                        <h1>Inicio de sesión</h1>

                        <hr />

                        <Form onSubmit={this.handleSubmit}>

                            <Form.Group controlId="email">
                                <Form.Label>Correo electrónico</Form.Label>
                                <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button variant="#272643" type="submit">Iniciar sesión</Button>

                        </Form>

                    </Col>

                </Row>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </Container>
        )
    }
}



export default Login
