import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'

import { Link } from 'react-router-dom'

const BookCard = ({ title, author, image, _id, owner }) => {


    return (

        <Col lg={4}>

            <Card className="book-card">

                <Card.Img variant="top" src={image} />

                <Card.Body>

                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>

                    {
                        <ButtonGroup aria-label="Basic example" style={{ width: '100%' }}>
                            <Link className="btn btn-dark" to={`/libros/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    }

                </Card.Body>

            </Card>

        </Col>
    )
}



export default BookCard 
