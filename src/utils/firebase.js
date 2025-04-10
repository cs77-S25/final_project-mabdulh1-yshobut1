// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore"; 
import { collection, getDocs } from "firebase/firestore"; 


// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk5siIzNE7DDvZ6j7U1BOYGAJ7X8UuFYA",
  authDomain: "swatswap-3dd41.firebaseapp.com",
  projectId: "swatswap-3dd41",
  storageBucket: "swatswap-3dd41.firebasestorage.app",
  messagingSenderId: "828741880334",
  appId: "1:828741880334:web:ed8ac39662e9106f980a5f",
  measurementId: "G-Y36F7YVE9Y"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const db = getFirestore(app);``


// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


//Add Data 
try {
  const docRef = await addDoc(collection(db, "users"), {
    first: "Ada",
    last: "Lovelace",
    born: 1815
  });
  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}


//Read Data
const querySnapshot = await getDocs(collection(db, "users"));
querySnapshot.forEach((doc) => {
  console.log(`${doc.id} => ${doc.data()}`);
});