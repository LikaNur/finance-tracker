import { useEffect, useState, useRef } from "react";

import { useSignUp } from "../../hooks/useSignUp";

import loader from "../../assets/svg-loaders/three-dots.svg";

import { useThemeContext } from "../../hooks/useThemeContext";

import "./SignupStyles.scss";

// Компонент Signup для регистрации новых пользователей
export const Signup = () => {
    // Состояния для хранения введенных пользователем данных
    const [displayName, setDisplayName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [passwordMismatch, setPasswordMismatch] = useState(false);

    // Использование кастомного хука для регистрации
    const { signUp, error, isPending } = useSignUp();

    // Получение информации о теме из контекста
    const { mode } = useThemeContext();
    // Добавление класса для темной темы
    let modeClassString = mode === "dark" ? "dark" : "";

    // Обработчик события для отправки формы
    const handleSubmit = (e) => {
        e.preventDefault();
        if (!passwordMismatch) {
            signUp(email, password, displayName);
        }
    };

    // Создание ссылки для поля подтверждения пароля
    const confirmRef = useRef();

    // Эффект для проверки совпадения паролей
    useEffect(() => {
        if (password && confirmRef.current.value.length > 0) {
            if (password !== confirmPassword) {
                setPasswordMismatch(true);
            } else {
                setPasswordMismatch(false);
            }
        } else {
            setPasswordMismatch(false);
        }
    }, [password, confirmPassword]);

    // Отрисовка компонента
    return (
        <form className={`signup-form ${modeClassString}`} onSubmit={handleSubmit}>
            <h2>Регистрация</h2>
            <label>
                <span>Имя:</span>
                <input
                    type="text"
                    onChange={(e) => setDisplayName(e.target.value.trim())}
                    value={displayName}
                    placeholder="Имя пользователя"
                    required
                />
            </label>
            <label>
                <span>Почта:</span>
                <input
                    type="email"
                    onChange={(e) => setEmail(e.target.value.trim())}
                    value={email}
                    placeholder="Почта пользователя"
                    required
                />
            </label>

            <label>
                <span>Пароль:</span>
                <input
                    type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    placeholder="Пароль"
                    required
                />
            </label>

            <label>
                <span>Подтвердить пароль:</span>
                <input
                    type="password"
                    ref={confirmRef}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    value={confirmPassword}
                    placeholder="Повторите пароль"
                    required
                    disabled={password === ""}
                />
                {passwordMismatch && (
                    <p className="error"  
                    style={{
                       textAlign: "center" , 
                       lineHeight:"30px"
                }}>Пароли не совпадают. Пожалуйста, проверьте еще раз!</p>
                )}
            </label>

            {/* Если запрос на регистрацию не выполняется, отображается кнопка */}
            {!isPending && (
                <button className={`btn ${modeClassString}`}>Регистрация</button>
            )}

            {/* Если запрос на регистрацию выполняется, отображается индикатор загрузки */}
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

            {/* Если возникла ошибка при регистрации, отображается сообщение об ошибке */}
            {error && <p className="error">{error}</p>}
        </form>
    );
};

export default Signup