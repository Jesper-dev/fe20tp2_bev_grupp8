const ChosenCrypto = (state = [], action) => {
    switch (action.type) {
        case 'CHOSENCRYPTO':
            return action.payload;
        default:
            return state;
    }
};

export default ChosenCrypto;