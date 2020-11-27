/* eslint-disable no-func-assign */
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faCheckCircle,
  faInfoCircle,
  faExclamationCircle,
  faExclamationTriangle,
  faTimes
} from '@fortawesome/free-solid-svg-icons'
import { useNotification } from '../context/notification-context'

function getNotificationData(type) {
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

function Notification({
  type = 'default',
  message = 'Something went wrong',
  isOpen = true,
  id
}) {
  const { removeNotification } = useNotification()
  const { backgroundColor, src } = getNotificationData(type)
  return (
    isOpen && (
      <div
        style={{
          backgroundColor,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          width: 'fit-content',
          borderRadius: '3px',
          padding: '10px 15px',
          margin: '5px 0'
        }}
      >
        <FontAwesomeIcon icon={src} />
        <p style={{ margin: '0 10px', fontSize: '14px' }}>{message}</p>
        <button
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            padding: 0
          }}
          onClick={() => removeNotification(id)}
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    )
  )
}

Notification = React.memo(Notification)

export default Notification
