import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";


// Initialize Firebase
const app = initializeApp ({
    apiKey: "AIzaSyB3xx1Hf6FuwOXf30QKRtZjpv-d1DF72ho",
    authDomain: "media-socia.firebaseapp.com",
    projectId: "media-socia",
    storageBucket: "media-socia.appspot.com",
    messagingSenderId: "58410981071",
    appId: "1:58410981071:web:b4170e05d7a87b13ef09ba"
});
 
// Firebase storage reference
export const storage = getStorage(app);
export const db = getFirestore(app);
 
