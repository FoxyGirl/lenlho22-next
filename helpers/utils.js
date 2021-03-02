import { USER_STATUS } from "@helpers/constants";

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

const localeOptions = {
  en: "en-US",
  ru: "ru-RU",
  fr: "fr-FR",
};

export const formateDate = (date, lang = "en") => {
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  };
  const dateOfReceiving = new Date(date).toLocaleDateString(
    localeOptions[lang],
    options
  );

  return String(dateOfReceiving);
};
