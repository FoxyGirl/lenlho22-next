import styles from "./Loader.module.scss";

const Loader = ({ text = "" }) => (
  <div className={styles.wrap}>
    <span className={styles.text}>{text}</span>

    <div className={styles.ellipsis}>
      <div />
      <div />
      <div />
      <div />
    </div>
  </div>
);

export default Loader;
