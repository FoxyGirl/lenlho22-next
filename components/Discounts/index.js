const Discounts = ({ discounts }) => {
  console.log("Discounts!");

  return (
    <ul>
      {discounts.map((item) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
};

export default Discounts;
