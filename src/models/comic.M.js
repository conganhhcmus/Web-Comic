
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

var app = admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://comic-web-bc8e5.firebaseio.com",
});

let db = admin.firestore();


module.exports = {
    getComicByID: async (id) => {
        let comic
        let cityRef = db.collection('Comic').doc(id);
        let getDoc = await cityRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    comic = doc.data()
                    comic.posterURL = `https://firebasestorage.googleapis.com/v0/b/comic-web-bc8e5.appspot.com/o/${comic.posterPath}`
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        return comic
    },
    get10NewComic: async () =>{
        let listNewComic = []
        let allCities = await db.collection('Comic').orderBy('id').limit(10).get()
        .then(snapshot => {
            snapshot.forEach(doc => {
                let comic = doc.data()
                comic.posterURL = `https://firebasestorage.googleapis.com/v0/b/comic-web-bc8e5.appspot.com/o/${comic.posterPath}`
                listNewComic.push(comic)
            });
        })
        .catch(err => {
            console.log('Error getting documents', err);
        });
        // listNewComic.push({
        //     id: "ok"
        // })
        return listNewComic
    },
}