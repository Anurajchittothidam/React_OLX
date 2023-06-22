import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyAGuwId0os0ybTpa-fFhonW7sjtJ5nRS1w",
  authDomain: "olx-clone-76a02.firebaseapp.com",
  projectId: "olx-clone-76a02",
  storageBucket: "olx-clone-76a02.appspot.com",
  messagingSenderId: "386126308572",
  appId: "1:386126308572:web:fd54314301054c93600019",
  measurementId: "G-0WFJZB011Y"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app)
export const storage = getStorage(app);