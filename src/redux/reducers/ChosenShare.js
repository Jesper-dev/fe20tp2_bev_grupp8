const ChosenShare = (state = [], action) => {
    switch (action.type) {
        case 'CHOSENSHARE':
            return action.payload;
        default:
            return state;
    }
};

export default ChosenShare;
