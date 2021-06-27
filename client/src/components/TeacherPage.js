import React from 'react';
import { connect } from 'react-redux';

import Modal from '../elements/Modal';
import Button from '../elements/Button';
import Header from '../elements/Header';

import CreateEvent from './CreateEvent';
import Calendar from './Calendar';
import EventList from './EventList';

import '../styles/TeacherPage.css'



class TeacherPage extends React.Component{

    state = {
        show : false,
    };

    onCancel = () =>{
        this.setState({ show : false});
    }

   


    render(){

       
        return (
            <div class="container">
                <Header></Header>
  
  <div class="layout">
    <div class="col col-main">
            
                
            <Calendar onChange={this.onChange}/>
            
            
    </div>
    <div class="col col-complementary" role="complementary">
    <EventList></EventList>
    <Button onClick= {()=>{
                this.setState({show:true})
                }}
                title ='Create Event'
                /> 
            <Modal  title='Create Event' 
            show={this.state.show} 
            onCancel={this.onCancel} >
                
   
            <CreateEvent></CreateEvent>
            </Modal>   
      
  </div>   
</div>


</div>












           
           
         
        );
    }
}

export default TeacherPage;