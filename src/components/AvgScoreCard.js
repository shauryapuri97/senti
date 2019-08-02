import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'

class AvgScoreCard extends React.Component {

    render() {

        return (
            <Card style={{ backgroundColor:this.props.company.color, marginLeft:'55px', width: '4.8rem', height: '4.5rem'}}>
                <Card.Body><strong>
                    <Card.Subtitle>{this.props.company.id}</Card.Subtitle>
                    <Card.Text>0.5</Card.Text>
                </strong></Card.Body>
            </Card>
        )
    }
};

export default AvgScoreCard;