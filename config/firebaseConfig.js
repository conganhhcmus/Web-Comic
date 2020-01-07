const firebase = require('firebase');
const firebaseConfig = {
    apiKey: "AIzaSyCt1RVAK0banmFa6i6W9ATPcba73zUPxvM",
    authDomain: "comic-fc783.firebaseapp.com",
    databaseURL: "https://comic-fc783.firebaseio.com",
    projectId: "comic-fc783",
    storageBucket: "comic-fc783.appspot.com",
    messagingSenderId: "34229745174",
    appId: "1:34229745174:web:2eec1547d559ba23602737",
    measurementId: "G-L9YTCXM9JC"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

console.log("DATA: connected to firebase !");

module.exports = firebase;