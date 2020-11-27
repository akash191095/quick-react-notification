import React from 'react'
import normalIcon from '../assets/normal.svg'
import errorIcon from '../assets/exclamation-round.svg'
import closeIcon from '../assets/close-round-line.svg'
import { useNotification } from '../context/notification-context'

function getNotificationData(type) {
  switch (type) {
    case 'error':
      return {
        backgroundColor: 'red',
        src: errorIcon,
        alt: 'error notification'
      }
    default:
      return {
        backgroundColor: 'white',
        src: normalIcon,
        alt: 'normal notification'
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
  const { backgroundColor, alt, src } = getNotificationData(type)
  return (
    isOpen && (
      <div
        style={{
          backgroundColor,
          display: 'flex',
          alignItems: 'center',
          borderRadius: '3px',
          padding: '10px 15px',
          margin: '10px'
        }}
      >
        <img style={{ width: '15px' }} src={src} alt={alt} />
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
          <img style={{ width: '15px' }} src={closeIcon} alt='close' />
        </button>
      </div>
    )
  )
}

export default Notification
