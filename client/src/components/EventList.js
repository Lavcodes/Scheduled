import React from 'react';
import { connect } from 'react-redux';

import EventCard from './EventCard';

import { filterEventsbyDay } from '../actions';

class EventList extends React.Component{

    componentDidMount = async () =>{
        console.log('mounting');
        
    }

    componentDidUpdate= async () =>{
        console.log('updating');
           
    }

    render(){
        const List = this.props.events_list.map((event)=>{
            return <EventCard title ={event.title} description ={event.description} start_at ={event.start_at} end_at = {event.end_at}/>
        })



        return(
            <div>{List}</div>
        )
    }
}

const mapStateToProps = ({events_list}) =>{
    return {
        
        events_list
        
    }
}

export default connect(mapStateToProps, {
    filterEventsbyDay
})(EventList);
