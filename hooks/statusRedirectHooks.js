import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { USER_STATUS } from "@helpers/constants";

const allowedRoutes = {
  [USER_STATUS.GUEST]: ["/news", "/news/[article]"],
  [USER_STATUS.FRIEND]: [
    "/news",
    "/news/[article]",
    "/discounts",
    "/discounts/[discount]",
  ],
  [USER_STATUS.FAMILY]: [
    "/news",
    "/news/[article]",
    "/discounts",
    "/discounts/[discount]",
    "/cars",
    "/cars/[car]",
  ],
};

export const useStatusRedirect = () => {
  const router = useRouter();
  const { pathname } = router;
  const { userType } = useSelector((state) => state.user);

  if (!allowedRoutes[userType].includes(pathname)) {
    router.push("/");
  }
};

export const isAllowedRoute = (pathname, userType) =>
  allowedRoutes[userType].includes(pathname);
