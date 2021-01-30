import { setUser } from "../helpers/userUtils";
import { getGreetingText, getUserStatus } from "../helpers/utils";

export const getServerSideProps = async (context) => {
  const user = await setUser(context);

  return {
    props: {
      userStatus: getUserStatus(user.visitCounts),
    },
  };
};

const Home = ({ userStatus }) => {
  return (
    <>
      <h1>{getGreetingText(userStatus)}</h1>
    </>
  );
};
export default Home;
