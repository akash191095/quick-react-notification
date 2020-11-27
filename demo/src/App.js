import React, { useEffect } from "react";

import { useNotification } from "../../src/index";

const App = () => {
  const { showNotification } = useNotification();

  useEffect(() => {
    showNotification({ message: "Your order is placed.", hideAfter: 10000 });
  }, [showNotification]);

  function testNotification() {
    showNotification({ message: "Your order is placed.", hideAfter: 10000 });
  }
  return (
    <div>
      <h2>This is my example app.</h2>
      <button onClick={testNotification}>See notification</button>
    </div>
  );
};

export default App;
