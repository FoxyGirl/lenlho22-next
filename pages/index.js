import nookies from "nookies";
import writeFile from "../helpers/writeFile";
import readFile from "../helpers/readFile";
import getRandomKey from "../helpers/getRandomKey";
import { getGreetingText } from "../helpers/utils";

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const { userId } = cookies;
  let user;

  let data = (await readFile("users.json")) || [];

  if (!userId) {
    const newUserId = getRandomKey();
    user = { userId: newUserId, visitCounts: 1 };

    nookies.set(ctx, "userId", newUserId, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    data = [...data, user];
    writeFile(data);
  } else {
    user = [...data].find((item) => item.userId === userId);

    if (!user) {
      user = { userId, visitCounts: 1 };
      data = [...data, user];
    } else {
      user.visitCounts += 1;
      data = [...data].map((item) => (item.userId === userId ? user : item));
    }

    writeFile(data);
  }

  return {
    props: {
      visitCounts: user.visitCounts,
    },
  };
};

const Home = ({ visitCounts }) => {
  return (
    <>
      <h1>{getGreetingText(visitCounts)}</h1>
    </>
  );
};
export default Home;
