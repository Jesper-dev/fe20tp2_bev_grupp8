const FetchedStockValues = (state = [], action) => {
    switch (action.type) {
        case 'FETCHEDSTOCKS':
            return action.payload;
        default:
            return state;
    }
};

export default FetchedStockValues;
