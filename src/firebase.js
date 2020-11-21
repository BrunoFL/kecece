import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import * as firebaseui from "firebaseui";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/* eslint-disable */
const config = {
    apiKey: "AIzaSyCFaiQ6sXkimQi9k0kCY74OgSRAcZaUbsw",
    authDomain: "kecece-147e5.firebaseapp.com",
    databaseURL: "https://kecece-147e5.firebaseio.com",
    projectId: "kecece-147e5",
    storageBucket: "kecece-147e5.appspot.com",
    messagingSenderId: "668590162655",
    appId: "1:668590162655:web:f29f9173b3c56ab489df6a",
    measurementId: "G-2PGQN36SS9",
};

// Initialize Firebase
firebase.initializeApp(config);
// firebase.analytics();

const db = firebase.firestore();
const auth = firebase.auth();
const ui = new firebaseui.auth.AuthUI(auth);
const dbGames = db.collection("games");
const dbStats = db.collection("stats").doc("LhfqSZs9SiUXqP0y059V");

export { dbStats, dbGames, firebase, config, db, auth, ui };
