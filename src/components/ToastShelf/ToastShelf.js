import React from "react";

import Toast from "../Toast";
import styles from "./ToastShelf.module.css";

import { useToast } from "../../hooks/useToast";

function ToastShelf() {
  const { toasts } = useToast();

  return (
    <ol
      className={styles.wrapper}
      role="region"
      aria-live="polite"
      aria-label="Notification"
    >
      {Object.entries(toasts).map(([toastID, { message, variant }]) => (
        <li key={toastID} className={styles.toastWrapper}>
          <Toast variant={variant} toastID={toastID}>
            {message}
          </Toast>
        </li>
      ))}
    </ol>
  );
}

export default ToastShelf;
