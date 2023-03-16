// Import the functions you need from the SDKs you need
import { initializeApp, getApp,getApps } from "firebase/app";
import {getFirestore} from 'firebase/firestore'
import {getStorage} from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBX9_VuO_NeZrJ0U2u_7qqF5ob57YhsSGk",
  authDomain: "cloneapp-d65ed.firebaseapp.com",
  projectId: "cloneapp-d65ed",
  storageBucket: "cloneapp-d65ed.appspot.com",
  messagingSenderId: "560145706769",
  appId: "1:560145706769:web:b0eeff5a2471694e2b66b0"
};

// Initialize Firebase
const app =!getApps().length ? initializeApp(firebaseConfig):getApp();
const db= getFirestore();
const storage= getStorage();

export{app,db,storage}