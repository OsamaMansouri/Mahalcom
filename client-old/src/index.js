import React from "react";
import ReactDOM from "react-dom";
import { Toaster } from "react-hot-toast";

import App from "./App";
import feather from "feather-icons";

ReactDOM.render(
  <React.StrictMode>
    <App />
    <Toaster />
  </React.StrictMode>,
  document.getElementById("root")
);

// Replace Feather icons after window load
window.addEventListener("load", () => {
  if (feather) {
    feather.replace({
      width: 14,
      height: 14,
    });
  }
});
