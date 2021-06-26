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
    errors :{
      event_time_clash : false,
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
     return false;
   }
   return true;
 }


    


  onButtonClick = async ()=>{
    //check
   const ok =await this.helper(this.state.start_at, this.state.end_at);
   if(ok)
   await this.props.addEventAction(this.props.teacher_id, this.state);
   else {
     this.setState({errors:{
       event_time_clash:true
     }})
   }
  }

   
   
    
    render(){
      
      const error_div = (
        this.state.errors.event_time_clash?
        <div>error</div>:
        <div></div>
        
      )

      const  ret = (
            <div class="container">
                    <Input 
                      placeholder='Task Title'
                      value = {this.state.title}
                      onChange = {
                        (e)=>{
                          this.setState({title:e.target.value});
                        }
                      }
                      />
                    <Input 
                      placeholder='Enter Description'
                      value = {this.state.description}
                      onChange = {
                        (e) =>{
                          this.setState({description:e.target.value})
                        }
                      }
                      
                      />
    
                    <div className = "custom-contain">
                        <label class="custom-radio-btn left">
                        <span class="label">High priority</span>
                        <input type="radio" name="sample" checked/>
                        <span class="checkmark"></span>
                        </label>
                        <label class="custom-radio-btn left">
                        <span class="label">Medium priority</span>
                        <input type="radio" name="sample" />
                        <span class="checkmark"></span>
                        </label>
                        <label class="custom-radio-btn left">
                        <span class="label">Low priority</span>
                        <input type="radio" name="sample" />
                        <span class="checkmark"></span>
                        </label>
                        
                    </div>
                    <div className="date-input-container">
                    <div className='date-label'>Date</div> 
                    <div className='mdp-input'>
                     
                    <input type='date'
                     
                     onChange={this.updateDateFromInput} />
                   </div>
                   </div>


                    <div>
                        <label for="start-time">Start Time</label>    
                        <input type="time" placeholder="13:30" id="start-time"
                          value={this.state.start_at}
                          onChange={
                            (e) =>{
                              this.setState({start_at:e.target.value})
                            }
                          }
                        
                        ></input>
                        <label for="start-time">End Time</label>    
                        <input type="time" placeholder="13:30" id="end-time"
                          value={this.state.end_at}
                          onChange={
                            (e) =>{
                              this.setState({end_at:e.target.value})
                            }
                          }
                        ></input>
                    </div>
                    {error_div}
                    <Button
                      title='Create Event'
                      onClick={this.onButtonClick}
                    ></Button>

                    
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

