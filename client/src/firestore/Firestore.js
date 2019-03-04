import firebase from "firebase";

var config = {
  apiKey: "AIzaSyBy8EO3awpCW39D-G6GlnlLueOIWhkE3WU",
  authDomain: "notescipriani.firebaseapp.com",
  databaseURL: "https://notescipriani.firebaseio.com",
  projectId: "notescipriani",
  storageBucket: "notescipriani.appspot.com",
  messagingSenderId: "417734883803"
};

firebase.initializeApp(config);

export default firebase;
