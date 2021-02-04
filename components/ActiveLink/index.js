import { useRouter } from "next/router";

const ActiveLink = ({ children, href }) => {
  const router = useRouter();
  const isActive = router.pathname === href;

  const style = {
    color: isActive ? "grey" : "black",
    textDecoration: isActive ? "none" : "",
  };

  const handleClick = (e) => {
    e.preventDefault();
    router.push(href);
  };

  return (
    <a href={href} onClick={handleClick} style={style}>
      {children}
    </a>
  );
};

export default ActiveLink;
