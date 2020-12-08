import React, { Component } from 'react'
import AuthService from './../../../service/auth.service'

import { Container, Row, Col, Form, Button } from 'react-bootstrap'


class Signup extends Component {

    constructor() {

        super()

        this.state = {
            name: '',
            lastname: '',
            img: '',
            email: '',
            password: ''
        }

        this.authService = new AuthService()

    }

    handleInputChange = e => this.setState({ [e.target.name]: e.target.value })

    handleSubmit = e => {

        e.preventDefault()

        this.authService
            .signup(this.state)
            .then(() => {

                this.props.history.push('/inicio-sesion')
            })
            .catch(err => console.log(err))
    }


    render() {

        return (

            <Container>

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
                                <Form.Label>Apellido</Form.Label>
                                <Form.Control type="text" name="lastname" value={this.state.lastname} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="email">
                                <Form.Label>Correo electronico</Form.Label>
                                <Form.Control type="text" name="email" value={this.state.email} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Form.Group controlId="password">
                                <Form.Label>Contraseña</Form.Label>
                                <Form.Control type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
                            </Form.Group>

                            <Button variant="dark" type="submit">Registrarme</Button>

                        </Form>

                    </Col>

                </Row>

            </Container>
        )
    }
}

export default Signup