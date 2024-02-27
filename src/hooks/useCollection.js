import { useEffect, useState, useRef } from "react";

import { db } from "../firebase/config";

// Хук для получения данных из коллекции Firestore
export const useCollection = (collectionName, _query, _orderBy) => {
  // Состояние для хранения данных из коллекции
  const [transactions, setTransactions] = useState(null);
  // Состояние для хранения ошибки при получении данных
  const [error, setError] = useState(null);

  // Создание рефов для query и orderBy, чтобы избежать бесконечного цикла useEffect
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  useEffect(() => {
    // Получение ссылки на коллекцию
    let collectionReference = db.collection(collectionName);

    // Применение условий запроса, если они предоставлены
    if (query) {
      collectionReference = collectionReference.where(...query);
    }

    if (orderBy) {
      collectionReference = collectionReference.orderBy(...orderBy);
    }

    // Подписка на изменения в коллекции
    const unsub = collectionReference.onSnapshot(
      (snapshot) => {
        // Преобразование документов коллекции в массив объектов
        let docArray = [];
        snapshot.docs.forEach((doc) => {
          docArray.push({ ...doc.data(), id: doc.id });
        });
        // Установка данных и сброс ошибки
        setTransactions(docArray);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data!");
      }
    );

    // Очистка подписки при размонтировании компонента
    return () => {
      unsub();
    };
  }, [collectionName, query, orderBy]);

  // Возврат данных и ошибки для использования в компонентах
  return { transactions, error };
};
