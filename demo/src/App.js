import React, { useEffect } from 'react'

import { useNotification } from '../../src/index'

const App = () => {
  const { showNotification } = useNotification()

  useEffect(() => {
    showNotification({
      type: 'default',
      message: 'Your order is placed.',
      autoHide: false,
      hideAfter: 1500
    })
  }, [showNotification])

  function testNotification() {
    showNotification({
      type: 'error',
      message: 'Your order is placed.',
      hideAfter: 1500,
      autoHide: false
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
