import React from "react";
import ReactDOM from "react-dom";
import { createStore, Provider } from "store";
import { RootModel, snapshot } from "store/Root";
import "./index.css";
import App from "./App";

const store = createStore(RootModel, snapshot, {});

ReactDOM.render(
  <React.StrictMode>
    <Provider value={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
