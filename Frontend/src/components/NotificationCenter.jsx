import React, { useState, useCallback } from "react";
import { NotificationContext } from "../contexts/NotificationContext";

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([]);

  const removeNotification = useCallback((id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }, []);

  const addNotification = useCallback(
    (message, type = "info", duration = 5000) => {
      const id = Date.now();
      const notification = { id, message, type };

      setNotifications((prev) => [...prev, notification]);

      if (duration) {
        setTimeout(() => {
          removeNotification(id);
        }, duration);
      }

      return id;
    },
    [removeNotification]
  );

  return (
    <NotificationContext.Provider value={{ addNotification, removeNotification }}>
      {children}
      <NotificationCenter notifications={notifications} />
    </NotificationContext.Provider>
  );
};

const NotificationCenter = ({ notifications }) => {
  return (
    <div className="fixed top-4 right-4 z-9999 flex flex-col gap-3 pointer-events-none">
      {notifications.map((notification) => (
        <Notification
          key={notification.id}
          notification={notification}
        />
      ))}
    </div>
  );
};

const Notification = ({ notification }) => {
  const [isExiting, setIsExiting] = useState(false);

  const getStyles = () => {
    switch (notification.type) {
      case "success":
        return {
          bg: "bg-green-50",
          border: "border-green-200",
          icon: "✓",
          iconColor: "text-green-600",
          textColor: "text-green-800",
        };
      case "error":
        return {
          bg: "bg-red-50",
          border: "border-red-200",
          icon: "✕",
          iconColor: "text-red-600",
          textColor: "text-red-800",
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          border: "border-yellow-200",
          icon: "⚠",
          iconColor: "text-yellow-600",
          textColor: "text-yellow-800",
        };
      default:
        return {
          bg: "bg-blue-50",
          border: "border-blue-200",
          icon: "ℹ",
          iconColor: "text-blue-600",
          textColor: "text-blue-800",
        };
    }
  };

  const styles = getStyles();

  return (
    <div
      className={`${styles.bg} border ${styles.border} rounded-lg p-4 shadow-lg flex items-center gap-3 min-w-75 pointer-events-auto animate-slideIn ${
        isExiting ? "animate-slideOut" : ""
      }`}
      onAnimationEnd={() => {
        if (isExiting) {
          // Animation end triggers after slideOut
        }
      }}
    >
      <span className={`text-xl font-bold ${styles.iconColor}`}>
        {styles.icon}
      </span>
      <div className="flex-1">
        <p className={`${styles.textColor} font-medium`}>
          {notification.message}
        </p>
      </div>
      <button
        onClick={() => setIsExiting(true)}
        className={`ml-auto ${styles.textColor} hover:opacity-70 text-lg cursor-pointer`}
      >
        ✕
      </button>
    </div>
  );
};
