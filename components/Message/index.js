import { useSelector } from "react-redux";
import { getGreetingText } from "../../helpers/utils";

const Message = () => {
  const { userType } = useSelector((state) => state.user);

  return <h1>{getGreetingText(userType)}</h1>;
};

export default Message;
