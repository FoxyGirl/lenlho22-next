const InfoItem = ({ item }) => {
  const { content, dateOfReceiving } = item;

  return (
    <>
      <p>{content}</p>
      <div style={{ color: "blue", textAlign: "right" }}>{dateOfReceiving}</div>
    </>
  );
};

export default InfoItem;
