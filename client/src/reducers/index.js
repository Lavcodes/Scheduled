import { combineReducers } from "redux";

import setTeacherid from "./setTeacherid";
import setTeachersList from './setTeachersList'
import setEventsList from "./setEventsList";
import setDate from "./setDate";

export default combineReducers({
    date: setDate,
    teacher_id : setTeacherid,
    teachers_list : setTeachersList,
    events_list : setEventsList
});