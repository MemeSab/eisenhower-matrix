import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyD7LjKn33ipfBnFtLfQf2oigOpY5usYpsA",
  authDomain: "eisenhower-matrix-3c4rl.firebaseapp.com",
  projectId: "eisenhower-matrix-3c4rl",
  storageBucket: "eisenhower-matrix-3c4rl.appspot.com",
  messagingSenderId: "798342911557",
  appId: "1:798342911557:web:2af4612de420d0dcfeb52c",
  databaseURL: "https://eisenhower-matrix-3c4rl-default-rtdb.europe-west1.firebasedatabase.app"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
