import { useTranslation } from "next-i18next";
import { USER_STATUS } from "@helpers/constants";

const useGetGreetingText = (userStatus) => {
  const { t } = useTranslation();

  switch (userStatus) {
    case USER_STATUS.GUEST:
      return t(`home:welcome.${USER_STATUS.GUEST}`);
    case USER_STATUS.FRIEND:
      return t(`home:welcome.${USER_STATUS.FRIEND}`);
    case USER_STATUS.FAMILY:
      return t(`home:welcome.${USER_STATUS.FAMILY}`);
    default:
      return t(`home:welcome.unknown`);
  }
};

export default useGetGreetingText;
