import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyAZrIXjDeS_GwiKDHhLvMrm7QJY7GrzFNs",
  authDomain: "assign3-d615c.firebaseapp.com",
  databaseURL: "https://assign3-d615c-default-rtdb.firebaseio.com",
  projectId: "assign3-d615c",
  storageBucket: "assign3-d615c.appspot.com",
  messagingSenderId: "270125398437",
  appId: "1:270125398437:web:f8d7141f13f7972074d04c",
  measurementId: "G-BS2J4FWH66"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getStorage(app);
export default analytics