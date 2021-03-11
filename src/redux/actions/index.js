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
