import { useSelector } from "react-redux";
import InfoItem from "@components/InfoItem";

const Discounts = () => {
  const { discounts } = useSelector((state) => state);

  return (
    <section>
      <h2>Discounts</h2>

      <ul>
        {discounts.map((item) => (
          <li key={item.id}>
            <InfoItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Discounts;
