import { checkPropTypes } from 'prop-types';
import React from 'react';

import '../styles/EventCard.css';

const EventCard = (props) =>{
    const cor = '#caffba';
    return (
        <div className='event-container'
            styles = {{'background-color' :'#caffba'}}
        >
            <div className='title'>{props.title}</div>
            <div>{props.start_at} - {props.end_at}</div>
        </div>
    )
}

export default EventCard;