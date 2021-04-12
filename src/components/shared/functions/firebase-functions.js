export const fetchUserSnapshotArray = async (firebase, uid, path, setData) => {
    const result = await firebase.snapshotToArr(uid, path);
    setData(result);
    return result;
};

export const fetchUserSnapshotObject = async (firebase, uid, path, setData) => {
    const result = await firebase.snapshotToObj(uid, path);
    setData(result);
    return result;
};

export const fetchUsersOrgSnapshotArray = async (
    firebase,
    org,
    path,
    setData
) => {
    const result = await firebase.snapshotToArrayOrg(org, path);
    setData(result);
    return result;
};

export const fetchOrgSnapshot = async (firebase, org, path, setData) => {
    const result = await firebase.snapshotOrganization(org, path);
    setData(result);
    return result;
};
