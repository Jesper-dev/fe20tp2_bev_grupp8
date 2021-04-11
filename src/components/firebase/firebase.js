import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
import 'firebase/storage';

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
        this.storage = app.storage();

        this.state = {
            users: [],
        };
    }

    // *** Auth API ***

    doCreateUserWithEmailAndPassword = (email, password) =>
        this.auth.createUserWithEmailAndPassword(email, password);
    // this.auth.createUserWithEmailAndPasswordOrg(email, password);

    doSignInWithEmailAndPassword = (email, password) =>
        this.auth.signInWithEmailAndPassword(email, password);

    doSignOut = () => {
        this.auth.signOut();
        window.location.replace('/');
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
                        if (dbUser == null) {
                            this.admin(authUser.uid)
                                .once('value')
                                .then((snapshot) => {
                                    const dbUser = snapshot.val();
                                    /*       const dbUserKey = snapshot.key(); */

                                    //let id = authUser.uid;
                                    let localOrg = dbUser;

                                    console.log(localOrg);
                                    /*            console.log(dbUserKey); */

                                    authUser = {
                                        uid: authUser.uid,
                                        email: authUser.email,
                                        localOrg,
                                    };
                                    next(authUser);
                                    return;
                                });
                        }
                        // if (!dbUser.roles) {
                        //     dbUser.roles = {};
                        // }
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

    componentDidMount() {
        // this.setState({ loading: true });
        this.props.firebase.users().on('value', (snapshot) => {
            const usersObject = snapshot.val();
            const usersList = Object.keys(usersObject).map((key) => ({
                ...usersObject[key],
                uid: key,
            }));
            console.log(usersList);
            this.setState({
                users: usersList,
                loading: false,
            });
        });
    }

    // *** User API ***

    user = (uid) => this.db.ref(`users/${uid}`);

    admin = (uid, organization) => this.db.ref(`organizations/`);

    organization = (organization) =>
        this.db.ref(`organizations/${organization}`);

    users = () => this.db.ref('users');

    /* Snapshot shortcut */

    snapshot = (uid, path) =>
        this.db
            .ref(`users/${uid + path}`)
            .once('value')
            .then(function (snapshot) {
                let data = snapshot.val();
                return data;
            });
    snapshotToArr = (uid, path) =>
        this.db
            .ref(`users/${uid + path}`)
            .once('value')
            .then(function (snapshot) {
                let arr = [];
                let data = snapshot.val();
                for (const key in data) {
                    arr.push({ ...data[key] });
                }
                return arr;
            });

    snapshotToArrayOrg = (organization, path) =>
        this.db
            .ref(`organizations/${organization + path}`)
            .once('value')
            .then(function (snapshot) {
                let arr = [];
                let data = snapshot.val();
                for (const key in data) {
                    arr.push({ ...data[key] });
                }
                return arr;
            });

    snapshotOrganization = (organization, path) =>
        this.db
            .ref(`organizations/${organization + path}`)
            .once('value')
            .then(function (snapshot) {
                let data = snapshot.val();
                return data;
            });

    // *** Post API ***

    post = (uid) => this.db.ref(`posts/${uid}`);

    posts = () => this.db.ref('posts');

    // *** Message API ***

    message = (uid) => this.db.ref(`messages/${uid}`);

    messages = () => this.db.ref('messages');

    // *** Settings API ***
    setting = (uid) => this.db.ref(`settings/${uid}`);

    settings = () => this.db.ref('settings');
}

/* const firebaseObj = { message, messages, doSignUp } */
//     messagingSenderId: "898314042279",
//     appId: "1:898314042279:web:29f56cb55bbc265c6e5482",
//     measurementId: "G-S4L4L5B5RH"
//   };
//   // Initialize Firebase
//   firebase.initializeApp(firebaseConfig);
//   firebase.analytics();
export default Firebase;
