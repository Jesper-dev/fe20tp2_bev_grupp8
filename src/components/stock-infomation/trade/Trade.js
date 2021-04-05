import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'firebase/database';
import { FirebaseContext } from '../../firebase/context';
// import { SearchBarElement } from '../../shared/search-bar/SearchBarElements';
import { MainWrapper } from './TradeElements';
import { GenericVestBtn } from '../../shared/button/ButtonElements';
// import { parse } from '@fortawesome/fontawesome-svg-core';
import { ReusabelInputField } from '../../shared/reusable-elements/ReusableElements';
import ContentWrapper from '../../shared/wrappers/ContentWrapper';

import {
    checkIfTooManyStocks,
    addToRecentlyBought,
    addToRecentlySold,
    updateUserCurrency,
} from './TradeFunctions';

const Trade = () => {
    const user = JSON.parse(localStorage.getItem('authUser'));
    let stockIncludes;

    const [didMount, setDidMount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sell, setSell] = useState(false);
    const [amountInDollar, setAmountInDollar] = useState(0);
    const [numOfStocks, setNumOfStocks] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    // const [includes, setIncludes] = useState(false);
    const [buy, setBuy] = useState(false);
    const [holding, setHolding] = useState(0);

    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState(0);
    const [changePercent, setChangePercent] = useState(0);
    const [stockData, setStockData] = useState({});
    const [userData, setUserData] = useState({});
    /* let userDataVariable = {} */

    const chosenShare = useSelector((state) => state.ChosenShare);

    const { id } = useParams();
    const firebase = useContext(FirebaseContext);

    //*Checks if clicked stock has been bought before and if true display how many
    const checkHolding = useCallback(
        async (symbolOnLoad) => {
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
                        if (item.symbol === symbolOnLoad) {
                            setHolding(item.amount);

                            // setClickedStock(item);
                        }
                    });
                });
        },
        [chosenShare, firebase, user.uid]
    );

    useEffect(() => {
        setDidMount(true);

        const options = {
            method: 'GET',
            url: 'https://alpha-vantage.p.rapidapi.com/query',
            params: {
                function: 'GLOBAL_QUOTE',
                symbol: id,
                datatype: 'json',
            },
            headers: {
                'x-rapidapi-key':
                    '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
            },
        };

        (async () => {
            await axios
                .request(options)
                .then((response) => {
                    console.log(response.data);
                    setStockData(response.data);
                    setChangePercent(
                        parseFloat(
                            response.data['Global Quote'][
                                '10. change percent'
                            ].replace(',', '.')
                        )
                    );
                    setPrice(
                        parseFloat(
                            response.data['Global Quote']['05. price'].replace(
                                ',',
                                '.'
                            )
                        )
                    );
                    setSymbol(response.data['Global Quote']['01. symbol']);
                    checkHolding(response.data['Global Quote']['01. symbol']);
                    setLoading(false);
                })
                .catch(function (error) {
                    console.error(error);
                });
        })();

        firebase.user(user.uid).once('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            setUserData(data);
        });

        return () => {
            setDidMount(false);
        };
    }, [didMount, buy, sell, checkHolding, firebase, user.uid]);

    const onButtonClick = (e) => {
        if (e.target.innerText === 'BUY') {
            onBuy(numOfStocks);
        } else if (e.target.innerText === 'SELL') {
            onSell(numOfStocks);
        }
    };

    const checkIfStockIncludes = (symbol) => {
        let data = userData.possessionStocks;
        let stocks = [];
        for (const key in data) {
            stocks.push({ ...data[key] });
        }
        for (let i = 0; i < stocks.length; i++) {
            if (stocks[i].symbol === symbol) {
                stockIncludes = true;
                let stock = stocks[i];
                return stock;
            } else {
                stockIncludes = false;
            }
        }
    };

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
                let existingAmount = parseInt(stock.amount);
                let resAmount = existingAmount + amountNum;
                console.log(resAmount);
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
                setHolding(0);
                checkHolding();
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
                checkHolding();
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
                price,
                numOfStocks,
                firebase,
                user
            );
            if (funds === false) {
                return;
            } else {
                updateUserPossession(
                    true,
                    symbol,
                    'no more shortName. Bad?',
                    numOfStocks,
                    price,
                    changePercent
                );

                addToRecentlyBought(
                    symbol,
                    'no more shortName. Bad?',
                    numOfStocks,
                    price,
                    user.username,
                    changePercent,
                    user.organization,
                    firebase
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
            let tooMany = checkIfTooManyStocks(numOfStocks, holding);
            if (tooMany === true) {
                alert('You cant sell more than you have');
                return;
            } else {
                updateUserCurrency(
                    false,
                    currency,
                    price,
                    numOfStocks,
                    firebase,
                    user
                );
                updateUserPossession(
                    false,
                    symbol,
                    'no more shortName. Bad?',
                    numOfStocks,
                    price
                );
                addToRecentlySold(
                    symbol,
                    'no more shortName. Bad?',
                    numOfStocks,
                    price,
                    user.username,
                    changePercent,
                    user.organization,
                    firebase
                );
                setNumOfStocks(0);
                setSell(false);
            }
        }
    };

    const setValuesDom = (e) => {
        let targetVal = e.target.value;
        let price = stockData['Global Quote']['05. price'];
        let amountStock = targetVal;
        let brokerage = targetVal / 10;

        if (e.target.id == 'amount-dollar') {
            let calcAmountStock = Math.floor(targetVal / price);
            setTotalCost(calcAmountStock * price + brokerage);
            setAmountInDollar(targetVal);
            setNumOfStocks(calcAmountStock);
            return;
        }

        setNumOfStocks(targetVal);
        setTotalCost(amountStock * price + brokerage);
        setAmountInDollar((amountStock * price).toFixed(0));
    };

    return (
        <>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <ContentWrapper>
                    <MainWrapper>
                        <section>
                            <div className="stock-overview-wrapper">
                                <span
                                    style={
                                        changePercent < 0
                                            ? { color: 'var(--lighter-red)' }
                                            : { color: 'var(--lighter-green)' }
                                    }
                                >
                                    {changePercent > 0 ? (
                                        <i className="fas fa-long-arrow-alt-up"></i>
                                    ) : (
                                        <i className="fas fa-long-arrow-alt-down"></i>
                                    )}
                                    {changePercent.toFixed(2)}%
                                </span>
                                <h2>{symbol}</h2>
                                <span>{price.toFixed(2)} $</span>
                                <span>Your holding: {holding}</span>
                            </div>
                            <label>
                                Wallet
                                <div className="wallet-wrapper">
                                    {!userData.currency
                                        ? 'Loading...'
                                        : userData.currency.currency.toLocaleString()}{' '}
                                    $
                                </div>
                            </label>

                            <label>
                                Total amount in dollar
                                <ReusabelInputField
                                    id="amount-dollar"
                                    min="0"
                                    placeholder="Total amount"
                                    type="number"
                                    onChange={setValuesDom}
                                    value={amountInDollar}
                                />
                            </label>

                            <label>
                                Amount of stocks
                                <ReusabelInputField
                                    min="0"
                                    max="999"
                                    placeholder="Amount"
                                    type="number"
                                    onChange={setValuesDom}
                                    value={numOfStocks}
                                />
                            </label>

                            <div className="brokage-wrapper">
                                <span>Brokerage</span>
                                <span>{numOfStocks / 10}$</span>
                            </div>
                            <div className="amountWrapper">
                                <span>Total Amount</span>
                                <span>{totalCost.toFixed(2)} $</span>
                            </div>
                            <div className="buttonWrapper">
                                <GenericVestBtn
                                    bg="var(--primary)"
                                    hovbg="var(--lighter-green)"
                                    co="var(--body)"
                                    br="2rem"
                                    border="0.125rem solid var(--primary)"
                                    pad="0.6rem 3rem"
                                    onClick={onButtonClick}
                                >
                                    BUY
                                </GenericVestBtn>
                                <GenericVestBtn
                                    bg="white"
                                    hovbg="var(--lighter-red)"
                                    co="var(--primary)"
                                    br="2rem"
                                    border="0.125rem solid var(--primary)"
                                    pad="0.6rem 3rem"
                                    onClick={onButtonClick}
                                >
                                    SELL
                                </GenericVestBtn>
                            </div>
                        </section>
                    </MainWrapper>
                </ContentWrapper>
            )}
        </>
    );
};

export default Trade;
