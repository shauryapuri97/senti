import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Badge from 'react-bootstrap/Badge'

class NewsCard extends React.Component {

    render() {

        return (
            <Card style={{ width: '22rem' }}>
                <Card.Body>
                    <Badge style={{ backgroundColor:this.props.company.color, color: '#eee' }}variant="dark">{this.props.companyID}</Badge>
                    <Card.Title>{this.props.title}</Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{this.props.subtitle}</Card.Subtitle>
                    <Card.Text>{this.props.text.substring(0, 150)} ...</Card.Text>
                    {/* <Card.Link style={{ color: '#15598A'}} href="#">{this.props.link}</Card.Link> */}
                    <Button onClick={() => {
                        this.props.updateSelectedNews(this.props.postId);
                        this.props.setLgShow(true);
                    }}>Read More</Button>
                </Card.Body>
            </Card>
        )
    }
};

export default NewsCard;