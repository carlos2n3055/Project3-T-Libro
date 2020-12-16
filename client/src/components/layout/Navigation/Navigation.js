import React, { Component } from 'react'
import { Link } from 'react-router-dom'

import { Navbar, Nav } from 'react-bootstrap'
import './Navigation.css'
import logo from './logo.png'

import AuthService from './../../../service/auth.service'

import Alert from './../../shared/Alert/Alert'



class Navigation extends Component {

    constructor() {
        super()
        this.state = {
            showToast: false,
            toastText: ''
        }
        this.authService = new AuthService()
    }


    logOut = () => {
        this.authService
            .logout()
            .then(res => this.props.storeUser(undefined))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


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

                        <Link className="navHover" to="/">Home</Link>

                        <Link className="navHover" to="/libros">Libros</Link>

                        {
                            this.props.loggedUser
                                ?
                                <>
                                    
                                    <Link className="navHover" to="/perfil">Perfil</Link>

                                    <Link className="navHover" onClick={this.logOut} to="/">Cerrar sesión</Link>
                                    
                                </>    
                                :
                                <>

                                    <Link className="navHover" to="/registro">Registro</Link>

                                    <Link className="navHover" to="/inicio-sesion">Inicio sesión</Link>

                                </>
                        }

                    </Nav>

                </Navbar.Collapse>

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </Navbar>
        )
    }
}



export default Navigation
