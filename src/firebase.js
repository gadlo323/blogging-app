import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyA7zj-K8G8C5uEjD716cuFAC-SyCBpKMVE",
  authDomain: "blogging-7cea1.firebaseapp.com",
  databaseURL: "https://blogging-7cea1.firebaseio.com",
  projectId: "blogging-7cea1",
  storageBucket: "blogging-7cea1.appspot.com",
  messagingSenderId: "170942674605",
  appId: "1:170942674605:web:353bf812c86abad85df824",
  measurementId: "G-5DG8WLEF00",
};

firebase.initializeApp(firebaseConfig);

export default firebase;
