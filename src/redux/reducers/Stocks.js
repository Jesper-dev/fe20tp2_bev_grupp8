const Stocks = (state = [], action) => {
    switch (action.type) {
        case 'STOCKS':
            return action.payload;
        default:
            return state;
    }
};

export default Stocks;