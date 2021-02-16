import { useRouter } from "next/router";

import styles from "@styles/BackLink.module.scss";

const BackLink = () => {
  const router = useRouter();

  const handleClick = (e) => {
    e.preventDefault();
    router.back();
  };

  return (
    <p>
      <a className={styles.link} onClick={handleClick}>
        Back
      </a>
    </p>
  );
};

export default BackLink;
