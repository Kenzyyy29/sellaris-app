// Import the functions you need from the SDKs you need
import {getApps, initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore";
import {getAuth} from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
 apiKey: "AIzaSyAA7c-FT2zGG7PPl8ff4cwCcTRJThRgZRY",
 authDomain: "sellaris-app.firebaseapp.com",
 projectId: "sellaris-app",
 storageBucket: "sellaris-app.firebasestorage.app",
 messagingSenderId: "397622451498",
 appId: "1:397622451498:web:efa265a6ee65cf9aabd253",
};

// Initialize Firebase
const app =
 getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};
