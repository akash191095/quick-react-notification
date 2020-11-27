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
import {useNotification} from 'quick-react-notification'
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
