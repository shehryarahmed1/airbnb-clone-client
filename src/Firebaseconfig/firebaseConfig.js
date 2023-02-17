import { initializeApp } from "firebase/app";
// import { getFirestore } from "firebase/firestore"; // To make crud operations
// import { getAnalytics } from "firebase/analytics";const firebaseConfig = {
import { getStorage } from "firebase/storage"; // For storage
const firebaseConfig = {
  apiKey: "AIzaSyArLRC0Ra6NrFNFjRmINrOUgVbCKAfTQRQ",
  authDomain: "travel-agency-fed19.firebaseapp.com",
  projectId: "travel-agency-fed19",
  storageBucket: "travel-agency-fed19.appspot.com",
  messagingSenderId: "758779057345",
  appId: "1:758779057345:web:ba3712bfc3d828bdf3f040",
  measurementId: "G-4C3G516DSM"
};
export const app = initializeApp(firebaseConfig);
// export const database = getFirestore(app); // To make crud operations
export const storage = getStorage(app); // For storage
// const analytics = getAnalytics(app);




