import firebase from 'firebase';

const config = {
    apiKey: "AIzaSyATm5xzvAfcaSD5gYJ-ZFHF_d-WGt0Ju1A",
    authDomain: "get-fit-athletic-82370.firebaseapp.com",
    databaseURL: "https://get-fit-athletic-82370.firebaseio.com",
    projectId: "get-fit-athletic-82370",
    storageBucket: "get-fit-athletic-82370.appspot.com",
    messagingSenderId: "225918059123",
    appId: "1:225918059123:web:a44961a334e98f32bca006",
    measurementId: "G-YN19MT1RLK"
 }

 const firebaseApp = firebase.initializeApp(config);
 export default firebaseApp;