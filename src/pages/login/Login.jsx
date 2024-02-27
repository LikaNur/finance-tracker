import { useState } from "react";

import { useLogin } from "../../hooks/useLogin";

import { useThemeContext } from "../../hooks/useThemeContext";

import loader from "../../assets/svg-loaders/three-dots.svg";

import "./LoginStyles.scss";

// Компонент Login для отображения формы входа
export const Login = () => {
  // Получение функций и состояний из хука useLogin
  const { login, error, isPending } = useLogin();

  // Состояния для управления введенными данными пользователя
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Получение текущей темы из хука useThemeContext
  const { mode } = useThemeContext();

  // Определение строки класса для темной темы
  let modeClassString = mode === "dark" ? "dark" : "";

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызов функции для входа пользователя с передачей введенных данных
    login(email, password);
  };

  // Визуальное представление формы входа
  return (
    <form className={`login-form ${modeClassString}`} onSubmit={handleSubmit}>
      <h2>Вход</h2>
      {/* Поле ввода для почты */}
      <label>
        <span>Почта:</span>
        <input
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          value={email}
          placeholder="Введите email"
          required
        />
      </label>

      {/* Поле ввода для пароля */}
      <label>
        <span>Пароль:</span>
        <input
          type="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          placeholder="Введите пароль"
          required
        />
      </label>

      {/* Кнопка для отправки формы, отображается только если запрос не находится в процессе выполнения */}
      <button className={`btn ${modeClassString}`}>Войти</button>

      {/* Индикатор загрузки, отображается во время выполнения запроса */}
      {isPending && (
        <img
          src={loader}
          alt="loader"
          style={{
            width: "10%", 
            display: "block",
            margin: "30px auto",
          }}
        ></img>
      )}

      {/* Отображение сообщения об ошибке, если оно есть */}
      {error && (
          <p
            className="error"
            style={{
              textAlign: "center",
              lineHeight: "30px", 
              marginTop: "0px",            
            }}>
            {error}
          </p>
        )}
    </form>
  );
};

export default Login;
