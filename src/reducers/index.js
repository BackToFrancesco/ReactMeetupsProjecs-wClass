import { combineReducers } from "redux";
import loggedReducer from "./isLogget";

const allReducers = combineReducers({
    isLogged: loggedReducer,
})

export default allReducers;