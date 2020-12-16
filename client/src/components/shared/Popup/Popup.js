import { Modal } from 'react-bootstrap'



const Popup = ({ show, title, handleModal, children }) => {

    return (
        
        <Modal show={show} onHide={() => handleModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title><h2>{title}</h2></Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {children}
            </Modal.Body>
        </Modal>

    )
    
}



export default Popup