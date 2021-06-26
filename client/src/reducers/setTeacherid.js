import { SET_TEACHER_ID } from "../actions/types";

const initialState = null;

const setTeacherid = (state = initialState, action) => {
    
    
    switch(action.type) {
        case SET_TEACHER_ID:
            return action.payload;
            
        
        default:
            return state;
    }
      
}
export default setTeacherid;