import nookies from "nookies";
import writeFileAsync from "../helpers/writeFile";
import readFileAsync from "../helpers/readFile";
import getRandomKey from "../helpers/getRandomKey";
import { getGreetingText } from "../helpers/utils";

export const getServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  const { userId } = cookies;
  let user;

  let data = (await readFileAsync()) || [];

  if (!userId) {
    const newUserId = getRandomKey();
    user = { userId: newUserId, visitCounts: 1 };

    nookies.set(ctx, "userId", newUserId, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    data = [...data, user];
    writeFileAsync(data);
  } else {
    user = [...data].find((item) => item.userId === userId);

    if (!user) {
      user = { userId, visitCounts: 1 };
      data = [...data, user];
    } else {
      user.visitCounts += 1;
      data = [...data].map((item) => (item.userId === userId ? user : item));
    }

    writeFileAsync(data);
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
