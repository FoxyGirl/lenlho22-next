import { formateDate } from "@helpers/utils";
import { useRouter } from "next/router";

const InfoItem = ({ item }) => {
  const { content, dateOfReceiving } = item;
  const { locale } = useRouter();

  return (
    <>
      <p>{content}</p>
      <div style={{ color: "blue", textAlign: "right" }}>
        {formateDate(dateOfReceiving, locale)}
      </div>
    </>
  );
};

export default InfoItem;
