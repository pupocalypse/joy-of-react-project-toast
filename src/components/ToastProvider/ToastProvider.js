import React, { useCallback, useState } from "react";

export const ToastContext = React.createContext();

import { useEscapeKey } from "../../hooks/useEscapeKey";

function ToastProvider({ children }) {
  const [toasts, setToasts] = useState({});

  const clearAllToasts = useCallback(() => {
    setToasts({});
  }, []);

  useEscapeKey(clearAllToasts);

  return (
    <ToastContext.Provider value={{ toasts, setToasts }}>
      {children}
    </ToastContext.Provider>
  );
}

export default ToastProvider;
