import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'

class NewsCard extends React.Component {
    render() {
        return (
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title>Card Title</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">Card Subtitle</Card.Subtitle>
                    <Card.Text>
                    Some quick example text to build on the card title and make up the bulk of
                    the card's content.
                    </Card.Text>
                    <Card.Link style={{ color: '#15598A'}}href="#">Card Link</Card.Link>
                </Card.Body>
            </Card>
        )
    }
};

export default NewsCard;