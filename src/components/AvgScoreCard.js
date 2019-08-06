import React, {useState} from 'react';
import Card from 'react-bootstrap/Card'
import Badge from 'react-bootstrap/Badge'

class AvgScoreCard extends React.Component {

    render() {

        return (
            <Badge style={{ backgroundColor:this.props.company.color, color: '#eee', marginLeft:'55px' }}variant="dark">{this.props.company.id+'    '+this.props.company.avgScore}</Badge>
        )
    }
};

export default AvgScoreCard;