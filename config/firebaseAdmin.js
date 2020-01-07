var admin = require("firebase-admin");
var serviceAccount = require("./../config/comic-fc783-firebase-adminsdk-b9iy7-bf86fffbf9.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://comic-fc783.firebaseio.com"
  });

console.log("DATA: connected to firebase admin !");

module.exports = admin;