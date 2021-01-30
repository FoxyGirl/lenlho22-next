const Discounts = ({ discounts }) => {
  return (
    <section>
      <h2>Discounts</h2>

      <ul>
        {discounts.map(({ id, content, dateOfReceiving }) => (
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

export default Discounts;
