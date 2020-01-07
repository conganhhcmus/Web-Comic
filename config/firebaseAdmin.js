var admin = require("firebase-admin");
var serviceAccount = require("./../src/models/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://comic-web-bc8e5.firebaseio.com"
  });

console.log("DATA: connected to firebase admin !");

module.exports = admin;
