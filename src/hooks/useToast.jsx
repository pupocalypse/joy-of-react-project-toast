import { useCallback, useContext } from "react";
import { ToastContext } from "../components/ToastProvider/ToastProvider";

export const useToast = () => {
  const { toasts, setToasts } = useContext(ToastContext);

  const getNextToastID = () => {
    const sortedDescendingKeys = Object.keys(toasts).sort((a, b) =>
      b.localeCompare(a)
    );

    return sortedDescendingKeys.length > 0
      ? Number(sortedDescendingKeys[0]) + 1
      : 0;
  };

  const addToast = useCallback(
    (toast) => {
      const newToasts = structuredClone(toasts);
      const newToastID = getNextToastID();

      newToasts[newToastID] = toast;

      setToasts(newToasts);
    },
    [toasts]
  );

  const dismissToast = useCallback(
    (toastID) => {
      const newToasts = structuredClone(toasts);

      delete newToasts[toastID];

      setToasts(newToasts);
    },
    [toasts]
  );

  return { toasts, addToast, dismissToast };
};
