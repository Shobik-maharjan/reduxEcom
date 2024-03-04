import { combineReducers } from "@reduxjs/toolkit";
import userReducers from "./userReducers";
import movieReducers from "./movieReducers";

const rootReducer = combineReducers({
  userList: userReducers,
  movieList: movieReducers,
});

export default rootReducer;
