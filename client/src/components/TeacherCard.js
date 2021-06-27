import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import '../styles/TeacherCard.css';

import { setTeacheridAction } from '../actions';
import axios from 'axios';

class TeacherCard extends React.Component {

    clicked = async ()=>{
        console.log('here');
        console.log(this.props.id);
        await this.props.onClick(this.props.id);

    }
   
    render(){
        const VIEW_SCHEDULE = 'VIEW SCHEDULE';
    
        return (
        
            <div class="card">
                <img src={this.props.avatar} alt=""/>
                <h4>{this.props.name}</h4>
                <small>{this.props.department}</small>
                
                <button
                    onClick = {this.clicked}
                
                >{VIEW_SCHEDULE}</button>
                
            </div>
            


    );
    }
    
}
const mapStateToProps = (state) =>{
    return {
        teacher_id : state.teacher_id,
    }
  }
  
  export default connect(mapStateToProps,{
    setTeacheridAction
  })(TeacherCard);
  