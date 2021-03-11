const SeeFollowing = (state = true, action) => {
    switch (action.type) {
        case 'SEEFOLLOWING':
            return action.payload;
        default:
            return state;
    }
};

export default SeeFollowing;
