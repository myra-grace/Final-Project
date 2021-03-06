import React, { createContext, useEffect, useState } from 'react';

import withFirebaseAuth from 'react-with-firebase-auth';
import * as firebase from 'firebase';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCOokbl1ZOh9dGPdE6TSBng4ZwAyFmLX8w",
    authDomain: "final-project-bootcamp-da3a7.firebaseapp.com",
    databaseURL: "https://final-project-bootcamp-da3a7.firebaseio.com",
    projectId: "final-project-bootcamp-da3a7",
    storageBucket: "final-project-bootcamp-da3a7.appspot.com",
    messagingSenderId: "49077722177",
    appId: "1:49077722177:web:2ec8c04830b4f433f43ac0",
    measurementId: "G-V9FP7XC8ED"
};

const providers = {
    googleProvider: new firebase.auth.GoogleAuthProvider(),
};

// let db = firebase.firestore();

// const firebase = require("firebase");

// require("firebase/firestore");

export const AppContext = createContext(null);

const AppProvider = ({ children, signInWithGoogle }) => {
    return (
    <AppContext.Provider value={{ signInWithGoogle }}>
        {children}
    </AppContext.Provider>
    );
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
// const firebaseAnalytics = firebase.analytics();
const firebaseAppAuth = firebaseApp.auth();

export default withFirebaseAuth({
    providers,
    firebaseAppAuth,
})(AppProvider);