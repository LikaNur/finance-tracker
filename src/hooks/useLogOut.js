import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { auth } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

// Хук для выхода из системы
export const useLogOut = () => {
  // Состояния для отслеживания размонтирования, ошибки и состояния ожидания
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Получение диспетчера из контекста авторизации
  const { dispatch } = useAuthContext();

  // Хук для навигации между страницами
  let navigate = useNavigate();

  // Функция для выхода из системы
  const logout = async () => {
    setError(null);
    setIsPending(true);

    // Выход пользователя из системы
    try {
      await auth.signOut();

      // Перенаправление на страницу входа
      navigate("/");

      // Диспетчер для обновления контекста авторизации (установка пользователя в null)
      dispatch({ type: "LOGOUT" });

      // Обновление состояний, если компонент не размонтирован
      if (!isUnmounted) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      // Обновление состояний, если компонент не размонтирован
      if (!isUnmounted) {
        console.log(error.message);
        setError(error.message);
        setIsPending(false);
      }
    }
  };

  // Для очистки эффектов
  useEffect(() => {
    return () => {
      setIsUnmounted(true);
    };
  }, []);

  // Возврат данных для выхода из системы
  return { logout, error, isPending };
};
