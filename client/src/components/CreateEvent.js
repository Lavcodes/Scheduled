import React from 'react';
import { connect } from 'react-redux';

import '../styles/FormElements.css'

import Modal from '../elements/Modal';
import Input from '../elements/Input';
import Button from '../elements/Button';

import { addEventAction, setDate, filterEventsbyDay } from '../actions';

class CreateEvent extends React.Component{


  state = {
    title : '',
    description : '',
    day : '',
    month : '',
    year : '',
    start_at : '',
    end_at : '', 
    is_error:false,
    errors :{
      event_time_clash : false,
      title_empty : false,
      date_empty:false,
      start_at_empty : false,
      end_at_empty:false,
      start_greater_end:false,
    } 
  }

  

  getDateFromDateString = (dateValue) => {
    let dateData = dateValue.split('-').map(d=>parseInt(d, 10));
    if(dateData.length < 3) 
        return null;

    const year = dateData[0];
    const month = dateData[1];
    const date = dateData[2];
    return {year, month, date};
}

updateDateFromInput =(e)=> {
  const dateValue=e.target.value;
  
  const dateData = this.getDateFromDateString(dateValue);
  if(dateData !== null) { 
      this.setState({
        day : dateData.date,
        year : dateData.year,
        month : dateData.month
      });
      
  }
}

 helper = async (start_at, end_at) =>{
   
   await this.props.setDate(this.state.year,this.state.month,this.state.day);
   

   await this.props.filterEventsbyDay();
  
    const events = this.props.events_list;
   let problem = false;
   const s_e = events.map((event)=>{
     if(event.start_at<=start_at && event.end_at>=end_at){
       problem=true;
     }
     return event;
   });
   if(problem){
    this.setState({errors:{
      event_time_clash:true
    }});
   
   }
   return true;
 }

 check_errors = () =>{
   let ret =true;
   if(this.state.title===''){
     ret=false;
     this.setState({errors:{title_empty:true}});
   }
   if(this.state.start_at===''){
     ret=false;
     this.setState({errors : {start_at_empty:true}});
   }
   if(this.state.end_at===''){
     ret=false;
     this.setState({errors :{end_at_empty:true}});
   }
  /* if(this.state.day===''||this.state.month===''||this.state.year===''){
     ret=false;
     this.setState({errors:{date_empty:true}});
   }*/
   if(this.state.start_at>this.state.end_at){
     ret=false;
     this.setState({errors:{start_greater_end:true}});
   }
 }
    


  onButtonClick = async ()=>{
    //check
   const ok =await this.helper(this.state.start_at, this.state.end_at);
   const ok2=this.check_errors();
   
   
   await this.props.addEventAction(this.props.teacher_id, this.state);
   
   
  }

   
   
    
    render(){
      
      const time_clash_div = (
        this.state.errors.event_time_clash?
        <div>Another Event has been Scheduled during this time.</div>:
        <div></div>)
      const title_empty_div=(
        this.state.errors.title_empty?
          <div> Event must have a title.</div>:
        <div></div>
      )
      const start_at_empty_div=(
        this.state.errors.start_at_empty?
          <div> Event must have a start time.</div>:
        <div></div>
      )
      const end_at_empty_div=(
        this.state.errors.end_at_empty?
          <div> Event must have an end time.</div>:
        <div></div>
      )
      const date_empty_div = (
        this.state.errors.date_empty?
          <div> Event must have a date.</div>:
        <div></div>
      )
      const start_greater_end_div =(
        this.state.errors.start_greater_end?
          <div>Start time of event must be before end time.</div>:
        <div></div>
      )

      const error_div = (
        this.state.is_error?
      <div className="error-div">
      {time_clash_div}
      {title_empty_div}
      {start_at_empty_div}
      {end_at_empty_div}
      {date_empty_div}
      {start_greater_end_div}
    </div>:<div></div>
      )


      
     

      const  ret = (
            <div class="container">
                    <Input 
                      placeholder='Task Title'
                      value = {this.state.title}
                      onChange = {
                        (e)=>{
                          this.setState({is_error:false});
                          this.setState({title:e.target.value});
                        }
                      }
                      />
                    <Input 
                      placeholder='Enter Description'
                      value = {this.state.description}
                      onChange = {
                        (e) =>{
                          this.setState({is_error:false});
                          this.setState({description:e.target.value})
                        }
                      }
                      
                      />
    
                    
                    <div className="date-input-container">
                    <div className='date-label'>Date</div> 
                    <div className='mdp-input'>
                     
                    <input type='date'
                     
                     onChange={this.updateDateFromInput }/>
                   </div>
                   </div>


                    <div className="start-end-box">
                        <div className="time-input-single">
                        <label for="start-time">Start Time</label>    
                        <input type="time" placeholder="13:30" id="start-time"
                          value={this.state.start_at}
                          onChange={
                            (e) =>{
                              this.setState({is_error:false});
                              this.setState({start_at:e.target.value})
                            }
                          }
                        
                        ></input>
                        </div>
                        <div className="time-input-single">
                        <label for="start-time">End Time</label>    
                        <input type="time" placeholder="13:30" id="end-time"
                          value={this.state.end_at}
                          onChange={
                            (e) =>{
                              this.setState({is_error:false});
                              this.setState({end_at:e.target.value})
                            }
                          }
                        ></input>
                        </div>
                    </div>
                    
                    <Button
                      title='Create Event'
                      onClick={this.onButtonClick}
                    ></Button>
                    {error_div}
                    
                    </div>
        );
    

        return(
            
                  <div>
                    {ret}
                    
                  </div>
                

        );
                }
}

const mapStateToProps = (state) =>{
  return {
      events_list : state.events_list,
      teacher_id : state.teacher_id,
      teachers_list : state.teachers_list
  }
}

export default connect(mapStateToProps,{
  addEventAction,
  filterEventsbyDay,
  setDate
})(CreateEvent);

