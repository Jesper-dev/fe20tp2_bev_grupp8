const OrgLogoReducer = (state = null, action) => {
    switch (action.type) {
        case 'ORGLOGO':
            return action.payload;
        default:
            return state;
    }
};

export default OrgLogoReducer;
