import { useSelector } from "react-redux";
import InfoItem from "@components/InfoItem";

const Discounts = () => {
  const { discounts } = useSelector((state) => state);

  const discountsItemsJSX = discounts.map((item) => (
    <li key={item.id}>
      <InfoItem item={item} />
    </li>
  ));

  return (
    <section>
      <h2>Discounts</h2>
      <ul>{discountsItemsJSX}</ul>
    </section>
  );
};

export default Discounts;
