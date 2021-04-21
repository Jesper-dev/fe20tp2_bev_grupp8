const Users = (state = [], action) => {
    switch (action.type) {
        case 'USERS':
            return action.payload;
        default:
            return state;
    }
};

export default Users;