const Shares = (state = [], action) => {
    switch (action.type) {
        case 'SHARES':
            return action.payload;
        default:
            return state;
    }
};

export default Shares;