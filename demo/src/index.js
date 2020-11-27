import { NotificationProvider } from '../../src/index'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <NotificationProvider>
    <App />
  </NotificationProvider>,
  document.querySelector('#demo')
)
