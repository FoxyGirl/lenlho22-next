const News = ({ news }) => {
  console.log("News!");

  return (
    <ul>
      {news.map((item) => (
        <li key={item.id}>{item.content}</li>
      ))}
    </ul>
  );
};

export default News;
