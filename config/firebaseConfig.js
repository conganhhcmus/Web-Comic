const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyDTd79OWW0fa2s1FS0IN2OKIFhsWS8Y0kM",
    authDomain: "comic-web-bc8e5.firebaseapp.com",
    databaseURL: "https://comic-web-bc8e5.firebaseio.com",
    projectId: "comic-web-bc8e5",
    storageBucket: "comic-web-bc8e5.appspot.com",
    messagingSenderId: "208480679391",
    appId: "1:208480679391:web:b1e96d6007b978aead006a",
    measurementId: "G-CHC9SF4WKE"
  };
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("DATA: connected to firebase !");

module.exports = firebase;