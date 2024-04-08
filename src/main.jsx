import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { Provider } from "react-redux";
import Store from "./Store.js";
import { ThemeProvider } from "./components/theme-provider.jsx";
import i18n from "./components/i18n.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <Provider store={Store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <React.StrictMode>
        <App />
      </React.StrictMode>
    </ThemeProvider>
  </Provider>
);
