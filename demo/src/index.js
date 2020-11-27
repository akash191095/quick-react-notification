import { NotificaionProvider } from "../../src/index";

import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(
  <NotificaionProvider>
    <App />
  </NotificaionProvider>,
  document.querySelector("#demo")
);
