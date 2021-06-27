import { checkPropTypes } from 'prop-types';
import React from 'react';

import '../styles/EventCard.css';

const EventCard = (props) =>{
    const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const idx = props.month-1;
    const month = Months[idx];
    const cor = '#caffba';
    const date = `${month} ${props.day}, ${props.year}`;
    const time_string = `${props.start_at} - ${props.end_at}`;
    return (
        <div className="event-card">
	
	<div class="card-header">
		{props.title}
	</div>
	<div class="card-footer">
		
		<div class="card-meta card-meta--date">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round" display="block" id="Calendar">
				<rect x="2" y="4" width="20" height="18" rx="4" />
				<path d="M8 2v4" />
				<path d="M16 2v4" />
				<path d="M2 10h20" />
			</svg>
            <div>{date}</div>
            
		</div>
        <div
        style={{color: '#787878'}} 
        >{date}</div>
	</div>
</div>
    )
}

export default EventCard;