const News = ({ news }) => {
  return (
    <section>
      <h2>News</h2>

      <ul>
        {news.map(({ id, content, dateOfReceiving }) => (
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

export default News;
