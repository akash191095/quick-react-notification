# quick-react-notification

### Example Demo App

##### [https://akash191095.github.io/quick-react-notifications/](https://akash191095.github.io/quick-react-notifications/)

<br>

### How to use

#### Use "NotificationProvider" as the root wrapper.

```
import { NotificationProvider } from "quick-react-notification";

ReactDOM.render(
  <React.StrictMode>
    <NotificationProvider>
      <App />
    </NotificationProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
```

#### Use "useNotification" hook

```
import { useNotification } from 'quick-react-notification'
const { showNotification } = useNotification();
```

#### Use "showNotification()" to show a notification.

```
onClick={() => {
          addAServer();
          showNotification({type: 'success', message: "A new server has been added."})
        }}
```

#### Options

```
showNotification({}) takes in an object with the following options:

autoHide: Auto hide the notification after some duration, needs a boolean value.

hideAfter: The auto hide duration in miliseconds.

type: type of notification, currently have "success", "info", "warning", "error" available, needs a string value.

message: text message to show, needs a string value.
```

<br>

### How to extend and customise notification types

#### Use NotificationProvider's extentType prop

```
// Provide a pure function that takes in a type and return's both backgroundColor and a fontAwesome icon
// You can also overwrite build in types like 'success'

import { faBomb } from '@fortawesome/free-solid-svg-icons'

function extendNotificationTypes(type) {
  switch (type) {
    case 'lvl-5-error':
      return { backgroundColor: '#f05454', src: faBomb }
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

// Then use it like
showNotification({type: 'lvl-5-error'})
```
