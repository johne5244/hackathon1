import firebase from 'firebase'
import "firebase/firestore"
import "firebase/auth"

export const app = firebase.initializeApp({
  apiKey: "AIzaSyArjltDez45vimEeitTmGgdnbx84YVBlpo",
  authDomain: "easy-rent-managenment.firebaseapp.com",
  projectId: "easy-rent-managenment",
  storageBucket: "easy-rent-managenment.appspot.com",
  messagingSenderId: "108681458136",
  appId: "1:108681458136:web:4671c4474bcfd932dc42ad"
})