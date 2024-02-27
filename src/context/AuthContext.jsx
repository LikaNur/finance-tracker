/* eslint-disable react/prop-types */
import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

// Создание контекста для передачи данных авторизации
export const AuthContext = createContext();

// Редюсер для обработки различных действий в контексте авторизации
const authReducer = (state, action) => {
    switch(action.type) {
        // Действие, сигнализирующее о готовности авторизации
        case 'AUTH_IS_READY':
            return {...state, user: action.payload, authIsReady: true};
        // Действие при входе пользователя
        case 'LOGIN':
            return {...state, user: action.payload};
        // Действие при выходе пользователя
        case 'LOGOUT':
            return {...state, user: null};
        // Если неизвестное действие, оставляем текущее состояние
        default:
            return state;
    }
}

// Провайдер контекста для обертки приложения и предоставления данных об авторизации
export const AuthContextProvider = ({ children }) => {
    // Используем useReducer для управления состоянием авторизации
    const [state, dispatch] = useReducer(authReducer, { user: null, authIsReady: false });

    // Эффект, который подписывается на изменения в статусе аутентификации
    useEffect(() => {
        // onAuthStateChanged - метод Firebase, следящий за изменениями в состоянии аутентификации
        const unsub = auth.onAuthStateChanged((user) => {
            // При изменении вызывается действие 'AUTH_IS_READY' для обновления состояния
            dispatch({ type: 'AUTH_IS_READY', payload: user });
            // Отписываемся от подписки, чтобы избежать утечек памяти
            unsub();
        });
    }, []); // Пустой массив зависимостей гарантирует выполнение useEffect только при монтировании компонента

    console.log("authContext State is :", state);

    // Предоставление данных об авторизации всем компонентам вложенным в AuthContextProvider
    return (
        <AuthContext.Provider value={{ ...state, dispatch }}>
            {children}
        </AuthContext.Provider>
    );
}
