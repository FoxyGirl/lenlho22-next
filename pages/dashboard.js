import { USER_STATUS } from "../helpers/constants";
import { getUser } from "../helpers/userUtils";
import { getUserStatus } from "../helpers/utils";
import readFile from "../helpers/readFile";
import News from "../components/News";
import Discounts from "../components/Discounts";
import Cars from "../components/Cars";

export const getServerSideProps = async (context) => {
  const user = await getUser(context);

  const userStatus = getUserStatus(user.visitCounts);

  let news = [];
  let discounts = [];
  let cars = [];

  // console.log("===============");

  if (userStatus === USER_STATUS.GUEST) {
    news = (await readFile("news.json")) || [];
  }

  if (userStatus === USER_STATUS.FRIEND) {
    news = (await readFile("news.json")) || [];
    discounts = (await readFile("discounts.json")) || [];
  }

  if (userStatus === USER_STATUS.FAMILY) {
    news = (await readFile("news.json")) || [];
    discounts = (await readFile("discounts.json")) || [];
    cars = (await readFile("cars.json")) || [];
  }

  return {
    props: {
      news,
      discounts,
      cars,
    },
  };
};

const Dashboard = ({ news, discounts, cars }) => {
  return (
    <>
      {news.length > 0 && <News news={news} />}
      {discounts.length > 0 && <Discounts discounts={discounts} />}
      {cars.length > 0 && <Cars cars={cars} />}
    </>
  );
};
export default Dashboard;
