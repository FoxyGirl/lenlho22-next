import { useSelector } from "react-redux";

import InfoItem from "@components/InfoItem";

const Cars = () => {
  const { cars } = useSelector((state) => state);

  return (
    <section>
      <h2>Cars</h2>

      <ul>
        {cars.map((item) => (
          <li key={item.id}>
            <InfoItem item={item} />
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Cars;
