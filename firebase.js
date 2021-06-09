
import * as firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'


const firebaseConfig = {
  apiKey: "AIzaSyBHPBZXP5R15ko1MaEGd76to5xVTt1SbJg",
  authDomain: "signal-49b94.firebaseapp.com",
  projectId: "signal-49b94",
  storageBucket: "signal-49b94.appspot.com",
  messagingSenderId: "872186376326",
  appId: "1:872186376326:web:f2e5c2970ed66a94652107"
};




let app;
if (firebase.apps.length === 0) {
  app = firebase.initializeApp(firebaseConfig)

} else {
  app = firebase.app()

}


const db = app.fireStore();
const auth = firebase.auth();

export { db, auth }