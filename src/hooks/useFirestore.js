import { useReducer } from "react";
import { db, timestamp } from "../firebase/config";

// Начальное состояние хранилища для работы с Firestore
let initialState = {
  document: null,
  isPending: false,
  error: null,
  isSuccess: false,
};

// Редуктор для управления состоянием хранилища
const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return {
        isPending: true,
        document: null,
        error: null,
        isSuccess: false,
      };
    case "DOCUMENT_ADDED":
      return {
        isPending: false,
        document: action.payload,
        isSuccess: true,
        error: null,
      };
    case "DOCUMENT_DELETED":
      return {
        isPending: false,
        document: null,
        isSuccess: true,
        error: null,
      };
    case "DOCUMENT_UPDATED":
      return {
        isPending: false,
        document: action.payload,
        isSuccess: true,
        error: null,
      };
    case "ERROR":
      return {
        error: action.payload,
        isPending: false,
        document: null,
        isSuccess: false,
      };
    default:
      return state;
  }
};

// Хук для взаимодействия с Firestore коллекцией
export const useFirestore = (collectionName) => {
  // Состояние и диспетчер редуктора
  const [response, dispatch] = useReducer(firestoreReducer, initialState);

  // Ссылка на коллекцию Firestore по переданному имени
  const collectionReference = db.collection(collectionName);

  // Добавление новой транзакции в коллекцию
  const addTransaction = async (transaction) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const createdAt = timestamp.fromDate(new Date());
      transaction = { ...transaction, createdAt };
      const response = await collectionReference.add(transaction);
      dispatch({ type: "DOCUMENT_ADDED", payload: response });
    } catch (error) {
      dispatch({ type: "ERROR", payload: error.message });
    }
  };

  // Удаление транзакции из коллекции
  const deleteTransaction = async (transactionId) => {
    dispatch({ type: "IS_PENDING" });
    try {
      await collectionReference.doc(transactionId).delete();
      dispatch({ type: "DOCUMENT_DELETED" });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Could not Delete!" });
    }
  };

  // Обновление транзакции в коллекции
  const updateTransaction = async (transactionId, data) => {
    dispatch({ type: "IS_PENDING" });
    try {
      const response = await collectionReference
        .doc(transactionId)
        .update(data);
      dispatch({ type: "DOCUMENT_UPDATED", payload: response });
    } catch (error) {
      dispatch({ type: "ERROR", payload: "Could not Update!" });
    }
  };

  // Возврат состояния и функций для взаимодействия с Firestore
  return { response, addTransaction, deleteTransaction, updateTransaction };
};
