// Core
import { combineReducers } from "redux";

// Reducers
// import { profileReducer as profile } from "@bus/profile/reducer";
import { userReducer as user } from "@bus/user/reducer";
import { newsReducer as news } from "@bus/news/reducer";
import { discountsReducer as discounts } from "@bus/discounts/reducer";
import { carsReducer as cars } from "@bus/cars/reducer";

export const rootReducer = combineReducers({
  // profile,
  user,
  news,
  discounts,
  cars,
});
