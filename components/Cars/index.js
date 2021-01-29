const Cars = ({ cars }) => {
  console.log("Cars!");

  return (
    <ul>
      {cars.map((item) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
};

export default Cars;
