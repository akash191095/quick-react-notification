import React, {
  useContext,
  useMemo,
  createContext,
  useReducer,
  useCallback
} from 'react'
import { Portal } from 'react-portal'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
  faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'
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
      const data = action.payload
      return {
        ...state,
        notifications: [...state.notifications, { isOpen: true, ...data }]
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

function getNotificationData(type, extendTypes) {
  if (extendTypes) {
    const data = extendTypes(type)
    if (data) return data
  }
  switch (type) {
    case 'error':
      return {
        backgroundColor: '#f8615a',
        src: faExclamationTriangle
      }
    case 'warning':
      return {
        backgroundColor: '#ffd369',
        src: faExclamationCircle
      }
    case 'info':
      return {
        backgroundColor: '#f4f9f4',
        src: faInfoCircle
      }
    default:
      return {
        backgroundColor: '#adce74',
        src: faCheckCircle
      }
  }
}

function NotificationProvider({ children, extendTypes = null }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  })

  const removeNotification = useCallback((id) => {
    dispatch({
      type: types.removeNotification,
      payload: { id }
    })
  }, [])

  /**
   * Adds a new notification
   * @param config Customise Notification.
   * @param config.type ["success", "warning", "info", "error"] Customise Notification.
   */
  const showNotification = useCallback(
    ({
      type = 'error',
      message = 'Something went wrong',
      autoHide = true,
      hideAfter = 3000,
      textColor = 'black',
      iconColor = 'black',
      closeColor = 'black'
    }) => {
      const id = uuidv4()
      const notificationData = getNotificationData(type, extendTypes)
      dispatch({
        type: types.addNotification,
        payload: {
          type,
          message,
          id,
          autoHide,
          hideAfter,
          textColor,
          iconColor,
          closeColor,
          ...notificationData
        }
      })
    },
    []
  )

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
          {state.notifications?.map((data) => (
            <Notification
              key={data.id}
              {...data}
              removeNotification={removeNotification}
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
