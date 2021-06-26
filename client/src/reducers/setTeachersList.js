import { ADD_TEACHER, SET_TEACHERS_LIST } from "../actions/types";

const initialState = [];

const setTeachersList = (state = initialState, action) => {
    
    switch(action.type) {
        case SET_TEACHERS_LIST:
            return  action.payload;
        case ADD_TEACHER :
            return [...state, action.payload];
        
        default:
            return state;
    }
      
}
export default setTeachersList;