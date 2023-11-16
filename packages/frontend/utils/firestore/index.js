// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD_Ax4oFmlyFliIVviKece2G3kFDrmB_EE",
  authDomain: "dappsy-7f76b.firebaseapp.com",
  projectId: "dappsy-7f76b",
  storageBucket: "dappsy-7f76b.appspot.com",
  messagingSenderId: "604954853503",
  appId: "1:604954853503:web:1a9d57e43f5a3f9351bf4a",
  measurementId: "G-R5NDLN83LK",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app);
export const storage = getStorage(app, "gs://dappsy-7f76b.appspot.com");
