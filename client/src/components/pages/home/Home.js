import React, { Component } from 'react'

import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'

import exchange from './exchange.jpeg'
import sale from './sale.jpg'
import comments from './comments.jpg'
import register from './register.jpg'


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

                            <div className="align-items-center">
                                <div>
                                    <img src={exchange} />
                                </div>
                                <div>
                                    <h4>Intercambia</h4>
                                    <p>Intercambia tus libros que ya te hayas leido y ocupan espacio, por aquellos que te llamen la atención </p>
                                </div>
                            </div>

                            <div>
                                <img src={sale} />
                                <h4>Vende</h4>
                                <p>Vende al mejor precio los libros que ya no quieras tener en casa  </p>
                            </div>
                        </Col>
                        
                   

                   

                        <Col lg={6}>
                            <div>
                                <img src={comments} />
                                <h4>Comenta</h4>
                                <p>Comparte con la comunidad tu opinion de los libros que ya has leido </p>
                            </div>

                            <div>
                                <img src={register} />
                                <h4>Registrate</h4>
                                <p>Para poder disfrutar de tu aplicacion tienes que registrarte y logearte </p>
                            </div>
                        </Col>

                      
                        
                    </Row>



                    

                </Container>
          

            </>
        )
    }
}
export default Home




