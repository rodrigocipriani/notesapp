import firebaseApp from "firebase/app";
import "firebase/firebase-database";
import "firebase/firebase-auth";
import { firebaseConfig as config } from "../config";

export const firebaseImpl = firebaseApp.initializeApp(config);
export const firebaseDatabase = firebaseApp.database();
export const firebaseAuth = firebaseApp.auth();
