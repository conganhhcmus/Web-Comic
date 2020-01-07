
var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");
// console.log(admin.credential.cert(serviceAccount))

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
                    let arrtmp = comic.description.split(". ")
                    comic.descriptionShort = "";
                    for (var strI = 0; strI < arrtmp.length; strI++){
                        if(strI === 4){
                            comic.descriptionShort += ". .";
                            break;
                        }
                        comic.descriptionShort += arrtmp[strI] + ". ";
                    }
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
    addComic: async (comic) =>{
        let idComic
        let task = db.collection('Comic').add(comic).then(ref => {
            idComic = ref.id
            db.collection('Comic').doc(ref.id).update({id : ref.id})
            console.log('Added document with ID: ', ref.id);
        });
        task.finally( () =>{
            console.log(2)
        })
    }
}