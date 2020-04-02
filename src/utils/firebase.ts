import firebase from 'firebase/app';
import 'firebase/analytics';
import "firebase/auth";

// Your web app's Firebase configuration
  var firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: "trello-clone-5f7bd.firebaseapp.com",
    databaseURL: "https://trello-clone-5f7bd.firebaseio.com",
    projectId: "trello-clone-5f7bd",
    storageBucket: "trello-clone-5f7bd.appspot.com",
    messagingSenderId: "848422855875",
    appId: "1:848422855875:web:9dbc33900a723ab6682e76",
    measurementId: "G-CZ79278QV5"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  export default firebase;