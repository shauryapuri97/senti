import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import renderHTML from 'react-render-html';
import Button from 'react-bootstrap/Button'

class NewsCard extends React.Component {

    render() {

        return (
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                    <Card.Text>{this.props.text.substring(0, 150)} ...</Card.Text>
                    <Card.Link style={{ color: '#15598A'}} href="#">{this.props.link}</Card.Link>
                </Card.Body>
            </Card>
        )
    }
};

export default NewsCard;