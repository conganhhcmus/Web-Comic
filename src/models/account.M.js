// function get database account
var admin = require('./../../config/firebaseAdmin');

let db = admin.firestore();

exports.getInf = async function (uid) {
    //console.log("function get is running!");
    let inf = null;
    //console.log(uid)
    await db.collection('Users').doc(uid).get()
        .then(doc => {
            if (!doc.exists) {
                console.log('No such document!');
            } else {
                inf = doc.data();
                return inf
            }
        })
        .catch(err => {
            console.log('Error getting document', err);
        });
    return inf
};

exports.setInf = async function (inf, uid) {
    db.collection('Users').doc(uid).set(inf);
};