import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyCj0qDyBvpJVFsPZpgJlJSw1HReIQd_XCY",
    authDomain: "musicweb-311d6.firebaseapp.com",
    projectId: "musicweb-311d6",
    storageBucket: "musicweb-311d6.appspot.com",
    messagingSenderId: "382958452129",
    appId: "1:382958452129:web:503359d430aacd4a77dfe0",
    measurementId: "G-EE2XZP85VG"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app)