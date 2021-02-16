import * as firebase from 'firebase'
require('@firebase/firestore')

var firebaseConfig = {
    apiKey: "AIzaSyDDgYsRBUgwUs_xbaGWSvc68SGZ2Tixl2o",
    authDomain: "booksantaapp-9a1b8.firebaseapp.com",
    databaseURL: "https://booksantaapp-9a1b8-default-rtdb.firebaseio.com",
    projectId: "booksantaapp-9a1b8",
    storageBucket: "booksantaapp-9a1b8.appspot.com",
    messagingSenderId: "71838257908",
    appId: "1:71838257908:web:3018cd6d0830bf8692c4a1"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  
  export default firebase.firestore();