export const FetchedCryptoList = (state = [], action) => {
    switch (action.type) {
        case 'CRYPTOLIST':
            return action.payload;
        default:
            return state;
    }
}

const FetchedCryptoValues = (state = [], action) => {
    switch (action.type) {
        case 'FETCHEDCRYPTO':
            return action.payload;
        default:
            return state;
    }
};

export default FetchedCryptoValues;
