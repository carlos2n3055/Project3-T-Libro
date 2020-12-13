import React, { Component } from 'react'

import './Home.css'


import BackgroundVideo from './../backgroundVideo/BackgroundVideo'

import Container from 'react-bootstrap/Container'


class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
        
    }

    render() {

        return (
            <>
                <header className="hero">

                    <BackgroundVideo />

                    <div className="homeText">

                        <h1>T-Libro</h1>
                        <p>Tu aplicacion perfecta para intercambiar y vender tus libros...</p>

                    </div>

                    
                </header>

                <div className="textOverVideo">

                </div>
                <Container fluid="lg" as="section" className="containerHome">
                    
                        

                        
                </Container>

            </>
        )
    }
}
export default Home




