import React, { Component } from 'react'

import TransationService from './../../../service/transation.service'

//import Loader from './../../shared/Spinner/Loader'  //SI DA TIEMPO PONEMOS SPINNER

import { Container, Row, Button, Modal } from 'react-bootstrap'



class Transations extends Component {

    constructor() {
        super()
        this.state = {
            transation: undefined
        }
        this.transitionService = new TransationService()
    }


    componentDidMount = () => {

        this.transitionService
            .getTransations()
            .then(res => this.setState({ transation: res.data }))
            .catch(err => console.log(err))
    }


    handleModal = visible => this.setState({ showModal: visible })


    render() {

        return (
            <>
                <Container>

                    <h1>Libros disponibles</h1>

                    {this.props.loggedUser && <Button onClick={() => this.handleModal(true)} variant="#272643" size="sm">Ver transacciones</Button>}

                </Container>

                <Modal className="font" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    
                    <Modal.Body>
                        
                    </Modal.Body>
                    
                </Modal>

            </>
        )
    }
}



export default Transations
