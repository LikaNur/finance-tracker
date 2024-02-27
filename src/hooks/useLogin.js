import { useEffect, useState } from "react";

import { auth } from "../firebase/config";

import { useAuthContext } from "../hooks/useAuthContext";

// Хук для авторизации
export const useLogin = () => {
  // Состояния для отслеживания размонтирования, ошибки и состояния ожидания
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Получение диспетчера из контекста авторизации
  const { dispatch } = useAuthContext();

  // Функция для входа пользователя
  const login = async (email, password) => {
    setIsUnmounted(false);
    setError(null);
    setIsPending(true);
    try {
      // Авторизация через Firebase
      const response = await auth.signInWithEmailAndPassword(email, password);

      // Проверка наличия ответа
      if (!response) {
        throw new Error("Couldn't log in. Please try again!");
      }

      // Диспетчер для обновления контекста авторизации
      dispatch({ type: "LOGIN", payload: response.user });

      // Обновление состояний, если компонент не размонтирован
      if (!isUnmounted) {
        setIsPending(false);
        setError(null);
      }
    } catch (error) {
      console.log(error.message);
      const err = JSON.parse(error.message);

      let msg = "Default error";

      if (err.error.message === "INVALID_LOGIN_CREDENTIALS") {
        msg = "Логин или пароль введены неправильно";
      }

      setError(msg);
      setIsPending(false);
    }
  };

  // Для очистки эффектов
  useEffect(() => {
    return () => {
      setIsUnmounted(true);
    };
  }, []);

  // Возврат данных для входа пользователя
  return { login, error, isPending };
};
