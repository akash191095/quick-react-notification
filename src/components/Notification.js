/* eslint-disable no-func-assign */
import React, { useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

function Notification({
  type,
  message,
  isOpen,
  id,
  extendTypes,
  textColor,
  iconColor,
  closeColor,
  backgroundColor,
  autoHide,
  hideAfter,
  src,
  removeNotification
}) {
  useEffect(() => {
    if (autoHide) {
      setTimeout(() => {
        removeNotification(id)
      }, hideAfter)
    }
  }, [])

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
        <FontAwesomeIcon color={iconColor} icon={src} />
        <p style={{ margin: '0 10px', fontSize: '14px', color: textColor }}>
          {message}
        </p>
        <button
          style={{
            background: 'none',
            border: 'none',
            display: 'flex',
            padding: 0,
            cursor: 'pointer'
          }}
          onClick={() => removeNotification(id)}
        >
          <FontAwesomeIcon icon={faTimes} color={closeColor} />
        </button>
      </div>
    )
  )
}

Notification = React.memo(Notification)

export default Notification
