/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { useFirestore } from "../../../hooks/useFirestore";

import "../../Transactions/Form/TransactionFormStyles.scss"

// Компонент формы для добавления транзакции
export const TransactionForm = ({ user }) => {
  // Состояния для хранения данных формы
  const [transactionName, setTransactionName] = useState("");
  const [transactionAmount, setTransactionAmount] = useState("");

  // Использование хука useFirestore для добавления транзакции
  const { addTransaction, response } = useFirestore("transactions");

  // Обработчик отправки формы
  const handleSubmit = (e) => {
    e.preventDefault();
    // Вызов функции добавления транзакции
    addTransaction({ transactionName, transactionAmount, userId: user.uid });
  };

  // Сброс формы после успешного добавления транзакции
  useEffect(() => {
    if (response.isSuccess) {
      setTransactionName("");
      setTransactionAmount("");
    }
  }, [response.isSuccess]);

  // Отрисовка компонента
  return (
    <>
      <h3>Добавить транзакцию</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Название транзакции :</span>
          <input
            type="text"
            value={transactionName}
            onChange={(e) => setTransactionName(e.target.value)}
            placeholder="Название транзакции"
            required
          />
        </label>

        <label>
          <span>Сумма (TJS) :</span>
          <input
            type="number"
            value={transactionAmount}
            onChange={(e) => setTransactionAmount(e.target.value)}
            placeholder="Сумма в сомони"
            required
          />
        </label>
        <button>Добавить</button>
      </form>
    </>
  );
};
