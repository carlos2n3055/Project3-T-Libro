import { Link } from 'react-router-dom'

import { Col, Card, ButtonGroup } from 'react-bootstrap'
import './Book-card.css'


const BookCard = ({ title, author, imageUrl, _id, owner }) => {


    return (

        <Col className="book-card text-center" lg={4}>

                <Card.Img variant="top" src={imageUrl} />

                <Card.Body>

                    <Card.Title as="h3">{title}</Card.Title>
                    <Card.Subtitle as="h5" className="text-muted">{author}</Card.Subtitle>

                    <ButtonGroup>
                        <Link className="btn" to={`/libros/${_id}`}>Ver detalles</Link>
                    </ButtonGroup>

                </Card.Body>

        </Col>
    )
}



export default BookCard 
