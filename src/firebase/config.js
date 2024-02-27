import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

// Конфигурация Firebase проекта
  const firebaseConfig = {
    apiKey: "AIzaSyCWm380FDmde_Ixr9J_q-Hq8EuFeU55bE8",
    authDomain: "humotracker.firebaseapp.com",
    projectId: "humotracker",
    storageBucket: "humotracker.appspot.com",
    messagingSenderId: "214087104277",
    appId: "1:214087104277:web:2df30205ab95a016af1b1c"
  };

// Инициализация Firebase приложения
firebase.initializeApp(firebaseConfig);

// Сервис для работы с Firestore
const db = firebase.firestore();

// Сервис аутентификации
const auth = firebase.auth();

// Сервис для работы с временем (Timestamp)
const timestamp = firebase.firestore.Timestamp;

export { db, auth, timestamp };
