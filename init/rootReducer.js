// Core
import { combineReducers } from "redux";

// Reducers
import { profileReducer as profile } from "../bus/profile/reducer";

export const rootReducer = combineReducers({
  profile,
});
