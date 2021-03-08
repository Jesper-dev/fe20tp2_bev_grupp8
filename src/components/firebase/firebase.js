import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

export const config = {
    apiKey: 'AIzaSyBUOsBYQY6ajo3YZ8pg-WWco8hXN9-AhCc',
    authDomain: 'grupp8-c364e.firebaseapp.com',
    projectId: 'grupp8-c364e',
    databaseURL: 'https://grupp8-c364e-default-rtdb.firebaseio.com',
    storageBucket: 'grupp8-c364e.appspot.com',
    messagingSenderId: '898314042279',
    appId: '1:898314042279:web:29f56cb55bbc265c6e5482',
    measurementId: 'G-S4L4L5B5RH',
};

class Firebase {
    constructor() {
        app.initializeApp(config);

        this.serverValue = app.database.ServerValue;
        this.auth = app.auth();
        this.db = app.database();
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => {
        this.auth.signOut();
        window.location.replace('/landing');
    };

    doPasswordReset = (email) => this.auth.sendPasswordResetEmail(email);

    doPasswordUpdate = (password) =>
        this.auth.currentUser.updatePassword(password);
    // *** Merge Auth and DB User API *** //
    onAuthUserListener = (next, fallback) =>
        this.auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                this.user(authUser.uid)
                    .once('value')
                    .then((snapshot) => {
                        const dbUser = snapshot.val();
                        // default empty roles
                        if (!dbUser.roles) {
                            dbUser.roles = {};
                        }
                        // merge auth and db user
                        authUser = {
                            uid: authUser.uid,
                            email: authUser.email,
                            ...dbUser,
                        };
                        next(authUser);
                    });
            } else {
                fallback();
            }
        });

    // *** User API ***

    user = (uid) => this.db.ref(`users/${uid}`);

    users = () => this.db.ref('users');

    // *** Message API ***

    message = (uid) => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // *** Settings API ***
    setting = (uid) => this.db.ref(`settings/${uid}`);

    settings = () => this.db.ref('settings');
}

//     messagingSenderId: "898314042279",
//     appId: "1:898314042279:web:29f56cb55bbc265c6e5482",
//     measurementId: "G-S4L4L5B5RH"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export default Firebase;
