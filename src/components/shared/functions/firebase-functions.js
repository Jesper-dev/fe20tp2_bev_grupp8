export const fetchUserSnapshotArray = async (firebase, uid, path, setData) => {
    const result = await firebase.snapshotToArr(uid, path);
    setData(result);
    return result;
};
