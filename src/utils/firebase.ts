import firebase from 'firebase/app';
import 'firebase/analytics';
import "firebase/auth";
import "firebase/database";

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

  export const usersDb = () => {
    const usersRef = firebase.database().ref('users');
    const saveUser = (user: any) => {
      return usersRef.child(user.uid).set({
        name: user.displayName,
        photoURL: user.photoURL || "",
        email: user.email
      });
    };

    return {
      saveUser
    }
  }

  export const DB_TABLES = {
    users: 'users',
    starredBoards: 'boardStars',
    boards: 'boards',
    lists: 'lists',
    cards: 'cards',
    cardItems: 'cardItems'
  }

  export const DB_REFS = {
    users: firebase.database().ref(DB_TABLES.users),
    starredBoards: firebase.database().ref(DB_TABLES.starredBoards),
    boards: firebase.database().ref(DB_TABLES.boards),
    lists: firebase.database().ref(DB_TABLES.lists),
    cards: firebase.database().ref(DB_TABLES.cards),
    cardItems: firebase.database().ref(DB_TABLES.cardItems),
  };


  export default firebase;