import React, { Component } from 'react'

// Services
import TransationService from './../../../service/transation.service'

// Components
import Alert from './../../shared/Alert/Alert'

// Styles
import { Container, Row, Button, Modal } from 'react-bootstrap'



class Transations extends Component {

    constructor() {
        super()
        this.state = {
            transation: undefined,
            showToast: false,
            toastText: ''
        }
        this.transitionService = new TransationService()
    }


    componentDidMount = () => {

        this.transitionService
            .getTransations()
            .then(res => this.setState({ transation: res.data }))
            .catch(err => this.setState({ showToast: true, toastText: err.response.data.message }))
    }


    handleModal = visible => this.setState({ showModal: visible })


    handleToast = (visible, text) => this.setState({ showToast: visible, toastText: text })


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

                <Alert show={this.state.showToast} handleToast={this.handleToast} toastText={this.state.toastText} />

            </>
        )
    }
}



export default Transations
