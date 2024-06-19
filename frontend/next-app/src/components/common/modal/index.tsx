import { ReactNode } from "react";
import ReactModal from "react-modal";

import styles from "./style.module.scss";

type Props = {
  isOpen: boolean;
  close: () => void;
  children: ReactNode;
};

export const Modal = ({ isOpen, children, close }: Props) => {
  return (
    <ReactModal
      isOpen={isOpen}
      shouldCloseOnOverlayClick={true}
      onRequestClose={close}
      ariaHideApp={false}
    >
      <div className={styles["modalInner"]}>
        <button
          onClick={() => {
            close();
          }}
          className={styles["closeButton"]}
        >
          close
        </button>
        {children}
      </div>
    </ReactModal>
  );
};
