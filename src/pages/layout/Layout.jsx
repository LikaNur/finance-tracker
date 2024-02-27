import { useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { useAuthContext } from "../../hooks/useAuthContext";

import { Navbar } from "../../components";

import "./LayoutStyles.scss";

// Компонент Layout, который содержит общий макет страницы
const Layout = () => {
    // Хук для навигации
    let navigate = useNavigate();
    
    // Использование хука useAuthContext для получения данных пользователя
    const { user } = useAuthContext();

    // Перенаправление пользователя на главную страницу, если он авторизован и имеет имя пользователя
    useEffect(() => {
        if (user && user.displayName) {
            navigate("/home");
        }
    }, [navigate, user]);

    // Отрисовка компонента
    return (
        <div>
            {/* Включение Navbar */}
            <Navbar />
            
            {/* Outlet для вложенных маршрутов */}
            <Outlet />
        </div>
    );
};

export default Layout;
