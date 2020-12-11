import { Link } from 'react-router-dom'

import { Col, Card, Button, ButtonGroup } from 'react-bootstrap'
import './Book-card.css'


const BookCard = ({ title, author, image, _id, owner }) => {


    return (

        <Col lg={4}>

            <Card className="book-card text-center">

                {/* <Link to={`/libros/${_id}`}>
                    <Card.Img variant="top" src={image} />
                </Link> */}

                <Card.Img variant="top" src={image} />

                <Card.Body>

                    <Card.Title>{title}</Card.Title>
                    <Card.Subtitle>{author}</Card.Subtitle>

                    {
                        <ButtonGroup>
                            <Link className="btn" to={`/libros/${_id}`}>Ver detalles</Link>
                        </ButtonGroup>
                    }

                </Card.Body>

            </Card>

        </Col>
    )
}



export default BookCard 
