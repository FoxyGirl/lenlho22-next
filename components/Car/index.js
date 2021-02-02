import { useRouter } from "next/router";
import { useEffect } from "react";
import { useSelector } from "react-redux";

import InfoItem from "@components/InfoItem";

const Car = () => {
  const router = useRouter();
  const { car } = router.query;
  const { cars } = useSelector((state) => state);
  const carItem = cars.find(({ id }) => id === car);

  return <section>{carItem ? <InfoItem item={carItem} /> : null}</section>;
};

export default Car;
