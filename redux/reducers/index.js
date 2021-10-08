import { combineReducers } from "redux";
import cartReducer from "./cartReducer";

let reducers = combineReducers({
    cartReducer
})

const rootReducer = reducers;

export default rootReducer;