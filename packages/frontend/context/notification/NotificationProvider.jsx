import { createContext, useContext } from "react";

import { notification } from "antd";

const NOTIFICATION_TYPE = {
  success: "success",
  info: "info",
  warning: "warning",
  error: "error",
};

export const NotificationContext = createContext({});

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [api, contextHolder] = notification.useNotification();

  const showNotification = ({ type, title, message, duration }) => {
    api?.[type]({
      message: title,
      description: message,
      duration,
    });
  };

  const notifyError = ({ title, message, duration = 10 }) => {
    showNotification({
      type: NOTIFICATION_TYPE.error,
      title,
      message,
      duration,
    });
  };
  const notifyInfo = ({ title, message, duration = 10 }) => {
    showNotification({
      type: NOTIFICATION_TYPE.info,
      title,
      message,
      duration,
    });
  };
  const notifySuccess = ({ title, message, duration = 10 }) => {
    showNotification({
      type: NOTIFICATION_TYPE.success,
      title,
      message,
      duration,
    });
  };
  const notifyWarning = ({ title, message, duration = 10 }) => {
    showNotification({
      type: NOTIFICATION_TYPE.warning,
      title,
      message,
      duration,
    });
  };
  const notify = ({ title, message, duration = 10 }) => {
    api?.open({
      message: title,
      description: message,
      duration,
    });
  };

  return (
    <NotificationContext.Provider
      value={{
        notifyError,
        notifyInfo,
        notifySuccess,
        notifyWarning,
        notify,
      }}
    >
      {contextHolder}
      {children}
    </NotificationContext.Provider>
  );
};
