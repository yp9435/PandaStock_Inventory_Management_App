// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyB-vJdjH5G1JvQVOysdTAhIpzb2KKSznJA",
  authDomain: "inventory-management-510b8.firebaseapp.com",
  projectId: "inventory-management-510b8",
  storageBucket: "inventory-management-510b8.appspot.com",
  messagingSenderId: "159691393584",
  appId: "1:159691393584:web:2f6daf5241f3ab98b37bf5",
  measurementId: "G-VB1NW7R16N"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const firestore = getFirestore(app);

export { firestore };