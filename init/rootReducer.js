// Core
import { combineReducers } from "redux";

// Reducers
import { profileReducer as profile } from "../bus/profile/reducer";
import { userReducer as user } from "../bus/user/reducer";

export const rootReducer = combineReducers({
  profile,
  user,
});
