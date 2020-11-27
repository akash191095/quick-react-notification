import React, { createContext, useContext, useMemo, useReducer } from "react";
import { v4 as uuidv4 } from "uuid";
import { Portal } from "react-portal";
import normal from "../assets/normal.svg";

const types = {
  addNotification: "addNotification",
  removeNotification: "removeNotification",
};

const NotificationContext = createContext();

function getNotificationData(type) {
  switch (type) {
    case "error":
      return {
        backgroundColor: "red",
        src: "../assets/error.svg",
        alt: "error notification",
      };
    default:
      return {
        backgroundColor: "white",
        src: "../assets/normal.svg",
        alt: "normal notification",
      };
  }
}

function notificationReducer(state, action) {
  switch (action.type) {
    case types.addNotification: {
      const { message, type, id } = action.payload;
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id, isOpen: true, message, type },
        ],
      };
    }
    case types.removeNotification:
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    default:
      throw new Error(`'${action.type}': invalid type received.`);
  }
}

function NotificaionProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [],
  });

  function removeNotification(id) {
    dispatch({
      type: types.removeNotification,
      payload: { id },
    });
  }

  function showNotification({
    type = "default",
    message = "Something went wrong",
    autoHide = true,
    hideAfter = 3000,
  }) {
    const id = uuidv4();
    dispatch({
      type: types.addNotification,
      payload: { type, message, id },
    });
    if (autoHide) {
      setTimeout(() => {
        removeNotification(id);
      }, hideAfter);
    }
  }

  const value = useMemo(
    () => ({
      showNotification,
      removeNotification,
    }),
    []
  );

  return (
    <NotificationContext.Provider value={value}>
      {state.notifications?.map(({ id, isOpen }) => (
        <Notification key={id} id={id} isOpen={isOpen} />
      ))}
      {children}
    </NotificationContext.Provider>
  );
}

function useNotification() {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
}

function Notification({
  type = "default",
  message = "Something went wrong",
  isOpen = true,
  id,
}) {
  const { removeNotification } = useNotification();
  const { backgroundColor, alt, src } = getNotificationData(type);
  return (
    isOpen && (
      <Portal>
        <div style={{ backgroundColor }}>
          <img src={normal} alt={alt} />
          <p>{message}</p>
          <button onClick={() => removeNotification(id)}>x</button>
        </div>
      </Portal>
    )
  );
}

export { NotificaionProvider, useNotification };
