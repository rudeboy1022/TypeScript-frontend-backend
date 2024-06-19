import { ReactNode } from "react";
import { Header } from "./_components/Header";

import styles from "./style.module.scss";
import { Footer } from "./_components/Footer";

type Props = {
  children: ReactNode;
};
export const BaseLayout = ({ children }: Props) => {
  return (
    <>
      <div className={styles["site"]}>
        <Header />
        <div className={styles["mainWrapper"]}>
          <main className={styles["siteMain"]}>{children}</main>
          <Footer />
        </div>
      </div>
    </>
  );
};
