import { Toast } from 'react-bootstrap'

import logo from './logo.png'



const Alert = ({ show, toastText, handleToast }) => {

    return (

        <Toast className="toastHeader" show={show} onClose={() => handleToast(false)} delay={3000} autohide style={{ position: 'fixed', bottom: 50, right: 10, width: 500 }}>
            <Toast.Header>
                <img src={logo} className="rounded mr-2" alt="logo" style={{ width: 30, height: 30 }} />
                <strong className="mr-auto">Mensaje del sistema</strong>
            </Toast.Header>
            <Toast.Body>{toastText}</Toast.Body>
        </Toast>

    )
    
}



export default Alert