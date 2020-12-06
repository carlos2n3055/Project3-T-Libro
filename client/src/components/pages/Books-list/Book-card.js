import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const BookCard = ({ title, author, image, _id, owner }) => {

    // status, exchange, price, sale,

    return (

        <Col lg={4}>

            <Card className="book-card">

                <Card.Img variant="top" src={image} />

                <Card.Body>

                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>
                    {/* {
                        owner === loggedUser._id
                            ?
                            <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                                <Button className="btn btn-dark">Editar</Button>
                                <Link className="btn btn-dark" to={`/montañas/${_id}`}>Ver detalles</Link>
                            </ButtonGroup>
                            :
                            <Link className="btn btn-dark btn-block btn-sm" to={`/montañas/${_id}`}>Ver detalles</Link>
                    } */}
                </Card.Body>
            </Card>
        </Col>
    )
}

export default BookCard 
