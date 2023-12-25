// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from 'firebase/firestore';
import {getAuth} from 'firebase/auth';



const firebaseConfig = {
  apiKey: "AIzaSyBDVAxW548LwVCaf5EATfWMufl2YUywE1c",
  authDomain: "project-web-chat-6e72e.firebaseapp.com",
  databaseURL: "https://project-web-chat-6e72e-default-rtdb.firebaseio.com",
  projectId: "project-web-chat-6e72e",
  storageBucket: "project-web-chat-6e72e.appspot.com",
  messagingSenderId: "221369798854",
  appId: "1:221369798854:web:6ced8de0bad8aad94747c7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const fireDB = getFirestore(app);
const auth = getAuth(app);

export {fireDB, auth}