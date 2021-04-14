import React, { useState, useEffect, useContext, useCallback } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import 'firebase/database';
import { FirebaseContext } from '../../firebase/context';
// import { SearchBarElement } from '../../shared/search-bar/SearchBarElements';
import { MainWrapper, ConfirmTrade } from './TradeElements';
import { GenericVestBtn } from '../../shared/button/ButtonElements';
// import { parse } from '@fortawesome/fontawesome-svg-core';
import { ReusabelInputField } from '../../shared/reusable-elements/ReusableElements';
import ContentWrapper from '../../shared/wrappers/ContentWrapper';

import { TradeConfirmRender } from './TradeRenders';

import {
    checkIfTooManyStocks,
    addToRecentlyBought,
    addToRecentlySold,
    updateUserCurrency,
} from './TradeFunctions';

const TradeCrypto = () => {
    let buyMeACoin = false;
    const user = JSON.parse(localStorage.getItem('authUser'));
    let cryptoIncludes;

    const [didMount, setDidMount] = useState(false);
    const [loading, setLoading] = useState(true);
    const [sell, setSell] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const [finalStep, setFinalStep] = useState(false);
    const [amountInDollar, setAmountInDollar] = useState(0);
    const [numOfCoins, setNumOfCoins] = useState(0);
    const [totalCost, setTotalCost] = useState(0);
    // const [includes, setIncludes] = useState(false);
    const [buy, setBuy] = useState(false);
    const [holding, setHolding] = useState(0);

    const [symbol, setSymbol] = useState('');
    const [price, setPrice] = useState(0);
    const [changePercent, setChangePercent] = useState(0);
    const [cryptoData, setCryptoData] = useState({});
    const [userData, setUserData] = useState({});
    /* let userDataVariable = {} */

    const chosenShare = useSelector((state) => state.ChosenShare);

    const { id } = useParams();
    const firebase = useContext(FirebaseContext);

    //*Checks if clicked stock has been bought before and if true display how many
    const checkHolding = useCallback(
        async (symbol) => {
            await firebase
                .user(user.uid)
                .child('/possessionCrypto')
                .once('value', (snapshot) => {
                    let dataDB = snapshot.val();
                    if (dataDB === undefined) return;
                    let stocks = [];
                    for (const key in dataDB) {
                        stocks.push({ ...dataDB[key] });
                    }
                    stocks.forEach((item) => {
                        if (item.symbol === symbol) {
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

        (async () => {
            await axios
                .get(
                    `https://api.coingecko.com/api/v3/coins/${id.toLowerCase()}?localization=true&tickers=true&market_data=true&developer_data=true&sparkline=true`
                )
                .then((response) => {
                    console.log(response.data);
                    setCryptoData(response.data);
                    checkHolding(response.data.symbol);
                    setChangePercent(
                        cryptoData.market_data.price_change_percentage_24h
                    );
                    setPrice(cryptoData.market_data.current_price.usd);
                    setSymbol(cryptoData.symbol);
                    /*       checkIfFollowed(response.data); */
                })

                .catch((error) => {
                    console.error(error);
                });
            setLoading(false);
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
            onBuy(numOfCoins);
        } else if (e.target.innerText === 'SELL') {
            onSell(numOfCoins);
        }
    };

    const checkIfStockIncludes = (symbol) => {
        let data = userData.possessionCrypto;
        let cryptos = [];
        for (const key in data) {
            cryptos.push({ ...data[key] });
        }
        for (let i = 0; i < cryptos.length; i++) {
            if (cryptos[i].symbol === symbol) {
                cryptoIncludes = true;
                let crypto = cryptos[i];
                return crypto;
            } else {
                cryptoIncludes = false;
            }
        }
    };

    const updateUserPossession = (
        buy,
        symbol,
        name,
        amountOfStocks,
        price,
        percent,
        imageUrl
    ) => {
        let stock = checkIfStockIncludes(symbol);
        let amountNum = parseFloat(amountOfStocks);
        if (buy === true) {
            if (cryptoIncludes === true) {
                let existingAmount = parseFloat(stock.amount);
                let resAmount = existingAmount + amountNum;
                console.log(resAmount);
                firebase
                    .user(user.uid)
                    .child(`/possessionCrypto/${symbol}`)
                    .update({
                        amount: resAmount,
                    });

                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionCrypto/${symbol}`)
                        .update({
                            amount: resAmount,
                        });
                }
            } else {
                firebase
                    .user(user.uid)
                    .child('/possessionCrypto')
                    .update({
                        [symbol]: {
                            name,
                            amount: amountNum,
                            price,
                            symbol,
                            percent,
                            image: imageUrl,
                        },
                    });
                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionCrypto`)
                        .update({
                            [symbol]: {
                                name,
                                amount: amountNum,
                                price,
                                symbol,
                                percent,
                                image: imageUrl,
                            },
                        });
                }
            }
        } else {
            let existingAmount = parseFloat(stock.amount);
            let resAmount = parseFloat(existingAmount - amountNum);

            if (resAmount <= 0) {
                firebase
                    .user(user.uid)
                    .child(`/possessionCrypto/${symbol}`)
                    .remove();

                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionCrypto/${symbol}`)
                        .remove();
                }
                setHolding(0);
                checkHolding();
            } else {
                firebase
                    .user(user.uid)
                    .child(`/possessionCrypto/${symbol}`)
                    .update({
                        amount: resAmount,
                    });

                if (user.organization) {
                    firebase
                        .organization(user.organization)
                        .child(`/users/${user.uid}/possessionCrypto/${symbol}`)
                        .update({
                            amount: resAmount,
                        });
                }
                checkHolding();
            }
        }
    };
    const onBuy = (numOfCoins, buyMeACoin) => {
        if (numOfCoins === 0) {
            alert('You need to buy some coins you fool');
            return;
        }
        if (buy === false) {
            setConfirm(true);
            setBuy(true);
            setSell(false);
        } else if (buyMeACoin === true) {
            console.log('Hit kommer vi');
            if (userData === null) return;
            let currency = userData.currency.currency;
            let funds = updateUserCurrency(
                true,
                currency,
                price,
                numOfCoins,
                firebase,
                user
            );
            if (funds === false) {
                return;
            } else {
                updateUserPossession(
                    true,
                    symbol,
                    cryptoData.id,
                    numOfCoins,
                    price,
                    changePercent,
                    cryptoData.image.large
                );

                addToRecentlyBought(
                    symbol,
                    cryptoData.id,
                    numOfCoins,
                    price,
                    user.username,
                    changePercent,
                    user.organization,
                    firebase,
                    cryptoData.image.large
                );
            }

            /*      setNumOfCoins(0); */
            setBuy(false);
            // setConfirm(false);
        }
    };

    const onClickConfirm = (numOfCoins) => {
        buyMeACoin = true;
        onBuy(numOfCoins, buyMeACoin);
        setFinalStep(true);
    };

    //*When we sell a stock
    const onSell = (numOfCoins) => {
        if (sell === false) {
            setSell(true);
            setBuy(false);
        } else if (sell === true) {
            if (userData === null) return;
            let currency = userData.currency.currency;
            let tooMany = checkIfTooManyStocks(numOfCoins, holding);
            if (tooMany === true) {
                alert('You cant sell more than you have');
                return;
            } else {
                updateUserCurrency(
                    false,
                    currency,
                    price,
                    numOfCoins,
                    firebase,
                    user
                );
                updateUserPossession(
                    false,
                    symbol,
                    cryptoData.id,
                    numOfCoins,
                    price
                );
                addToRecentlySold(
                    symbol,
                    cryptoData.id,
                    numOfCoins,
                    price,
                    user.username,
                    changePercent,
                    user.organization,
                    firebase
                );
                setSell(false);
            }
        }
    };

    const setValuesDom = (e) => {
        let targetVal = e.target.value;
        let price = cryptoData.market_data.current_price.usd;
        let amountStock = targetVal;
        let brokerage = targetVal / 2;

        if (e.target.id == 'amount-dollar') {
            let calcAmountStock = Math.floor(targetVal / price);
            setTotalCost(calcAmountStock * price + brokerage);
            setAmountInDollar(targetVal);
            setNumOfCoins(calcAmountStock);
            return;
        }

        setNumOfCoins(targetVal);
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
                        {confirm ? (
                            <TradeConfirmRender
                                img={cryptoData.image.large}
                                name={cryptoData.id}
                                ConfirmTrade={ConfirmTrade}
                                setConfirm={setConfirm}
                                onClickConfirm={onClickConfirm}
                                numOfCoins={numOfCoins}
                                finalStep={finalStep}
                                price={cryptoData.market_data.current_price.usd}
                                totalCost={totalCost}
                            />
                        ) : (
                            <section>
                                <div className="stock-overview-wrapper">
                                    <img
                                        className="coin-img"
                                        src={cryptoData.image.large}
                                    />
                                    <span
                                        style={
                                            cryptoData.market_data
                                                .price_change_percentage_24h < 0
                                                ? {
                                                      color:
                                                          'var(--lighter-red)',
                                                  }
                                                : {
                                                      color:
                                                          'var(--lighter-green)',
                                                  }
                                        }
                                    >
                                        {cryptoData.market_data
                                            .price_change_percentage_24h > 0 ? (
                                            <i className="fas fa-long-arrow-alt-up"></i>
                                        ) : (
                                            <i className="fas fa-long-arrow-alt-down"></i>
                                        )}
                                        {cryptoData.market_data.price_change_percentage_24h.toFixed(
                                            2
                                        )}
                                        %
                                    </span>
                                    <h2>{cryptoData.id}</h2>
                                    <span>
                                        {cryptoData.market_data.current_price.usd.toFixed(
                                            2
                                        )}{' '}
                                        $
                                    </span>
                                    <span>
                                        Your holding: {holding.toFixed(2)}
                                    </span>
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
                                    Amount of coins
                                    <ReusabelInputField
                                        step=".01"
                                        min="0"
                                        max="999"
                                        placeholder="Amount"
                                        type="number"
                                        onChange={setValuesDom}
                                        value={numOfCoins}
                                    />
                                </label>

                                <div className="brokage-wrapper">
                                    <span>Trading Fee</span>
                                    <span>{(numOfCoins / 2).toFixed(2)}$</span>
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
                        )}
                    </MainWrapper>
                </ContentWrapper>
            )}
        </>
    );
};

export default TradeCrypto;
