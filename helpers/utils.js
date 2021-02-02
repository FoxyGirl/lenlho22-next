import { USER_STATUS } from "./constants";

export const getUserStatus = (counts) => {
  if (counts < 3) {
    return USER_STATUS.GUEST;
  }

  if (counts < 5) {
    return USER_STATUS.FRIEND;
  }

  return USER_STATUS.FAMILY;
};

export const getGreetingText = (userStatus) => {
  switch (userStatus) {
    case USER_STATUS.GUEST:
      return "Приветствуем тебя странник!";
    case USER_STATUS.FRIEND:
      return "Приветствуем тебя друг!";
    case USER_STATUS.FAMILY:
      return "Добро пожаловать в семью!";
    default:
      return "Неизвестный статус";
  }
};

export const increaseUserStatus = (userStatus) => {
  switch (userStatus) {
    case USER_STATUS.GUEST:
      return USER_STATUS.FRIEND;
    case USER_STATUS.FRIEND:
      return USER_STATUS.FAMILY;
    case USER_STATUS.FAMILY:
      return USER_STATUS.FAMILY;
    default:
      return "Unknown";
  }
};
