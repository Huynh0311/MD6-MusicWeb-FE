import { initializeApp } from "firebase/app";
import { getAuth,GoogleAuthProvider} from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDvwhv54IDrcenRNamkdZlYOfNsyKk4fvs",
    authDomain: "music-app-ef484.firebaseapp.com",
    projectId: "music-app-ef484",
    storageBucket: "music-app-ef484.appspot.com",
    messagingSenderId: "1005655096784",
    appId: "1:1005655096784:web:617f30ab106294e9c2cdd5",
    measurementId: "G-W4JLLH4MNG"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export {auth,provider}