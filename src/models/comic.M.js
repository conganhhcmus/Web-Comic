var admin = require('./../../config/firebaseAdmin');
// ta chuyển thành require nha (giống nhau nên ta chuyển ra cho dễ quản lý)
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
                    for (var strI = 0; strI < arrtmp.length; strI++) {
                        if (strI === 4) {
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
    get1000NewComic: async () => {
        let list1000NewComic = []
        let allCities = await db.collection('Comic').orderBy('time', 'desc').limit(1000).get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    list1000NewComic.push(doc.data())
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        return list1000NewComic
    },
    get10ComicByCategory: async (category) => {
        let comics = []
        await db.collection('Comic').where("category", 'array-contains',category).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    comics.push(doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        return comics
    },
    searchByText: async (query)=>{
        let miniQuery = query.split(' ');
        let comics = []
        await db.collection('Comic').where("name", "array-contains",miniQuery[0]).get()
            .then(snapshot => {
                if (snapshot.empty) {
                    console.log('No matching documents.');
                    return;
                }
                snapshot.forEach(doc => {
                    console.log(doc.data())
                    comics.push(doc.data());
                });
            })
            .catch(err => {
                console.log('Error getting documents', err);
            });
        return comics
    },
    addComic: async (comic) => {
        let idComic
        let task = db.collection('Comic').add(comic).then(ref => {
            idComic = ref.id
            db.collection('Comic').doc(ref.id).update({ id: ref.id })
            console.log('Added document with ID: ', ref.id);
        });
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
