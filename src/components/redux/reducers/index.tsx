import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userReducers";

const rootReducer = combineReducers({
  userList: userReducers,
});

export default rootReducer;
