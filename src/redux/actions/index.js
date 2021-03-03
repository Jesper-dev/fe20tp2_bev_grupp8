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
