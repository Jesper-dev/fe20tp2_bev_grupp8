const FilteredUsers = (state = [], action) => {
    switch (action.type) {
        case 'FILTEREDUSERS':
            return action.payload;
        default:
            return state;
    }
};

export default FilteredUsers;