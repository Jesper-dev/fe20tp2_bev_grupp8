import React, { useState, useEffect, useContext, useCallback } from 'react';
import { useSelector } from 'react-redux';
import 'firebase/database';
import { FirebaseContext } from '../../firebase/context';
// import { SearchBarElement } from '../../shared/search-bar/SearchBarElements';
import { MainWrapper } from './TradeElements';
// import { parse } from '@fortawesome/fontawesome-svg-core';
import { ReusabelInputField } from '../../shared/reusable-elements/ReusableElements'
import ContentWrapper from '../../shared/wrappers/ContentWrapper'

const Trade = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    let stockIncludes;

    const [sell, setSell] = useState(false);
    const [numOfStocks, setNumOfStocks] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    // const [includes, setIncludes] = useState(false);
    const [buy, setBuy] = useState(false);
    const [holding, setHolding] = useState(0);

    const [userData, setUserData] = useState({});
    /* let userDataVariable = {} */

    const chosenShare = useSelector((state) => state.ChosenShare);
    const firebase = useContext(FirebaseContext);
    console.log(chosenShare)

        //*Checks if clicked stock has been bought before and if true display how many
        const checkHolding = useCallback(async () => {
            await firebase
                .user(user.uid)
                .child('/possessionStocks')
                .once('value', (snapshot) => {
                    let dataDB = snapshot.val();
                    if (dataDB === undefined) return;
                    let stocks = [];
                    for (const key in dataDB) {
                        stocks.push({ ...dataDB[key] });
                    }
                    stocks.forEach((item) => {
                        if (item.symbol === chosenShare[0].symbol) {
                            setHolding(item.amount);
                            // setClickedStock(item);
                        }
                    });
                });
        }, [chosenShare, firebase, user.uid]);


    useEffect(() => {
        firebase.user(user.uid).once('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            setUserData(data);
        });
        checkHolding();

    }, [buy, sell, checkHolding, firebase, user.uid]);

    const onButtonClick = (e) => {
        if (e.target.innerText === 'BUY') {
            onBuy(numOfStocks);
        } else if (e.target.innerText === 'SELL') {
            onSell(numOfStocks);
        }
    };

    const addToRecentlyBought = (
        symbol,
        name,
        amountOfStocks,
        price,
        user,
        percent,
        org
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

    const addToRecentlySold = (
        symbol,
        name,
        amountOfStocks,
        price,
        user,
        percent,
        org
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

    const updateUserCurrency = (buy, currency1, currency2, number) => {
        let calcCurrency = 0;
        let num = parseInt(number);
        if (buy === true) {
            calcCurrency = currency1 - currency2.toFixed(2) * num;
            if (calcCurrency <= 0) {
                alert('Insufficient funds');
                let funds = false
                return funds;
            }
        } else if (buy === false) {
            calcCurrency = currency1 + currency2.toFixed(2) * num;
        }

        let currencyFixed = calcCurrency.toFixed(2);
        let currency = parseInt(currencyFixed);
        firebase.user(user.uid).child('/currency').set({
            currency,
        });
    };

    const checkIfStockIncludes = (symbol) => {
        let data = userData.possessionStocks;
        let stocks = [];
        for (const key in data) {
            stocks.push({ ...data[key] });
        }
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].symbol === symbol) {
                console.log('Den finns');
                stockIncludes = true;
                let stock = stocks[i]
                return stock;
            } else {
                console.log('Den finns inte');
                stockIncludes = false;
            }
        }
    };

    const checkIfTooManyStocks = (numOfStocks) => {
        if (numOfStocks > holding || numOfStocks <= -1) {

            let tooMany = true;
            return tooMany;
        } else {
            let tooMany = false;
            return tooMany;
        }
    }

    const updateUserPossession = (
        buy,
        symbol,
        name,
        amountOfStocks,
        price,
        percent
    ) => {
        let stock = checkIfStockIncludes(symbol);
        let amountNum = parseInt(amountOfStocks);
        if (buy === true) {
            if (stockIncludes === true) {
                let existingAmount = parseInt(stock.amount)
                let resAmount = existingAmount + amountNum
                console.log(resAmount)
                firebase
                    .user(user.uid)
                    .child(`/possessionStocks/${symbol}`)
                    .update({
                        amount: resAmount,
                    });

                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionStocks/${symbol}`)
                        .update({
                            amount: resAmount,
                        });
                }
            } else {
                firebase
                    .user(user.uid)
                    .child('/possessionStocks')
                    .update({
                        [symbol]: {
                            name,
                            amount: amountNum,
                            price,
                            symbol,
                            percent,
                        },
                    });
                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionStocks`)
                        .update({
                            [symbol]: {
                                name,
                                amount: amountNum,
                                price,
                                symbol,
                                percent,
                            },
                        });
                }
            }
        } else {

            let existingAmount = parseInt(stock.amount);
            let resAmount = parseInt(existingAmount - amountNum);

            if (resAmount <= 0) {
                firebase
                    .user(user.uid)
                    .child(`/possessionStocks/${symbol}`)
                    .remove();

                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionStocks/${symbol}`)
                        .remove();
                }
                setHolding(0)
                checkHolding()
            } else {
                firebase
                    .user(user.uid)
                    .child(`/possessionStocks/${symbol}`)
                    .update({
                        amount: resAmount,
                    });

                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionStocks/${symbol}`)
                        .update({
                            amount: resAmount,
                        });
                }
                checkHolding()
            }
        }
    };
    const onBuy = (numOfStocks) => {
        if (buy === false) {
            setBuy(true);
            setSell(false);
        } else if (buy === true) {
            if (userData === null) return;
            let currency = userData.currency.currency;
            let funds = updateUserCurrency(
                true,
                currency,
                chosenShare[0].regularMarketPrice,
                numOfStocks
            );
            if(funds === false) {
                return
            } else {
                updateUserPossession(
                    true,
                    chosenShare[0].symbol,
                    chosenShare[0].shortName,
                    numOfStocks,
                    chosenShare[0].regularMarketPrice,
                    chosenShare[0].regularMarketChangePercent
                );

                addToRecentlyBought(
                    chosenShare[0].symbol,
                    chosenShare[0].shortName,
                    numOfStocks,
                    chosenShare[0].regularMarketPrice,
                    user.username,
                    chosenShare[0].regularMarketChangePercent,
                    user.organization
                );
            }
            setNumOfStocks(0);
            setBuy(false);
        }
    };

    //*When we sell a stock
    const onSell = (numOfStocks) => {
        if (sell === false) {
            setSell(true);
            setBuy(false);
        } else if (sell === true) {
            if (userData === null) return;
            let currency = userData.currency.currency;
            let tooMany = checkIfTooManyStocks(numOfStocks)
            if(tooMany === true) {
                alert('You cant sell more than you have');
                return;
            } else {
                updateUserCurrency(
                    false,
                    currency,
                    chosenShare[0].regularMarketPrice,
                    numOfStocks
                );
                updateUserPossession(
                    false,
                    chosenShare[0].symbol,
                    chosenShare[0].shortName,
                    numOfStocks,
                    chosenShare[0].regularMarketPrice
                );
                addToRecentlySold(
                    chosenShare[0].symbol,
                    chosenShare[0].shortName,
                    numOfStocks,
                    chosenShare[0].regularMarketPrice,
                    user.username,
                    chosenShare[0].regularMarketChangePercent,
                    user.organization
                );
                setNumOfStocks(0);
                setSell(false);
            }

        }
    };

    const setValuesDom = (e) => {
        setNumOfStocks(e.target.value)

        let newTototot = numOfStocks * chosenShare[0].price

        if(chosenShare[0].price == undefined){
             setTotalCost(numOfStocks * chosenShare[0].regularMarketPrice)
             return
        }
        setTotalCost(numOfStocks * chosenShare[0].price)
    }

    let mrkChange = chosenShare[0].regularMarketChangePercent;
    return (
        <ContentWrapper>
            <MainWrapper>
                <div className="tmp-wrapper">
                {/* <p>{userData ? userData : ''}</p> */}
                {/*      <span>Wallet { userData }</span> */}
                {/* <input type="number" /> */}

                <span style={mrkChange < 0 ?{ color: 'var(--lighter-red)'} : { color: 'var(--lighter-green)'}}>{mrkChange > 0 ? <i class="fas fa-long-arrow-alt-up"></i> : <i class="fas fa-long-arrow-alt-down"></i> } {chosenShare[0].regularMarketChangePercent.toFixed(2)} %</span>
                <h2>{chosenShare[0].shortName}</h2>
                    <span>{chosenShare[0].regularMarketPrice ? chosenShare[0].regularMarketPrice.toFixed(2) : chosenShare[0].price.toFixed(2)} $</span>
                    <span>Your holding: {holding}</span>

                    {/* <label>Wallet</label> */}
                    <div>{!userData.currency ? 'Loading...' : userData.currency.currency.toLocaleString()} $</div>

                    <label>Total amount in dollar</label>
                    <ReusabelInputField
                        min="0"
                        placeholder="Total amount"
                        type="number"
                /*       onChange={(e) => setNumOfStocks(e.target.value)}
                        value={numOfStocks}  */
                        />

      {/*           <div className="amountWrapper"> */}

                    <label>Amount of stocks</label>
                    <ReusabelInputField
                        min="0"
                        placeholder="Amount"
                        type="number"
                        onChange={setValuesDom}
                        value={numOfStocks} />

                    <div>Brokerage {numOfStocks/10}$</div>

                    <span>Total Amount</span>
                    <div>{totalCost.toFixed(2)} $</div>

              {/*   </div> */}
                <div className="buttonWrapper">
                    <button
                        className="buy-sell-btn"
                        style={{
                            backgroundColor: 'var(--secondary)',
                            color: 'white',
                        }}
                        onClick={onButtonClick}
                    >
                        BUY
                    </button>

                    <button
                        className="buy-sell-btn"
                        style={{
                            background: 'none',
                            borderColor: 'var(--secondary)',
                            color: 'var(--secondary)',
                        }}
                        onClick={onButtonClick}
                    >
                        SELL
                    </button>
                </div>
                </div>
            </MainWrapper>
        </ContentWrapper>
    );
};

export default Trade;
