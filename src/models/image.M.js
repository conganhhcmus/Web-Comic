var storage = firebase.storage();
var pathReference = storage.ref('images/stars.jpg');

// Create a reference from a Google Cloud Storage URI
var gsReference = storage.refFromURL('gs://comic-web-bc8e5.appspot.com/Untitled-2.png')