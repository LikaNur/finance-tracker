import { Link } from "react-router-dom";
import { useLogOut } from "../../hooks/useLogOut";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useThemeContext } from "../../hooks/useThemeContext";

import "./NavbarStyles.scss";

import toggleOn from "../../assets/toggle_on.svg";
import toggleOff from "../../assets/toggle_off.svg";
import logoLight from "../../assets/logo-light.png";
import logoDark from "../../assets/logo-dark.png";

// Функциональный компонент Navbar для отображения навигационной панели
export const Navbar = () => {
  // Получение информации о пользователе и режиме отображения из кастомных хуков
  const { user } = useAuthContext();
  const { mode, changeMode } = useThemeContext();

  // Определение строки класса для режима темной темы
  let modeClassString = mode === "dark" ? "dark" : "";

  // Получение функции для выхода из системы
  const { logout } = useLogOut();

  return (
    // Верстка навигационной панели с учетом класса для темной темы
    <nav className={`navbar ${modeClassString}`}>
      <ul>
        {/* Отображение логотипа с учетом режима темы */}
        {/* Отображение названия приложения */}
        <li className="title">
          <Link to="/">
            <div className="logo">
              <img
                className="title-img"
                src={mode === "dark" ? logoLight : logoDark}
                alt="Logo"
              />
              <div className={`logo-title ${modeClassString}`}>Онлайн</div>
            </div>
          </Link>
        </li>

        {/* Отображение ссылок для незарегистрированных пользователей */}
        {!user && (
          <>
            <li>
              <Link to="/login">Войти</Link>
            </li>

            <li>
              <Link to="/signup">Регистрация</Link>
            </li>
          </>
        )}

        {/* Отображение информации для зарегистрированных пользователей */}
        {user && (
          <>
            <li style={{ marginRight: "2em" }}>
              Здравствуйте, {user.displayName}!
            </li>
            <li>
              {/* Кнопка для выхода из системы */}
              <button
                className={`btn ${modeClassString}`}
                onClick={() => logout()}
              >
                Выйти
              </button>
            </li>
          </>
        )}

        {/* Кнопка для переключения режима темы с учетом текущего режима */}
        <img
          className="darkmode-img"
          src={mode === "dark" ? toggleOn : toggleOff}
          alt="Dark Mode Toggle"
          onClick={() => changeMode()}
          style={{
            filter:
              mode === "dark"
                ? "invert(100%) sepia(0%) hue-rotate(0deg)"
                : "invert(66%) sepia(100%) saturate(4047%) hue-rotate(354deg) brightness(100%) contrast(88%)",
          }}
        />
      </ul>
    </nav>
  );
};
