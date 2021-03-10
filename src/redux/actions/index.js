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

export const setFollowing = (follow) => {
    return {
        type: 'FOLLOW',
        payload: follow,
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
