import React from 'react';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';

import '../styles/TeacherCard.css';

import { setTeacheridAction } from '../actions';

class TeacherCard extends React.Component {

    clicked = ()=>{
        this.props.onClick(this.props.id);

    }
   
    render(){
        const VIEW_SCHEDULE = 'VIEW SCHEDULE';
       

        return (
        
            <div class="card">
                <img src="https://randomuser.me/api/portraits/women/3.jpg" alt=""/>
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
  