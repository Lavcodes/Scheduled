import axios from 'axios';

import { SET_TEACHER_ID , SET_DATE, SET_TEACHERS_LIST, ADD_EVENT, ADD_TEACHER,  FILTER_BY_DAY} from "./types";


export const setTeacheridAction = (id) =>{
    
    return {
        type : SET_TEACHER_ID,
        payload : id
    }
}


export const setDate = (year=null, month=null, day=null)=>{
    const date = {
        day,
        month,
        year
    }
    return {
        type : SET_DATE,
        payload : date
    }

}

export const fetchTeachers = () =>{
    return async (dispatch, getState) => {
            const {data} = await axios.get('./teachers', {});
            console.log(data.rows);

            dispatch({
                type : SET_TEACHERS_LIST,
                payload : data.rows

            })         
        
        
    }
    
};

export const addTeacherAction = (teacher_name, department ) =>{

    const new_teacher = {
        teacher_name,
        department
    }
    return async (dispatch, getState) => {
        const response = await axios.post('./teachers', new_teacher);
        

        dispatch({
            type : ADD_TEACHER,
            payload : new_teacher

        })         
};
}

export const addEventAction = (teacher_id, {month, year, day, title, description, start_at, end_at}) =>{

    const new_event = {
        teacher_id, month, year, day, title, description, start_at, end_at
    }
    return async (dispatch, getState) => {
        const response = await axios.post('./events', new_event);
        

        dispatch({
            type : ADD_EVENT,
            payload : new_event

        })         
};
}



export const filterEventsbyDay = () =>{

    return async (dispatch, getState) => {
        const {teacher_id, date} = getState();
        console.log(date);

        if(date.day!==undefined){
        const {data} = await axios.get(`./events/${teacher_id}/${date.year}/${date.month}/${date.day}`,{});
        dispatch({
            type : FILTER_BY_DAY,
            payload : data.rows

        })       
        }
        else if(date.month!==undefined){
        const {data} = await axios.get(`./events/${teacher_id}/${date.year}/${date.month}`,{});
        dispatch({
            type : FILTER_BY_DAY,
            payload : data.rows

        })       
        }

        else{
            const {data} = await axios.get(`./events/${teacher_id}`,{});
            dispatch({
                type : FILTER_BY_DAY,
                payload : data.rows
    
            })       
        }
        

          
};
} 




 