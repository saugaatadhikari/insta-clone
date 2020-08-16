import firebase from "firebase";
const firebaseApp = firebase.initializeApp({

    
        apiKey: "AIzaSyCd7rHcsHPi3R_jmt4AsnCjCc8DA6GpYSE",
        authDomain: "insta-clone-d2bff.firebaseapp.com",
        databaseURL: "https://insta-clone-d2bff.firebaseio.com",
        projectId: "insta-clone-d2bff",
        storageBucket: "insta-clone-d2bff.appspot.com",
        messagingSenderId: "54856537085",
        appId: "1:54856537085:web:bfbff2aaecb9ebd1de3f94",
        measurementId: "G-TTXZJ3K9P2"
     
});

const db = firebaseApp.firestore();
const auth = firebase.auth();
const storage = firebase.storage();





  export {db, auth, storage}