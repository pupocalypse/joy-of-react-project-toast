import React, { useEffect, useState } from "react";

export const ToastContext = React.createContext();

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState({});

  useEffect(() => {
    const clearAllToasts = (e) => {
      if (e.code === "Escape") {
        setToasts({});
      }
    };

    window.addEventListener("keydown", clearAllToasts);

    return () => {
      window.removeEventListener("keydown", clearAllToasts);
    };
  }, []);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
