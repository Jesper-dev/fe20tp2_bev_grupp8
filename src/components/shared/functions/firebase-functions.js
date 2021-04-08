    export const usersSnapshot = (firebase) => {
       let dataList = [];

       let userData = firebase.users();

        userData.once('value', (snapshot) => {

            const userDataSnapshot = snapshot.val();
            if (!userDataSnapshot) return;
            for (const key in userDataSnapshot) {
                dataList.push({ ...userDataSnapshot[key] });
            }
        });
        return dataList
    }