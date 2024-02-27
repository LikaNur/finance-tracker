/* eslint-disable react/prop-types */
import { createContext, useEffect, useState } from "react";

// Создание контекста для передачи данных о теме приложения
export const ThemeContext = createContext();

// Провайдер контекста для обертки приложения и предоставления данных о теме
export const ThemeContextProvider = ({ children }) => {
    // Состояние для хранения текущего режима темы
    const [mode, setMode] = useState('light');

    // Функция для изменения режима темы между светлым и темным
    const changeMode = () => {
        setMode(prevMode => {
            return prevMode === 'light' ? 'dark' : 'light';
        });
    }

    // Эффект, срабатывающий при монтировании компонента, чтобы восстановить сохраненный режим темы из локального хранилища
    useEffect(() => {
        if (localStorage.getItem('mode')) {
            setMode(localStorage.getItem('mode'));
        }
    }, []);

    // Эффект, срабатывающий при изменении режима темы, чтобы обновить классы темы в body и сохранить выбранный режим в локальном хранилище
    useEffect(() => {
        if (mode === 'dark') {
            document.body.classList.add('dark');
        } else {
            document.body.classList.remove('dark');
        }
        localStorage.setItem('mode', mode);
    }, [mode]);

    // Предоставление данных о теме всем компонентам вложенным в ThemeContextProvider
    return (
        <ThemeContext.Provider value={{ mode, changeMode }}>
            {children}
        </ThemeContext.Provider>
    );
}
