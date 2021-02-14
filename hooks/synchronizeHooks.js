import { useSelector, useDispatch } from "react-redux";

import { userActions } from "@bus/user/actions";
import { newsActions } from "@bus/news/actions";
import { discountsActions } from "@bus/discounts/actions";
import { carsActions } from "@bus/cars/actions";

export const useSynchronizeNews = (initialReduxState) => {
  const dispatch = useDispatch();
  const { news } = useSelector((state) => state);
  const { news: serverNews } = initialReduxState;

  if (news.length !== serverNews.length) {
    dispatch(newsActions.fillNews(serverNews));
  }
};

export const useSynchronizeDiscounts = (initialReduxState) => {
  const dispatch = useDispatch();
  const { discounts } = useSelector((state) => state);
  const { discounts: serverDiscounts } = initialReduxState;

  if (discounts.length !== serverDiscounts.length) {
    dispatch(discountsActions.fillDiscounts(serverDiscounts));
  }
};

export const useSynchronizeCars = (initialReduxState) => {
  const dispatch = useDispatch();
  const { cars } = useSelector((state) => state);
  const { cars: serverCars } = initialReduxState;

  if (cars.length !== serverCars.length) {
    dispatch(carsActions.fillCars(serverCars));
  }
};

export const useSynchronizeVisitCounts = (initialReduxState) => {
  const dispatch = useDispatch();
  const { visitCounts } = useSelector((state) => state.user);

  const { visitCounts: serverVisitCounts } = initialReduxState.user;

  if (visitCounts !== serverVisitCounts) {
    dispatch(userActions.setVisitCounts(initialReduxState.user.visitCounts));
  }
};
