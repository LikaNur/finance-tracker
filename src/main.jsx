import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

import { AuthContextProvider } from "./context/AuthContext";

import { ThemeContextProvider } from "./context/ThemeContext";

// Рендер приложения с использованием строгого режима и провайдеров контекста
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    {/* Оборачивание приложения в провайдер контекста аутентификации */}
    <AuthContextProvider>
      {/* Оборачивание приложения в провайдер контекста темы */}
      <ThemeContextProvider>
        {/* Рендер компонента App */}
        <App />
      </ThemeContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);
