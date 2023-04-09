
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCpdaNIdttVak8FEL9qtFQYiJYpWb16SYQ",
  authDomain: "x-strorre.firebaseapp.com",
  projectId: "x-strorre",
  storageBucket: "x-strorre.appspot.com",
  messagingSenderId: "165308061427",
  appId: "1:165308061427:web:e2cbd029285558e6a68986"
};

const app = !firebase.apps.length
? firebase.initializeApp(firebaseConfig)
: firebase.app();

const db = app.firestore();

export default db;