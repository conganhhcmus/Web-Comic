// import database
const firebase = require('./../../config/firebaseConfig');

const url = firebase.database("/Comic/");

module.exports = {
 show: async name => {
     console.log(name);
 }
}
