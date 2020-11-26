import React, { createContext, useContext, useReducer } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Portal } from 'react-portal'

const notificationTypes = {
  addNotification: 'addNotification'
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
    case notificationTypes.addNotification: {
      const { message, type } = action.payload
      return {
        notifications: [
          ...state.notifications,
          { id: uuidv4(), isOpen: true, message, type }
        ]
      }
    }
    default:
      throw new Error(`'${action.type}': invalid type received.`)
  }
}

function NotificaionProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: [
      // for example  {
      //   message: 'Something went wrong',
      //   type: 'default',
      //   isOpen: false
      // }
    ]
  })

  function showNotification({
    type = 'default',
    message = 'Something went wrong'
  }) {
    dispatch({
      type: notificationTypes.addNotification,
      payload: { type, message }
    })
  }

  const value = { state, dispatch, showNotification }
  return (
    <NotificationContext.Provider value={value}>
      {state.notifications?.map((item) => (
        <Notification key={item.id} isOpen={item.isOpen} />
      ))}
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

function Notification({
  type = 'default',
  message = 'Something went wrong',
  isOpen = true
}) {
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
