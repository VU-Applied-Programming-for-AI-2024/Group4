import { initializeApp } from 'firebase/app';
// import authentication from Firebase
import { getAuth, onAuthStateChanged } from 'firebase/auth';

/* create firebase app, including project's configuration info */
const firebaseApp = initializeApp({  
    apiKey: "AIzaSyDh1nCtLn23d7UTXllZDOJmQrLrAZ0WGcE",
    authDomain: "pourlisten.firebaseapp.com",
    projectId: "pourlisten",
    storageBucket: "pourlisten.appspot.com",
    messagingSenderId: "254050042745",
    appId: "1:254050042745:web:6882162f33de10d013a5a8",
    measurementId: "G-RYHNV3TRN7"
});

// initialize authentication:
const auth = getAuth(firebaseApp);


// detecting if users are signed in:
onAuthStateChanged(auth, user => {
    if(user != null) {
        console.log('logged in!')
    } else {
        console.log('no user')
    }
});