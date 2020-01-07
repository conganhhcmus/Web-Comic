
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
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
        return comic
    },
    get10NewComic: async () => {
        let listNewComic = []
        let allCities = await db.collection('Comic').orderBy('id').limit(10).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    listNewComic.push(doc.data())
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

    getChapterByID: async(id)=>{
        let chapter
        let cityRef = db.collection('ComicChapter').doc(id);
        let getDoc = await cityRef.get()
            .then(doc => {
                if (!doc.exists) {
                    console.log('No such document!');
                } else {
                    chapter = doc.data()
                }
            })
            .catch(err => {
                console.log('Error getting document', err);
            });
            console.log(chapter);
        return chapter
    },
}