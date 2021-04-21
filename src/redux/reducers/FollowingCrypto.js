const FollowingCrypto = (state = [], action) => {
    switch (action.type) {
        case 'FOLLOWCRYPTO':
            return action.payload;
        default:
            return state;
    }
};

export default FollowingCrypto;
