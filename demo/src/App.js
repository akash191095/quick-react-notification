import React, { useEffect } from 'react'

import { useNotification } from '../../src/index'

const App = () => {
  const { showNotification } = useNotification()

  useEffect(() => {
    showNotification({
      message: 'Your order is placed.',
      autoHide: false
    })
    showNotification({
      type: 'error',
      message: 'Connection not found!',
      autoHide: false
    })
    showNotification({
      type: 'warning',
      message: 'Please make sure input is not empty.',
      autoHide: false
    })
    showNotification({
      type: 'info',
      message: 'Subscription will end in 3 days.',
      autoHide: false
    })
  }, [showNotification])

  function testNotification() {
    showNotification({
      type: 'error',
      hideAfter: 1500
    })
  }
  return (
    <div>
      <h2>This is my example app.</h2>
      <button onClick={testNotification}>See notification</button>
      <div style={{ height: '150vh' }}>scroll div</div>
    </div>
  )
}

export default App
