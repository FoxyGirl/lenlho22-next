import { initializeStore } from "../init/store";
import { initilDispatcher } from "../init/initilDispatcher";

export const getServerSideProps = async (context) => {
  // initilDispatcher dispathes commom actions for all pages
  const store = await initilDispatcher(context, initializeStore());
  // store.dispatch(); on the server

  const initialReduxState = store.getState();

  return {
    props: {
      initialReduxState,
    },
  };
};

const Redux = ({ initialReduxState }) => {
  console.log("initialReduxState!", initialReduxState);

  return (
    <>
      <h1>Redux page</h1>
    </>
  );
};

export default Redux;
