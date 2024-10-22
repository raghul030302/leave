
import { initializeApp } from "firebase/app";
import { getStorage} from "firebase/storage"
import {getFirestore} from 'firebase/firestore'
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA19sPf2zF9ImjWnmPQOlcUeoZmMURHDIA",
  authDomain: "cdlmini-6a742.firebaseapp.com",
  databaseURL: "https://cdlmini-6a742-default-rtdb.firebaseio.com",
  projectId: "cdlmini-6a742",
  storageBucket: "cdlmini-6a742.appspot.com",
  messagingSenderId: "873200260635",
  appId: "1:873200260635:web:788ba35f7dc5021020cabe",
  measurementId: "G-K202PVZCW5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

//export firestore data base
export const db = getFirestore(app)

export const storage = getStorage(app)

export const database = getDatabase(app)
