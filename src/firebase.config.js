// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCaLsfUnrkIgQq46d7-wF_lb18FSEmwBOY",
  authDomain: "nttruongqn-b4156.firebaseapp.com",
  projectId: "nttruongqn-b4156",
  storageBucket: "nttruongqn-b4156.appspot.com",
  messagingSenderId: "782202780706",
  appId: "1:782202780706:web:cfae73d9559ec63764de7b",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
