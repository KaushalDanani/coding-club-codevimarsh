// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAycLPTGWxlezCRZU4g3wt8-9o3hJc_kyw",
  authDomain: "coding-club-msu.firebaseapp.com",
  projectId: "coding-club-msu",
  storageBucket: "coding-club-msu.appspot.com",
  messagingSenderId: "578526438450",
  appId: "1:578526438450:web:f411ed9a93f886f744082b",
  measurementId: "G-EMWDH17LZ8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export default app;