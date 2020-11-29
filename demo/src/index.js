import { NotificationProvider } from '../../src/index'
import { faBomb } from '@fortawesome/free-solid-svg-icons'

import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'

function extendNotificationTypes(type) {
  switch (type) {
    case 'lvl-5-error':
      return {
        backgroundColor: '#f05454',
        src: faBomb,
        textColor: 'white',
        iconColor: 'white',
        closeColor: 'white',
        autoHide: false
      }
    default:
      return null
  }
}

ReactDOM.render(
  <NotificationProvider extendTypes={extendNotificationTypes}>
    <App />
  </NotificationProvider>,
  document.querySelector('#demo')
)
