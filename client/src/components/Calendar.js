import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';

import '../styles/Calendar.css'

import { setDate,filterEventsbyDay } from '../actions';

//component to create calendar view 

let oneDay = 60 * 60 * 24 * 1000;
let todayTimestamp = Date.now() - (Date.now() % oneDay) + (new Date().getTimezoneOffset() * 1000 * 60);
let inputRef = React.createRef();



class MyDatePicker extends Component {

    state = {
        getMonthDetails: []
    }

    //constructor 
    //inbuilt Javascript API 
    constructor() {
        super();
        let date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth();
        this.state = {
            year,
            month,
            selectedDay: todayTimestamp,
            monthDetails: this.getMonthDetails(year, month)
        }
    }

    async componentDidMount() {
        window.addEventListener('click', this.addBackDrop);
        this.setDateToInput(this.state.selectedDay);
        console.log(this.props.date);
        const response = await this.props.filterEventsbyDay();
        
        
    }

    componentWillUnmount() {
        window.removeEventListener('click', this.addBackDrop);
    }

    addBackDrop =e=> {
        if(this.state.showDatePicker && !ReactDOM.findDOMNode(this).contains(e.target)) {
            this.showDatePicker(false);
        }
    }

    showDatePicker =(showDatePicker=true)=> {
        this.setState({ showDatePicker })
    }

    //logic for populating the calendar

    daysMap = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    monthMap = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    getDayDetails = (args) => {
        const date = args.index - args.firstDay; 
        const day = args.index%7;
        let prevMonth = args.month-1;
        let prevYear = args.year;
        if(prevMonth < 0) {
            prevMonth = 11;
            prevYear--;
        }
        const prevMonthNumberOfDays = this.getNumberOfDays(prevYear, prevMonth);
        const _date = (date < 0 ? prevMonthNumberOfDays+date : date % args.numberOfDays) + 1;
        const month = date < 0 ? -1 : date >= args.numberOfDays ? 1 : 0;
        const timestamp = new Date(args.year, args.month, _date).getTime();
        return {
            date: _date,
            day,
            month, 
            timestamp,
            dayString: this.daysMap[day]
        }
    }

    getNumberOfDays = (year, month)=> {
        // using any value >31 <59 to get number of days in given month instead of hard-coding values
        return 40 - new Date(year, month, 40).getDate();
    }

    getMonthDetails = (year, month) => {
        const firstDay = (new Date(year, month)).getDay();
        const numberOfDays = this.getNumberOfDays(year, month);
        const monthArray = [];
        const rows = 6;
        let currentDay = null;
        let index = 0; 
        const cols = 7;

        for(let row=0; row<rows; row++) {
            for(let col=0; col<cols; col++) { 
                currentDay = this.getDayDetails({
                    index,
                    numberOfDays,
                    firstDay,
                    year,
                    month
                });
                monthArray.push(currentDay);
                index++;
            }
        }
        return monthArray;
    }

    isCurrentDay = (day) => {
        return day.timestamp === todayTimestamp;
    }

    isSelectedDay = (day) => {
        return day.timestamp === this.state.selectedDay;
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

    getMonthStr = (month) => this.monthMap[Math.max(Math.min(11, month), 0)] || 'Month';

    getDateStringFromTimestamp = (timestamp) => {
        const dateObject = new Date(timestamp);
        const month = dateObject.getMonth()+1;
        const date = dateObject.getDate();
        const year= dateObject.getFullYear();

        return dateObject.getFullYear() + '-' + (month < 10 ? '0'+month : month) + '-' + (date < 10 ? '0'+date : date);
    }

    setDate = (dateData) => {
        const selectedDay = new Date(dateData.year, dateData.month-1, dateData.date).getTime();
        this.setState({ selectedDay })
        if(this.props.onChange) {
            this.props.onChange(selectedDay);
        }
    }

    updateDateFromInput = async ()=> {
        console.log('hey')
        const dateValue = inputRef.current.value;

        const dateData = this.getDateFromDateString(dateValue);
       
        if(dateData !== null) { 
            this.setDate(dateData);
            this.setState({ 
                
                year: dateData.year, 
                month: dateData.month-1, 
                monthDetails: this.getMonthDetails(dateData.year, dateData.month-1)
            })
            
            
        }
       await this.setPropsfromInput(this.state.year,this.state.month, dateData.date);
        
    }

    setPropsfromInput = async (year,month,day)=>{
        console.log(year,month, day);
        await this.props.setDate(year,month+1,day);
        
        const response = await this.props.filterEventsbyDay();
        console.log('hey');
    }

    setDateToInput =(timestamp)=> {
        const dateString = this.getDateStringFromTimestamp(timestamp);
        inputRef.current.value = dateString;
    }

    setProps = async (timestamp)=>{
        const {year, month, date} =this.getDateFromDateString(this.getDateStringFromTimestamp(timestamp));
        //console.log(year, month, date);
        await this.props.setDate(year,month,date);
        
        console.log(this.props.date);
        const response = await this.props.filterEventsbyDay();
    }

    onDateClick = async (day) => {
        this.setState({selectedDay: day.timestamp},
        ()=>this.setDateToInput(day.timestamp));
        await this.setProps(day.timestamp);
        if(this.props.onChange) {
            this.props.onChange(day.timestamp);
        }
    }

    setYear = async (offset) => {
        const year = this.state.year + offset;
        const month = this.state.month;
        this.setState({ 
            year,
            monthDetails: this.getMonthDetails(year, month)
        })
        
        
       
    }

    setMonth = async (offset) => {
        let year = this.state.year;
        let month = this.state.month + offset;
        if(month === -1) {
            month = 11;
            year--;
        } else if(month === 12) {
            month = 0;
            year++;
        }
        this.setState({ 
            year, 
            month,
            monthDetails: this.getMonthDetails(year, month)
        })
        
    }

    /**
     *  Renderers
     */

    renderCalendar() {
        const days = this.state.monthDetails.map((day, index)=> {
            return (
                <div className={'c-day-container ' + (day.month !== 0 ? ' disabled' : '') + 
                    (this.isCurrentDay(day) ? ' highlight' : '') + (this.isSelectedDay(day) ? ' highlight-green' : '')} key={index}>
                    <div className='cdc-day'>
                        <span onClick={()=>this.onDateClick(day)}>
                            {day.date}
                        </span>
                    </div>
                </div>
            )
        })

        return (
            <div className='c-container'>
                <div className='cc-head'>
                    {['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((d,i)=><div key={i} className='cch-name'>{d}</div>)}
                </div>
                <div className='cc-body'>
                    {days}
                </div>
            </div>
        )
    }

    render() {
        return (
            <div className='MyDatePicker'>
                <div className='mdp-input'  onClick={()=> this.showDatePicker(true)}>
                    <input type='date' onChange={this.updateDateFromInput} ref={inputRef}/>
                </div>
               
                    <div className='mdp-container'>
                        <div className='mdpc-head'>
                            <div className='mdpch-button'>
                                <div className='mdpchb-inner' onClick={()=> this.setYear(-1)}>
                                    <span className='mdpchbi-left-arrows'></span>
                                </div>
                            </div>
                            <div className='mdpch-button'>
                                <div className='mdpchb-inner' onClick={()=> this.setMonth(-1)}>
                                    <span className='mdpchbi-left-arrow'></span>
                                </div>
                            </div>
                            <div className='mdpch-container'>
                                <div className='mdpchc-year'>{this.state.year}</div>
                                <div className='mdpchc-month'>{this.getMonthStr(this.state.month)}</div>
                            </div>
                            <div className='mdpch-button'>
                                <div className='mdpchb-inner' onClick={()=> this.setMonth(+1)}>
                                    <span className='mdpchbi-right-arrow'></span>
                                </div>
                            </div>
                            <div className='mdpch-button' onClick={()=> this.setYear(+1)}>
                                <div className='mdpchb-inner'>
                                    <span className='mdpchbi-right-arrows'></span>
                                </div>
                            </div>
                        </div>
                        <div className='mdpc-body'>
                            {this.renderCalendar()}
                        </div>
                    </div>
              
            </div>
        )
    }

}
const mapStateToProps = ({date}) =>{
    return {
        date
    }
}

export default connect(mapStateToProps, {
    setDate,
    filterEventsbyDay
})(MyDatePicker);