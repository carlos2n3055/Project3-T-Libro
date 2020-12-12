import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'



class Login extends Component {

    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
        this.authService = new AuthService()
    }


    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })


    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .login(this.state)
            .then(theLoggedInUser => {
                this.props.storeUser(theLoggedInUser.data)
                this.props.history.push('/perfil')
            })
            .catch(err => console.log({ err }))
    }


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

            </Container>
        )
    }
}



export default Login
