const RecommendationReducer = (state = [], action) => {
    switch (action.type) {
        case 'RECOMMENDATIONS':
            return action.payload;
        default:
            return state;
    }
};

export default RecommendationReducer;
