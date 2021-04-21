const Currency = (state = 100000, action) => {
    switch (action.type) {
        case 'CURRENCY':
            return action.payload;
        default:
            return state;
    }
};

export default Currency;
