import React, { useEffect } from 'react'

import { useNotification } from '../../src/index'

const App = () => {
  const { showNotification } = useNotification()

  useEffect(() => {
    showNotification({
      type: 'success',
      message: 'Your order is placed.'
    })
    showNotification({
      type: 'error',
      message: 'Connection not found!'
    })
    showNotification({
      type: 'warning',
      message: 'Please make sure input is not empty.'
    })
    showNotification({
      type: 'info',
      message: 'Subscription will end in 3 days.',
      autoHide: false
    })
  }, [showNotification])

  function onNotificationClick(type) {
    showNotification({
      type,
      message: `This is a notification of type: ${type}`
    })
  }
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'center'
      }}
    >
      <h2>quick-react-notification</h2>
      <button onClick={() => onNotificationClick('success')}>Success</button>
      <button onClick={() => onNotificationClick('info')}>Info</button>
      <button onClick={() => onNotificationClick('warning')}>Warning</button>
      <button onClick={() => onNotificationClick('error')}>Error</button>
      <button onClick={() => onNotificationClick('lvl-5-error')}>
        Custom notification type
      </button>
      <div style={{ height: '150vh' }}>scroll div</div>
    </div>
  )
}

export default App
