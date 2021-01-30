const Cars = ({ cars }) => {
  return (
    <section>
      <h2>Cars</h2>

      <ul>
        {cars.map(({ id, content, dateOfReceiving }) => (
          <li key={id}>
            <p>{content}</p>
            <div style={{ color: "blue", textAlign: "right" }}>
              {dateOfReceiving}
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default Cars;
