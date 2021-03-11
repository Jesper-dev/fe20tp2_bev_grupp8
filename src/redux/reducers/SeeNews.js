const SeeNews = (state = true, action) => {
    switch (action.type) {
        case 'SEENEWS':
            return action.payload;
        default:
            return state;
    }
};

export default SeeNews;
