import React, {
  createContext,
  Fragment,
  useCallback,
  useContext,
  useEffect,
  useReducer
} from 'react'
import { Portal } from 'react-portal'

const notificationTypes = {
  showNotification: 'showNotification'
}

const NotificationContext = createContext()

// function stylesReducer(state, action) {
//   switch (action.type) {
//     case 'default':
//       return {
//         ...state,
//         backgroundColor: 'white',
//         src: '../assets/normal.svg',
//         alt: 'normal notification'
//       }
//     case 'error':
//       return {
//         ...state,
//         backgroudColor: 'red',
//         src: '../assets/error.svg',
//         alt: 'error notification'
//       }
//     default:
//       return state
//   }
// }

function notificationReducer(state, action) {
  switch (action.type) {
    case notificationTypes.showNotification: {
      const { message, type } = action.payload
      return { ...state, isOpen: true, message, type }
    }
    default:
      return state
  }
}

function NotificaionProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    message: 'Something went wrong',
    type: 'default',
    isOpen: false
  })

  function showNotification({
    type = 'default',
    message = 'Something went wrong'
  }) {
    dispatch({
      type: notificationTypes.showNotification,
      payload: { type, message }
    })
  }

  const value = { state, dispatch, showNotification }
  return (
    <NotificationContext.Provider value={value}>
      <Notification />
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

function Notification({ type = 'default', message = 'Something went wrong' }) {
  const { state } = useNotification()
  const { isOpen } = state
  return (
    isOpen && (
      <Portal>
        <div style={{ backgroundColor: 'white' }}>
          <p>
            {/* src:{state.src} alt:{state.alt} */}
            image here
          </p>
          <p>{message}</p>
          <button onClick={() => null}>x</button>
        </div>
      </Portal>
    )
  )
}

export { Notification, NotificaionProvider, useNotification }
