import { useAuthContext, useCollection, useThemeContext } from "../../hooks";

import { TransactionForm } from "../../components/Transactions/Form/TransactionForm";
import TransactionList from "../../components/Transactions/List/TransactionList";

import loader from "../../assets/svg-loaders/grid.svg";
import "./HomeStyles.scss";

// Компонент главной страницы
export const Home = () => {
  // Получение информации о пользователе из контекста аутентификации
  const { user } = useAuthContext();

  // Получение списка транзакций из хука useCollection
  const { transactions, error } = useCollection(
    "transactions",
    ["userId", "==", user?.uid],
    ["createdAt", "desc"]
  );

  // Получение текущей темы приложения из контекста темы
  const { mode } = useThemeContext();
  // Строка с классом для темы (light или dark)
  let modeClassString = mode === "dark" ? "dark" : "";

  // Отображение компонента
  return (
    <div className="container">
      <div className="content">
        {/* Вывод сообщения об ошибке, если она есть */}
        {error && <p>{error}</p>}
        {/* Вывод загрузчика, если транзакции загружаются */}
        {!error && !transactions && (
          <div className="image-container">
            <img src={loader} style={{ marginTop: "5em" }} alt="loader" />
          </div>
        )}
        {/* Отображение списка транзакций */}
        {transactions && (
          <TransactionList
            modeClassString={modeClassString}
            transactions={transactions}
          />
        )}
      </div>
      {/* Сайдбар с формой для добавления транзакции */}
      <div className={`sidebar ${modeClassString}`}>
        <TransactionForm user={user} />
      </div>
    </div>
  );
};

export default Home;
