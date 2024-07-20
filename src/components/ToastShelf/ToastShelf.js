import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

function ToastShelf({ toasts, dismissToast }) {
  return (
    <ol className={styles.wrapper}>
      {Object.entries(toasts).map(([toastID, { message, variant }]) => (
        <li key={toastID} className={styles.toastWrapper}>
          <Toast
            variant={variant}
            toastID={toastID}
            dismissToast={dismissToast}
          >
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
