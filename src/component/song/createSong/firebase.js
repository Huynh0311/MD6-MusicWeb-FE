// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuflEETcmEeQY67zNVpZQDe0SwjAYCvl4",
    authDomain: "test-d4d5f.firebaseapp.com",
    projectId: "test-d4d5f",
    storageBucket: "test-d4d5f.appspot.com",
    messagingSenderId: "819496964325",
    appId: "1:819496964325:web:609e71393eb870167e440c",
    measurementId: "G-EWRN6HJPBY"
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
 export const storage = getStorage(app)
const analytics = getAnalytics(app);