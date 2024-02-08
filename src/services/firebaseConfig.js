// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAKgzAq2vf6T_jXDQKTqz7HlnLF42krjMI",
  authDomain: "appmobilecontrolefinanceiro.firebaseapp.com",
  databaseURL: "https://appmobilecontrolefinanceiro-default-rtdb.firebaseio.com",
  projectId: "appmobilecontrolefinanceiro",
  storageBucket: "appmobilecontrolefinanceiro.appspot.com",
  messagingSenderId: "599237877544",
  appId: "1:599237877544:web:ae45cbfe68718579d47a1d",
  measurementId: "G-35XDJHBF8L"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };




