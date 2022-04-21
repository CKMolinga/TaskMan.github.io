// import firebase 
import firebase from 'firebase/app';
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCid1IJpt7Yfougjc9noxuT00P1uO7MHw0",
    authDomain: "taskman-81e6f.firebaseapp.com",
    projectId: "taskman-81e6f",
    storageBucket: "taskman-81e6f.appspot.com",
    messagingSenderId: "898394403887",
    appId: "1:898394403887:web:61c31d8b99d1e7260302da"
};

// init firebase app
firebase.initializeApp(firebaseConfig);

// init firestore serveice for database
const db = firebase.firestore();
const timestamp = firebase.firestore.FieldValue.serverTimestamp;

// export firebase and db
export { firebase, db, timestamp };