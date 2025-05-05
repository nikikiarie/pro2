// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCdYJh3G70tNpSlPeAwPuc0EtgieNRrFqs",
  authDomain: "example-one1.firebaseapp.com",
  projectId: "example-one1",
  storageBucket: "example-one1.appspot.com",
  messagingSenderId: "596926552585",
  appId: "1:596926552585:web:dd6ee55d7415bfe62cb6d8",
  measurementId: "G-YPM2HCPZR3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)