import React, { Component } from 'react'

import { Col, Container, Row } from 'react-bootstrap'

import './Home.css'


import BackgroundVideo from './../backgroundVideo/BackgroundVideo'




class Home extends Component {

    constructor(props) {
        super(props)
        this.state = {
           
        }
        
    }

    render() {

        return (
            <>
                <header className="hero" >

                    <BackgroundVideo />

                    <div className="homeText">

                        <h1>T-Libro</h1>
                        <p>Tu aplicacion perfecta para intercambiar y vender tus libros...</p>

                    </div>

                </header>

                

                <Container className="textOverVideo">

                    <Row className="main">

                    

                        <Col lg={6}>

                            <div>
                                <h4>Intercambia</h4>
                                <p>Intercambia tus libros que ya te hayas leido y ocupan espacio, por aquellos que te llamen la atención </p>

                                <img></img>
                            </div>

                            <div>
                                <h4>Vende</h4>
                                <p>Vende al mejor precio los libros que ya no quieras tener en casa  </p>

                                <img></img>
                            </div>
                        </Col>
                        
                   

                   

                        <Col lg={6}>
                            <div>
                                <h4>Comenta</h4>
                                <p>Comparte con la comunidad tu opinion de los libros que ya has leido </p>
                                <img></img>
                            </div>

                            <div>
                                <h4>Registrate</h4>
                                <p>Para poder disfrutar de tu aplicacion tienes que registrarte y logearte </p>

                                <img></img>
                            </div>
                        </Col>

                      
                        
                    </Row>



                    

                </Container>
          

            </>
        )
    }
}
export default Home




