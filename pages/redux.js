import { useSelector } from "react-redux";
import { initializeStore } from "../init/store";
import { initilDispatcher } from "../init/initilDispatcher";
import { profileActions } from "../bus/profile/actions";

export const getServerSideProps = async (context) => {
  // initilDispatcher dispathes commom actions for all pages
  const store = await initilDispatcher(context, initializeStore());
  // store.dispatch(); on the server
  store.dispatch(profileActions.fillProfile({ lastName: "Wolker" }));

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const Redux = ({ initialReduxState }) => {
  console.log("initialReduxState!", initialReduxState);
  const { firstName, lastName } = useSelector((state) => state.profile);

  return (
    <>
      <h1>Redux page</h1>
      <h4>First name: {firstName}</h4>
      <h4>Last name: {lastName}</h4>
    </>
  );
};

export default Redux;
