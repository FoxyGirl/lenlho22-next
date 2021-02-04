import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import InfoItem from "@components/InfoItem";

const Discount = () => {
  const router = useRouter();
  const { discount } = router.query;
  const { discounts } = useSelector((state) => state);
  const discountItem = discounts.find(({ id }) => id === discount);

  return (
    <section>{discountItem ? <InfoItem item={discountItem} /> : null}</section>
  );
};

export default Discount;
