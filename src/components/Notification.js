import React, {
  createContext,
  useCallback,
  useContext,
  useReducer
} from 'react'
import { v4 as uuidv4 } from 'uuid'
import { Portal } from 'react-portal'

const types = {
  addNotification: 'addNotification',
  removeNotification: 'removeNotification'
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

function NotificaionProvider({ children }) {
  const [state, dispatch] = useReducer(notificationReducer, {
    notifications: []
  })

  const removeNotification = useCallback((id) => {
    dispatch({
      type: types.removeNotification,
      payload: { id }
    })
  }, [])

  const showNotification = useCallback(
    ({
      type = 'default',
      message = 'Something went wrong',
      autoHide = true,
      hideAfter = 3000
    }) => {
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
    },
    []
  )

  const value = { showNotification, removeNotification }
  return (
    <NotificationContext.Provider value={value}>
      {state.notifications?.map(({ id, isOpen }) => (
        <Notification key={id} id={id} isOpen={isOpen} />
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
  isOpen = true,
  id
}) {
  const { removeNotification } = useNotification()
  return (
    isOpen && (
      <Portal>
        <div style={{ backgroundColor: 'white' }}>
          <p>
            {/* src:{state.src} alt:{state.alt} */}
            image here
          </p>
          <p>{message}</p>
          <button onClick={() => removeNotification(id)}>x</button>
        </div>
      </Portal>
    )
  )
}

export { NotificaionProvider, useNotification }
