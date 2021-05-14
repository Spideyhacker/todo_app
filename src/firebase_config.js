import firebase from "firebase";

var firebaseConfig = {
  apiKey: "AIzaSyBuV94qgFUXO57frTXzh0JXw3ZwWQ6Wa3M",
  authDomain: "to-do-app-132435.firebaseapp.com",
  projectId: "to-do-app-132435",
  storageBucket: "to-do-app-132435.appspot.com",
  messagingSenderId: "201334403706",
  appId: "1:201334403706:web:bc4d854be0aeafdbfb41c3",
};

firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export { db };
