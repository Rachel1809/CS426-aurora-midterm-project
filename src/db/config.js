// firebase config key setup

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBRl37f6V0NKQKpoY1BPMiLH6ItIEpEqDM",
    authDomain: "auth-80b8a.firebaseapp.com",
    projectId: "auth-80b8a",
    storageBucket: "auth-80b8a.appspot.com",
    messagingSenderId: "1091809635161",
    appId: "1:1091809635161:web:a8747c8e024d894ca33a48",
    measurementId: "G-1KG5LPYGKB"

}

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}


export { firebase };