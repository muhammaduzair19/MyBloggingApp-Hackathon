


import { initializeApp } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-app.js";
import { getAuth,  createUserWithEmailAndPassword, signOut, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-auth.js";
import { getFirestore, where, deleteDoc,query, orderBy, serverTimestamp, setDoc, collection, getDocs, doc, addDoc, getDoc } from "https://www.gstatic.com/firebasejs/10.2.0/firebase-firestore.js";


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration


const firebaseConfig = {
    apiKey: "AIzaSyCYUv9Gxt21U-WyafBBXZBBMhIADR_nsqA",
    authDomain: "personalbloggingapp.firebaseapp.com",
    projectId: "personalbloggingapp",
    storageBucket: "personalbloggingapp.appspot.com",
    messagingSenderId: "495411619599",
    appId: "1:495411619599:web:067702dd83e3647544007a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, where, signOut, deleteDoc, collection, serverTimestamp, getDocs, addDoc,  createUserWithEmailAndPassword, signInWithEmailAndPassword, db, setDoc, doc, onAuthStateChanged, getDoc, query, orderBy}
