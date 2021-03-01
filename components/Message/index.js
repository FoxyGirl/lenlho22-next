import { useSelector } from "react-redux";
import useGetGreetingText from "@hooks/useGetGreetingText";

const Message = () => {
  const { userType } = useSelector((state) => state.user);
  const message = useGetGreetingText(userType);

  return <h1>{message}</h1>;
};

export default Message;
