import './index.css'
import { NotificaionProvider } from 'quick-react-notifications'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

ReactDOM.render(
  <NotificaionProvider>
    <App />
  </NotificaionProvider>,
  document.getElementById('root')
)
