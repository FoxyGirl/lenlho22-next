import nookies from "nookies";
import writeFile from "./writeFile";
import readFile from "./readFile";
import getRandomKey from "./getRandomKey";

export const setUser = async (context) => {
  const cookies = nookies.get(context);

  const { userId } = cookies;
  let user;

  let data = (await readFile("users.json")) || [];

  if (!userId) {
    const newUserId = getRandomKey();
    user = { userId: newUserId, visitCounts: 1 };

    nookies.set(context, "userId", newUserId, {
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

  return user;
};
