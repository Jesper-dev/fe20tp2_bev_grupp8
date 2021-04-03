export const recommendation = (recommendation) => {
    return {
        type: 'RECOMMENDATIONS',
        payload: recommendation,
    };
};

export const chosenShare = (share) => {
    return {
        type: 'CHOSENSHARE',
        payload: share,
    };
};

export const chosenCrypto = (crypto) => {
    return {
        type: 'CHOSENCRYPTO',
        payload: crypto,
    };
};

export const setFollowing = (follow) => {
    return {
        type: 'FOLLOW',
        payload: follow,
    };
};

export const setFollowingCrypto = (followCrypto) => {
    return {
        type: 'FOLLOWCRYPTO',
        payload: followCrypto,
    };
};

export const setCurrency = (currency) => {
    return {
        type: 'CURRENCY',
        payload: currency,
    };
};

export const setStocks = (stocks) => {
    return {
        type: 'STOCKS',
        payload: stocks,
    };
};

export const setSeeRecommendations = (seeRecommendations) => {
    return {
        type: 'SEERECOMMENDATIONS',
        payload: seeRecommendations,
    };
};

export const setSeeFollowing = (seeFollowing) => {
    return {
        type: 'SEEFOLLOWING',
        payload: seeFollowing,
    };
};

export const setSeeNews = (seeNews) => {
    return {
        type: 'SEENEWS',
        payload: seeNews,
    };
};

export const setProfileImage = (image) => {
    return {
        type: 'PROFILEIMAGE',
        payload: image,
    };
};

export const setUsers = (users) => {
    return {
        type: 'USERS',
        payload: users,
    };
};
export const setOrganizationData = (data) => {
    return {
        type: 'ORGANIZATIONDATA',
        payload: data,
    };
};

export const filterUsers = (filteredUsers) => {
    return {
        type: 'FILTEREDUSERS',
        payload: filteredUsers,
    };
};
export const toggleSearch = (searching) => {
    return {
        type: 'SEARCHING',
        payload: searching,
    };
};
