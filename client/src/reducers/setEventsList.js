import { ADD_EVENT, FILTER_BY_DAY } from "../actions/types";

const initialState = [];

const setEventsList = (state = initialState, action) => {
    
    switch(action.type) {
       
        case ADD_EVENT :
            return [...state, action.payload];
       
        case FILTER_BY_DAY :
            return action.payload;
        
        default:
            return state;
    }
      
}
export default setEventsList;