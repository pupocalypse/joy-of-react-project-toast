import React, { useState } from "react";

import Button from "../Button";
import ToastShelf from "../ToastShelf/ToastShelf";

import styles from "./ToastPlayground.module.css";

const VARIANT_OPTIONS = ["notice", "warning", "success", "error"];

function ToastPlayground() {
  const [toastMessage, setToastMessage] = useState("");
  const [toastVariant, setToastVariant] = useState(VARIANT_OPTIONS[0]);

  const [toasts, setToasts] = useState({});

  const getNextToastID = () => {
    const sortedDescendingKeys = Object.keys(toasts).sort((a, b) =>
      b.localeCompare(a)
    );

    return sortedDescendingKeys.length > 0
      ? Number(sortedDescendingKeys[0]) + 1
      : 0;
  };

  const addToast = (toast) => {
    const newToasts = structuredClone(toasts);
    const newToastID = getNextToastID();

    newToasts[newToastID] = toast;

    setToasts(newToasts);
  };

  const dismissToast = (toastID) => {
    const newToasts = structuredClone(toasts);

    delete newToasts[toastID];

    setToasts(newToasts);
  };

  // TODO: reconfigure for multiple toasts
  const handlePopToast = (e) => {
    e.preventDefault();

    if (toastMessage === "") {
      addToast({
        variant: "error",
        message: "You haven't entered a message for your toast!",
      });
      return;
    }

    addToast({ variant: toastVariant, message: toastMessage });

    // reset the form
    setToastMessage("");
    setToastVariant(VARIANT_OPTIONS[0]);
  };

  return (
    <div className={styles.wrapper}>
      <header>
        <img alt="Cute toast mascot" src="/toast.png" />
        <h1>Toast Playground</h1>
      </header>

      <ToastShelf toasts={toasts} dismissToast={dismissToast} />

      <form className={styles.controlsWrapper} onSubmit={handlePopToast}>
        <div className={styles.row}>
          <label
            htmlFor="message"
            className={styles.label}
            style={{ alignSelf: "baseline" }}
          >
            Message
          </label>
          <div className={styles.inputWrapper}>
            <textarea
              id="message"
              className={styles.messageInput}
              value={toastMessage}
              onChange={(e) => setToastMessage(e.target.value)}
              onBlur={(e) => setToastMessage(e.target.value.trim())}
            />
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label}>Variant</div>
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            {VARIANT_OPTIONS.map((variant) => (
              <label key={variant} htmlFor={`variant-${variant}`}>
                <input
                  id={`variant-${variant}`}
                  type="radio"
                  name="variant"
                  value={variant}
                  checked={toastVariant === variant}
                  onChange={(e) => setToastVariant(e.target.value)}
                />
                {variant}
              </label>
            ))}
          </div>
        </div>

        <div className={styles.row}>
          <div className={styles.label} />
          <div className={`${styles.inputWrapper} ${styles.radioWrapper}`}>
            <Button type="submit">Pop Toast!</Button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default ToastPlayground;
