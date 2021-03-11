const ProfileImgReducer = (state = null, action) => {
    switch (action.type) {
        case 'PROFILEIMAGE':
            return action.payload;
        default:
            return state;
    }
};

export default ProfileImgReducer;
