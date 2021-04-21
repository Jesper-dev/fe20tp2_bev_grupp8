export const checkIfTooManyStocks = (numOfStocks, holding) => {
    if (numOfStocks > holding || numOfStocks <= -1) {
        let tooMany = true;
        return tooMany;
    } else {
        let tooMany = false;
        return tooMany;
    }
};

export const updateUserCurrency = (
    buy,
    currency1,
    currency2,
    number,
    firebase,
    user
) => {
    let calcCurrency = 0;
    let num = parseFloat(number);
    if (buy === true) {
        calcCurrency = currency1 - currency2.toFixed(2) * num;
        if (calcCurrency <= 0) {
            alert('Insufficient funds');
            let funds = false;
            return funds;
        }
    } else if (buy === false) {
        calcCurrency = currency1 + currency2.toFixed(2) * num;
    }

    let currencyFixed = calcCurrency.toFixed(2);
    let currency = parseFloat(currencyFixed);
    firebase.user(user.uid).child('/currency').set({
        currency,
    });

    if (user.organization) {
        firebase
            .organization(user.organization)
            .child(`/users/${user.uid}/currency`)
            .set({
                currency,
            });
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
    firebase,
    path,
    image
) => {
    let amountNum = parseFloat(amountOfStocks);
    firebase
        .organization(org)
        .child(path)
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
    firebase,
    path
) => {
    let amountNum = parseFloat(amountOfStocks);
    firebase
        .organization(org)
        .child(path)
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
