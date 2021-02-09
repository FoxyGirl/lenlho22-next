import nookies from "nookies";
import writeFile from "./writeFile";
import readFile from "./readFile";
import getRandomKey from "./getRandomKey";
import { getUserStatus } from "@helpers/utils";

const userFile = "users.json";

export const setUser = async (context) => {
  const cookies = nookies.get(context);

  const { userId } = cookies;
  let user;

  let data = (await readFile(userFile)) || [];

  if (!userId) {
    const newUserId = getRandomKey();
    user = { userId: newUserId, visitCounts: 1 };

    nookies.set(context, "userId", newUserId, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    data = [...data, user];
    writeFile(userFile, data);
  } else {
    user = [...data].find((item) => item.userId === userId);

    if (!user) {
      user = { userId, visitCounts: 1 };
      data = [...data, user];
    } else {
      user.visitCounts += 1;
      data = [...data].map((item) => (item.userId === userId ? user : item));
    }

    writeFile(userFile, data);
  }

  return user;
};

export const getUser = async (context) => {
  const cookies = nookies.get(context);

  const { userId } = cookies;
  let user;

  let data = (await readFile(userFile)) || [];

  if (!userId) {
    const newUserId = getRandomKey();
    user = { userId: newUserId, visitCounts: 1 };

    nookies.set(context, "userId", newUserId, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    data = [...data, user];
    writeFile(userFile, data);
  } else {
    user = [...data].find((item) => item.userId === userId);
  }

  return user;
};

export const setMagicType = async (context, user) => {
  const cookies = nookies.get(context);
  const { magicType } = cookies;

  if (!magicType) {
    const newMagicType = getUserStatus(user.visitCounts);

    nookies.set(context, "magicType", newMagicType, {
      maxAge: 30 * 24 * 60 * 60,
      path: "/",
    });

    return newMagicType;
  } else {
    return magicType;
  }
};
