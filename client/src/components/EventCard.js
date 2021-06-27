
import React from 'react';

import '../styles/EventCard.css';
import '../styles/FormElements.css';


class EventCard extends React.Component{

    


    render(){
    const Months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec'];
    const idx = this.props.month-1;
    const month = Months[idx];
    const cor = '#caffba';
    const date = `${month} ${this.props.day}, ${this.props.year}`;
    const time_string = `${this.props.start_at} - ${this.props.end_at}`;



    return (
      
    <div className={`event-card ${this.props.priority}-priority`}>
	
	<div class="card-header">
		{this.props.title}
	</div>
	<div class="card-footer">
		
		<div class="card-meta card-meta--date">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" display="block" id="Calendar">
				<rect x="2" y="4" width="20" height="18" rx="4" />
				<path d="M8 2v4" />
				<path d="M16 2v4" />
				<path d="M2 10h20" />
			</svg>
            <div>{date}</div>
            
		</div>
        <div
        style={{color: '#787878'}} 
        >{time_string}</div>
	</div>
</div>
    )
    }
}

export default EventCard;