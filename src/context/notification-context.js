import React, { useContext, useMemo, createContext, useReducer } from 'react'
import { Portal } from 'react-portal'
import { v4 as uuidv4 } from 'uuid'
import Notification from '../components/Notification'

const types = {
  addNotification: 'addNotification',
  removeNotification: 'removeNotification'
}

const NotificationContext = createContext()

function notificationReducer(state, action) {
  switch (action.type) {
    case types.addNotification: {
      const { message, type, id } = action.payload
      return {
        ...state,
        notifications: [
          ...state.notifications,
          { id, isOpen: true, message, type }
        ]
      }
    }
    case types.removeNotification:
      return {
        ...state,
        notifications: state.notifications.filter(
          (item) => item.id !== action.payload.id
        )
      }
    default:
      throw new Error(`'${action.type}': invalid type received.`)
  }
}

function NotificationProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  })

  function removeNotification(id) {
    dispatch({
      type: types.removeNotification,
      payload: { id }
    })
  }

  /**
   * Adds a new notification
   * @param config Customise Notification.
   * @param config.type ["success", "warning", "info", "error"] Customise Notification.
   */
  function showNotification({
    type = 'error',
    message = 'Something went wrong',
    autoHide = true,
    hideAfter = 3000
  }) {
    const id = uuidv4()
    dispatch({
      type: types.addNotification,
      payload: { type, message, id }
    })
    if (autoHide) {
      setTimeout(() => {
        removeNotification(id)
      }, hideAfter)
    }
  }

  const value = useMemo(
    () => ({
      showNotification,
      removeNotification
    }),
    []
  )

  return (
    <NotificationContext.Provider value={value}>
      <Portal>
        <div
          style={{
            position: 'fixed',
            top: '10px',
            right: '10px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-end'
          }}
        >
          {state.notifications?.map(({ id, isOpen, message, type }) => (
            <Notification
              key={id}
              id={id}
              type={type}
              message={message}
              isOpen={isOpen}
            />
          ))}
        </div>
      </Portal>
      {children}
    </NotificationContext.Provider>
  )
}

function useNotification() {
  const context = useContext(NotificationContext)
  if (!context) {
    throw new Error(
      'useNotification must be used within a NotificationProvider'
    )
  }
  return context
}

export { NotificationProvider, useNotification }
