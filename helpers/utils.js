export const getGreetingText = (counts) => {
  if (counts < 3) {
    return "Приветствуем тебя странник!";
  }

  if (counts < 5) {
    return "Приветствуем тебя друг!";
  }

  return "Добро пожаловать в семью!";
};
