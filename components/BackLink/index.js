import { useRouter } from "next/router";

import styles from "@styles/BackLink.module.css";

const BackLink = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <a className={styles.link} onClick={handleClick}>
      Back
    </a>
  );
};

export default BackLink;
