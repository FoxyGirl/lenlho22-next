const Home = () => {
  const greetingGuestJSX = <h1>Приветствуем тебя странник!</h1>;

  const greetingFriendJSX = <h1>Приветствуем тебя друг!</h1>;

  const greetingFamilyJSX = <h1>Добро пожаловать в семью!</h1>;

  return (
    <>
      {greetingGuestJSX}
      {greetingFriendJSX}
      {greetingFamilyJSX}
    </>
  );
};
export default Home;
