/* export const usersSnapshot = (firebase) => {
    let dataList = [];

    let userData = firebase.users();

    userData.once('value', (snapshot) => {
        const userDataSnapshot = snapshot.val();
        if (!userDataSnapshot) return;
        for (const key in userDataSnapshot) {
            dataList.push({ ...userDataSnapshot[key] });
        }
    });
    return dataList;
} */

export const snapshotUserpath = (firebase, uid, path) => {
    firebase
        .user(uid)
        .child(path)
        .once('value')
        .then(function (snapshot) {
            let data = snapshot.val();
            return data;
        });
};

/*    let dataList = [];

       let userData = firebase.users();

        userData.once('value', (snapshot) => {

            const userDataSnapshot = snapshot.val();
            if (!userDataSnapshot) return;
            for (const key in userDataSnapshot) {
                dataList.push({ ...userDataSnapshot[key] });
            }
        });
        return dataList */
/* }; */
