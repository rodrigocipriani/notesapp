import firebaseApp from "firebase/app";
import "firebase/firebase-database";
import "firebase/firebase-auth";
import config from "../config/config";

export const firebaseImpl = firebaseApp.initializeApp(config.firebaseConfig);
export const firebaseDatabase = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
