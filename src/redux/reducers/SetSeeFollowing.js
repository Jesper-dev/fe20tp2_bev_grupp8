const SeeFollowing = (state = true, action) => {
    switch (action.type) {
        case 'SEERECOMMENDATIONS':
            return action.payload;
        default:
            return state;
    }
};

export default SeeRecommendations;
