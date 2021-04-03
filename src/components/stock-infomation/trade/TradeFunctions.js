export const checkIfTooManyStocks = (numOfStocks, holding) => {
    if (numOfStocks > holding || numOfStocks <= -1) {
        let tooMany = true;
        return tooMany;
    } else {
        let tooMany = false;
        return tooMany;
    }
};

export const addToRecentlyBought = (
    symbol,
    name,
    amountOfStocks,
    price,
    user,
    percent,
    org,
    firebase
) => {
    let amountNum = parseInt(amountOfStocks);
    firebase
        .organization(org)
        .child('/recentlyBought')
        .set({
            [symbol]: {
                name,
                amount: amountNum,
                price,
                symbol,
                user,
                percent,
            },
        });
};

export const addToRecentlySold = (
    symbol,
    name,
    amountOfStocks,
    price,
    user,
    percent,
    org,
    firebase
) => {
    let amountNum = parseInt(amountOfStocks);
    firebase
        .organization(org)
        .child('/recentlySold')
        .set({
            [symbol]: {
                name,
                amount: amountNum,
                price,
                symbol,
                user,
                percent,
            },
        });
};
