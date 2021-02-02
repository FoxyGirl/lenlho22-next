import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { USER_STATUS } from "@helpers/constants";

export const useStatusRedirect = () => {
  const router = useRouter();
  const { userType } = useSelector((state) => state.user);

  useEffect(() => {
    if (userType !== USER_STATUS.FAMILY) {
      router.push("/");
    }
  }, []);
};
