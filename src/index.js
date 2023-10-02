import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import store, { persistor } from "./store/store"; // Импортируем persistor
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react"; // Импортируем PersistGate

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        {" "}
        {/* Используем PersistGate */}
        <App />
      </PersistGate>
    </Provider>
  </BrowserRouter>
);
