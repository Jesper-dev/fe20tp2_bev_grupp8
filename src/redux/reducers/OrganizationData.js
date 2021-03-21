const OrganizationData = (state = [], action) => {
    switch (action.type) {
        case 'ORGANIZATIONDATA':
            return action.payload;
        default:
            return state;
    }
};

export default OrganizationData;
