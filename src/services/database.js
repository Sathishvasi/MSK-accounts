import firebase from "firebase";

var config = {
    apiKey: "AIzaSyCsCFMyDY1gq_IGsVdP9dKQVnCgIkBFtGg",
    authDomain: "msk-accounts.firebaseapp.com",
    databaseURL: "https://msk-accounts.firebaseio.com",
    projectId: "msk-accounts",
    storageBucket: "msk-accounts.appspot.com",
    messagingSenderId: "613092135847",
    storageBucket: 'gs://msk-accounts.appspot.com/'
};

let app = firebase.initializeApp(config);
let db = app.database();

let usersRef = db.ref("users");

export default db;