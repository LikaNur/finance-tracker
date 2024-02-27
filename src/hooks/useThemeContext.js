import { useContext } from "react";
import { ThemeContext } from "../context/ThemeContext";

// Хук для работы с контекстом темы приложения
export const useThemeContext = () => {
  // Получение контекста темы
  const context = useContext(ThemeContext);

  // Проверка наличия контекста
  if (!context) {
    throw new Error(
      "ThemeContext можно использовать только внутри ThemeContext Provider!"
    );
  }

  // Возврат контекста
  return context;
};
