import { Route, BrowserRouter, Routes } from "react-router-dom";

import { Login } from "./pages/login/Login";
import { Signup } from "./pages/signup/Signup";
import Landing from './pages/landing/Landing';
import { useAuthContext } from "./hooks/useAuthContext";

import Home from "./pages/home";

import Layout from "./pages/layout";

// Основной компонент приложения
function App() {
  // Деструктуризация значений из хука AuthContext
  const { authIsReady } = useAuthContext();

  // Рендер компонента App
  return (
    <div className="App">
      {/* Проверка готовности аутентификации */}
      {authIsReady && (
        <BrowserRouter>
          {/* Определение маршрутов с использованием React Router */}
          <Routes>
            {/* Использование компонента Layout в качестве обертки для маршрутов */}
            <Route element={<Layout />}>
              {/* Маршрут для домашней страницы */}
              <Route path="/home" element={<Home />} />
              <Route exact path="/" element={<Landing />} />

              {/* Маршрут для страницы входа */}
              <Route path="/login" element={<Login />} />
              {/* Маршрут для страницы регистрации */}
              <Route path="/signup" element={<Signup />} />
            </Route>
          </Routes>
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;


