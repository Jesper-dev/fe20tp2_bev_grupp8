const PossessionCrypto = (state = [], action) => {
    switch (action.type) {
        case 'CRYPTO':
            return action.payload;
        default:
            return state;
    }
};

export default PossessionCrypto;
