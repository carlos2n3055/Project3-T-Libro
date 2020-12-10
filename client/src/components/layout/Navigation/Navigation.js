import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap'
import './Navigation.css'
import logo from './logo.png'

import AuthService from './../../../service/auth.service'



class Navigation extends Component {

    constructor() {

        super()
        this.authService = new AuthService()
    }


    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => console.log(err))
    }


    render() {

        return (

            <Navbar className="navbar-custom" variant="dark" expand="md" >

                <Link to="/">

                    <Navbar.Brand >

                        <img
                            alt="Logotipo"
                            src={logo}
                            height="40"
                            className="d-inline-block align-top"
                        />

                    </Navbar.Brand>

                </Link>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">

                    <Nav className="ml-auto">

                        <Link to="/">
                            <Nav.Link as="div">Home</Nav.Link>
                        </Link>

                        <Link to="/libros">
                            <Nav.Link as="div">Libros</Nav.Link>
                        </Link>

                        {
                            this.props.loggedUser
                                ?
                                <>
                                    <Link to="/perfil">
                                        <Nav.Link as="div">Perfil</Nav.Link>
                                    </Link>

                                    <Nav.Link as="div" onClick={this.logOut}>Cerrar sesión</Nav.Link>
                                </>    
                                :
                                <>
                                    <Link to="/registro">
                                        <Nav.Link as="div">Registro</Nav.Link>
                                    </Link>

                                    <Link to="/inicio-sesion">
                                        <Nav.Link as="div">Inicio sesión</Nav.Link>
                                    </Link>
                                </>
                        }

                    </Nav>

                </Navbar.Collapse>

            </Navbar>
        )
    }
}



export default Navigation
