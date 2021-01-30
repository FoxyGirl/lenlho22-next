import { useSelector } from "react-redux";
import Link from "next/link";

import { initializeStore } from "../init/store";
import { initilDispatcher } from "../init/initilDispatcher";

import { setUser } from "../helpers/userUtils";
import { getGreetingText, getUserStatus } from "../helpers/utils";

export const getServerSideProps = async (context) => {
  const user = await setUser(context);
  const store = await initilDispatcher(context, initializeStore());

  const initialReduxState = store.getState();

  return {
    props: {
      userStatus: getUserStatus(user.visitCounts),
      initialReduxState,
    },
  };
};

const Home = ({ userStatus }) => {
  const { firstName, lastName } = useSelector((state) => state.profile);

  return (
    <>
      <h1>{getGreetingText(userStatus)}</h1>
      <h4>First name: {firstName}</h4>
      <h4>Last name: {lastName}</h4>
      <p>
        <Link href="./redux">Redux page</Link>
      </p>
    </>
  );
};
export default Home;
