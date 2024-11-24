// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//     apiKey: "AIzaSyA2gRUG7ul0KqEGg0AlLsXbZSIygdVFJhw",
//     authDomain: "dsfsmd.firebaseapp.com",
//     projectId: "dsfsmd",
//     storageBucket: "dsfsmd.appspot.com",
//     messagingSenderId: "680192697923",
//     appId: "1:680192697923:web:a21a6ce29578e202d156f6",
//     measurementId: "G-K1CVP5ZFMY"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification } from 'firebase/auth';
import { getFirestore, doc, setDoc, updateDoc, getDoc, arrayUnion } from 'firebase/firestore';


const firebaseConfig = {
    apiKey: "AIzaSyA2gRUG7ul0KqEGg0AlLsXbZSIygdVFJhw",
    authDomain: "dsfsmd.firebaseapp.com",
    projectId: "dsfsmd",
    storageBucket: "dsfsmd.appspot.com",
    messagingSenderId: "680192697923",
    appId: "1:680192697923:web:a21a6ce29578e202d156f6",
    measurementId: "G-K1CVP5ZFMY"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const googleAuthProvider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, googleAuthProvider, sendPasswordResetEmail, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, sendEmailVerification, db, doc, setDoc, updateDoc, getDoc, arrayUnion };
