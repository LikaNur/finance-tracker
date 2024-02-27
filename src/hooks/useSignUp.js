import { useState, useEffect } from "react";

import { auth } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

// Хук для регистрации нового пользователя
export const useSignUp = () => {
  // Состояния для отслеживания размонтирования, ошибки и состояния ожидания
  const [isUnmounted, setIsUnmounted] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);

  // Контекст авторизации
  const { dispatch } = useAuthContext();

  // Функция для регистрации пользователя
  const signUp = async (email, password, displayName) => {
    setIsUnmounted(false);
    setError(null);
    setIsPending(true);

    try {
      // Регистрация пользователя
      const response = await auth.createUserWithEmailAndPassword(
        email,
        password
      );

      if (!response) {
        throw new Error(
          "Не удалось завершить регистрацию. Пожалуйста, попробуйте еще раз через некоторое время!"
        );
      }

      // Обновление профиля пользователя с отображаемым именем
      await response.user.updateProfile({ displayName });

      // Диспетчер для обновления контекста авторизации (установка пользователя)
      dispatch({ type: "LOGIN", payload: response.user });

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
      console.log("Unmounted");
      setIsUnmounted(true);
    };
  }, []);

  // Возврат данных для регистрации пользователя
  return { signUp, error, isPending };
};
