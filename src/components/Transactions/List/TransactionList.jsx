/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";

import { useFirestore } from "../../../hooks/useFirestore";

import "../../Transactions/List/TransactionListStyles.scss";

import editIcon from "../../../assets/edit.svg";

// Компонент списка транзакций
const TransctionList = ({ transactions, modeClassString }) => {
  const [showNameInput, setShowNameInput] = useState(false);
  const [showAmountInput, setShowAmountInput] = useState(false);
  const [editTransactionId, setEditTransactionId] = useState(null);
  const [editAmountValue, setEditAmountValue] = useState("");
  const [editNameValue, setEditNameValue] = useState("");

  const { deleteTransaction, updateTransaction, response } =
    useFirestore("transactions");

  // Опции для форматирования даты
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };

  let date;

  // Переводим дату в строку в нужном формате
  transactions.forEach((transaction) => {
    date = transaction.createdAt.toDate().toLocaleDateString("ru-RU", options);
  });

  // Обработчик обновления транзакции
  const handleUpdate = (name, amount) => {
    updateTransaction(editTransactionId, {
      transactionName: editNameValue ? editNameValue : name,
      transactionAmount: editAmountValue ? editAmountValue : amount,
    });
    handleNameCancel();
    handleAmountCancel();
  };

  // Обработчики для отображения полей ввода
  const handleShowNameInput = (id, name) => {
    setEditNameValue(name);
    setEditTransactionId(id);
    setShowAmountInput(false);
    setShowNameInput(true);
  };

  const handleShowAmountInput = (id, amount) => {
    setEditAmountValue(amount);
    setEditTransactionId(id);
    setShowAmountInput(true);
    setShowNameInput(false);
  };

  const handleNameCancel = () => {
    setShowNameInput(false);
    setEditTransactionId(null);
  };

  const handleAmountCancel = () => {
    setShowAmountInput(false);
    setEditTransactionId(null);
  };

  // Обработчик завершения обновления
  useEffect(() => {
    console.log("response: ", response);
    if (response.isSuccess) {
      handleNameCancel();
    }
  }, [response]);

  // Отрисовка компонента
  return (
    <ul className={`transactions ${modeClassString}`}>
      {transactions.map((transaction) => (
        <li key={transaction.id}>
          <div>
            <p className="date">{date}</p>
            {showNameInput && editTransactionId === transaction.id && (
              <div className="edit-container">
                <input
                  className="edit-input"
                  value={editNameValue}
                  onChange={(e) => setEditNameValue(e.target.value)}
                />
                {!response.isPending ? (
                  <div className="buttons-container">
                    <button
                      className="btn edit-button"
                      onClick={() =>
                        handleUpdate(
                          transaction.transactionName,
                          transaction.transactionAmount
                        )
                      }
                    >
                      Обновить
                    </button>
                    <button
                      className="btn edit-button"
                      onClick={handleNameCancel}
                    >
                      Отмена
                    </button>
                  </div>
                ) : (
                  "Loading..."
                )}
              </div>
            )}
            {/* {response.isPending && "Loading..."} */}
            {!showNameInput || !(transaction.id === editTransactionId) ? (
              <p className="name">
                {transaction.transactionName}
                <img
                  className="edit-icon"
                  src={editIcon}
                  alt="Edit Transaction"
                  onClick={() =>
                    handleShowNameInput(
                      transaction.id,
                      transaction.transactionName
                    )
                  }
                />
              </p>
            ) : null}
          </div>
          {showAmountInput && editTransactionId === transaction.id && (
            <div className="edit-amount-container">
              <input
                className="edit-input"
                value={editAmountValue}
                onChange={(e) => setEditAmountValue(e.target.value)}
                type="number"
              />
              <div className="buttons-container">
                <button
                  className="btn edit-button"
                  onClick={() =>
                    handleUpdate(
                      transaction.transactionName,
                      transaction.transactionAmount
                    )
                  }
                >
                  Обновить
                </button>
                <button
                  className="btn edit-button"
                  onClick={handleAmountCancel}
                >
                  Отмена
                </button>
              </div>
            </div>
          )}
          {!showAmountInput || !(transaction.id === editTransactionId) ? (
            <p className="amount">
              {transaction.transactionAmount}
              <img
                className="edit-icon"
                src={editIcon}
                alt="Edit Transaction"
                onClick={() =>
                  handleShowAmountInput(
                    transaction.id,
                    transaction.transactionAmount
                  )
                }
              />
            </p>
          ) : null}
          <button onClick={() => deleteTransaction(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
};

export default TransctionList;
