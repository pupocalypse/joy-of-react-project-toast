import { useEffect } from "react";

export const useEscapeKey = (callback) => {
  useEffect(() => {
    const escapeKeyEvent = (e) => {
      if (e.code === "Escape") {
        callback();
      }
    };

    window.addEventListener("keydown", escapeKeyEvent);

    return () => {
      window.removeEventListener("keydown", escapeKeyEvent);
    };
  }, [callback]);
};
