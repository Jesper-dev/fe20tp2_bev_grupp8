const Following = (state = [], action) => {
    switch (action.type) {
        case 'FOLLOW':
            return action.payload;
        default:
            return state;
    }
};

export default Following;