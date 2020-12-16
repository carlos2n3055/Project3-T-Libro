import React, { Component } from 'react'

// Components
import exchange from './exchange.jpeg'
import sale from './sale.jpg'
import comments from './comments.jpg'
import register from './register.jpg'
import BackgroundVideo from '../BackgroundVideo/BackgroundVideo'

// Styles
import { Col, Container, Row } from 'react-bootstrap'
import './Home.css'



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

                            <div className="info">
                                <div>
                                    <img src={exchange} alt="exchange"/>
                                </div>
                                <div className="infoText">
                                    <h4>Intercambia</h4>
                                    <p>Los libros que ya hayas leído y ocupan espacio, por aquellos que sean de tu interés. </p>
                                </div>
                            </div>

                            <div className="info">
                                <div>
                                    <img src={sale} alt="sale"/>
                                </div>   
                                <div className="infoText">
                                    <h4>Vende</h4>
                                    <p>Al mejor precio los libros que ya no quieras tener en casa. </p>
                                </div>
                            </div>

                        </Col>
                        
                        <Col lg={6}>

                            <div className="info">
                                <div>
                                    <img src={comments} alt="comments"/>
                                </div>
                                <div className="infoText">
                                    <h4>Comenta</h4>
                                    <p>Comparte con la comunidad tu opinión de los libros que hayas leído. </p>
                                </div>
                            </div>

                            <div className="info">
                                <div>
                                    <img src={register} alt="register"/>
                                </div>
                                <div className="infoText">
                                    <h4>Registrate</h4>
                                    <p>Para poder disfrutar de tu aplicación. </p>
                                </div>
                            </div>

                        </Col>

                    </Row>

                </Container>
          
            </>
        )
    }
}



export default Home
