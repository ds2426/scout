import React from "react";
import ReactDOM from "react-dom";
import "./styles/index.css";
import App from "./components/app";
import * as serviceWorker from "./serviceWorker";
import { BrowserRouter } from "react-router-dom";

ReactDOM.render(
  <BrowserRouter>
        <App />
  </BrowserRouter>,
  document.getElementById("root")
);
serviceWorker.unregister();
