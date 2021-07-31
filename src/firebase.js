// For Firebase JS SDK v7.20.0 and later, measurementId is optional

    
import firebase from 'firebase'

const firebaseApp = firebase.initializeApp({

    apiKey: "AIzaSyD9dDvyVumQmxzQ3KW4_39rXLbHTfTW4jE",
    authDomain: "instagram-clone-react-8f44e.firebaseapp.com",
    databaseURL: "https://instagram-clone-react-8f44e-default-rtdb.firebaseio.com",
    projectId: "instagram-clone-react-8f44e",
    storageBucket: "instagram-clone-react-8f44e.appspot.com",
    messagingSenderId: "857835085154",
    appId: "1:857835085154:web:8c39a3007533067cd2e03b",
    measurementId: "G-JCWMPVYLKX"

}) 

const db = firebaseApp.firestore()
const auth = firebase.auth()
const storage = firebase.storage()

export {db, auth, storage}

export default firebase
