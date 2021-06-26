import { SET_DATE } from "../actions/types";

const initialState = {};

const setDate = (state = initialState, action) => {
    
    switch(action.type) {
        case SET_DATE:
            return action.payload;
        
        default:
            return state;
    }
      
}
export default setDate;