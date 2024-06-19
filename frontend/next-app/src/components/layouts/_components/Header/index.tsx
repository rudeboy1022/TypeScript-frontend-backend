import styles from "./style.module.scss";

export const Header = () => {
  return (
    <header className={styles["header"]}>
      <div className={styles["headerContainer"]}>
        <p className={styles["headerText"]}>Welcome</p>
      </div>
    </header>
  );
};
