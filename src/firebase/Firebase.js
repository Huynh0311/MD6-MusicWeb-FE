// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCj0qDyBvpJVFsPZpgJlJSw1HReIQd_XCY",
    authDomain: "musicweb-311d6.firebaseapp.com",
    projectId: "musicweb-311d6",
    storageBucket: "musicweb-311d6.appspot.com",
    messagingSenderId: "382958452129",
    appId: "1:382958452129:web:503359d430aacd4a77dfe0",
    measurementId: "G-EE2XZP85VG"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)
const analytics = getAnalytics(app);