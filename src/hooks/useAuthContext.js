import { AuthContext } from "../context/AuthContext";
import { useContext } from "react";

// Хук для удобного доступа к контексту аутентификации
export const useAuthContext = () => {
  // Использование хука useContext для получения значения из AuthContext
  const context = useContext(AuthContext);

  // Проверка наличия контекста
  if (!context) {
    throw new Error(
      "AuthContext can only be accessed inside an AuthContext Provider!"
    );
  }

  // Возвращение полученного контекста
  return context;
};
