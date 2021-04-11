import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';

import { FirebaseContext } from '../../components/firebase/context';

import { useDispatch } from 'react-redux';
import {
    setFetchedCryptos,
    setFetchedStocks,
    setTotalAssets,
    setTotalCrypto,
    setTotalStocks,
} from '../../redux/actions';

const FetchUserAssets = ({ currency }) => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const dispatch = useDispatch();

    const [stockData, setStockData] = useState(null);
    const [cryptoData, setCryptoData] = useState(null);

    const [stockValue, setStockValue] = useState(0);
    const [cryptoValue, setCryptoValue] = useState(0);

    const [stockPossession, setStockPossession] = useState(0);
    const [cryptoPossession, setCryptoPossession] = useState(0);

    const [loading, setLoading] = useState(true);

    const [cryptoStrings, setCryptoStrings] = useState(null);
    const [stocksStrings, setStocksStrings] = useState(null);

    const getFirebaseSnaphot = (dir, arr) => {
        firebase
            .user(user.uid)
            .child(dir)
            .once('value', (snapshot) => {
                let data = snapshot.val();
                for (const key in data) {
                    arr.push({ ...data[key] });
                }
                return arr;
            });
    };

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    let letsVestObj = {
        image: 'LV-CrY',
        name: 'lets-vest-CrY',
        symbol: 'LV',
        regularMarketPrice: getRandomInt(350),
        usd_24h_change: getRandomInt(100),
        amount: 1,
    };

    useEffect(() => {
        let stocksPosArr = [];
        let cryptoPosArr = [];

        let crypto;
        let stocks;

        firebase
            .user(user.uid)
            .once('value')
            .then(function (snapshot) {
                crypto = snapshot.child('/possessionCrypto').val();
                stocks = snapshot.child('/possessionStocks').val();
            })
            .then(() => {
                for (const key in stocks) {
                    stocksPosArr.push({ ...stocks[key] });
                }
                for (const key in crypto) {
                    cryptoPosArr.push({ ...crypto[key] });
                }
                console.log(stocksPosArr);
                return stocksPosArr, cryptoPosArr;
            })
            .then(() => {
                setCryptoPossession(cryptoPosArr);
                setStockPossession(stocksPosArr);

                let stocksIds = '';
                let cryptoIds = '';

                stocksPosArr.forEach((item) => {
                    if (item.symbol == 'LV') return;
                    stocksIds += item.symbol + ',';
                });

                cryptoPosArr.forEach((item) => {
                    if (item.name == 'lets-vest-CrY') return;
                    cryptoIds += item.name + ',';
                });

                setStocksStrings(stocksIds);
                setCryptoStrings(cryptoIds);

                stocksCall(stocksIds, stocksPosArr);
                cryptoCall(cryptoIds, cryptoPosArr);
            });
    }, []);

    const CalcStocks = (stockDataProp, stockPosArr) => {
        let stockDataArray = [];

        for (let i = 0; i < stockPosArr.length; i++) {
            if (stockPosArr[i].symbol == 'LV') continue;
            let index = stockDataProp.findIndex(
                (x) => x.symbol == stockPosArr[i].symbol
            );
            stockDataProp[index]['amount'] = stockPosArr[i].amount;
            stockDataProp[index]['name'] = stockPosArr[i].symbol;
        }

        for (const key in stockDataProp) {
            stockDataArray.push({ ...stockDataProp[key] });
        }

        stockDataArray.unshift(letsVestObj);

        let totalStockAssets = 0;

        for (let i = 0; i < stockDataArray.length; i++) {
            totalStockAssets =
                totalStockAssets +
                stockDataArray[i].amount * stockDataArray[i].regularMarketPrice;
        }
        dispatch(setFetchedStocks(stockDataArray));

        dispatch(setTotalStocks(totalStockAssets.toFixed(2)));
        setStockValue(totalStockAssets);

        /*    setCurrentStockValue(totalStockAssets.toFixed(2)); */
    };

    const CalcCrypto = (cryptoDataProp, cryptoPosArr) => {
        let cryptoDataArray = [];

        for (let i = 0; i < cryptoPosArr.length; i++) {
            if (cryptoPosArr[i].name == 'lets-vest-CrY') continue;
            cryptoDataProp[cryptoPosArr[i].name]['amount'] =
                cryptoPosArr[i].amount;
            cryptoDataProp[cryptoPosArr[i].name]['name'] = cryptoPosArr[i].name;
            cryptoDataProp[cryptoPosArr[i].name]['image'] =
                cryptoPosArr[i].image;
        }

        for (const key in cryptoDataProp) {
            cryptoDataArray.push({ ...cryptoDataProp[key] });
        }
        let letsVestObj = {
            image: 'LV-CrY',
            name: 'lets-vest-CrY',
            usd: getRandomInt(350),
            usd_24h_change: getRandomInt(100),
            amount: 1,
        };

        cryptoDataArray.unshift(letsVestObj);

        let totalCryptoValue = 0;

        for (let i = 0; i < cryptoDataArray.length; i++) {
            totalCryptoValue =
                totalCryptoValue +
                cryptoDataArray[i].amount * cryptoDataArray[i].usd;
        }

        dispatch(setFetchedCryptos(cryptoDataArray));

        setCryptoValue(totalCryptoValue);

        dispatch(setTotalCrypto(totalCryptoValue.toFixed(2)));
    };

    const cryptoCall = (cryptoIds, cryptoPosArr) => {
        (async () => {
            await axios
                .get(
                    `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                )
                .then((response) => {
                    setCryptoData(response.data);
                    CalcCrypto(response.data, cryptoPosArr);
                    setLoading(false);
                })
                .catch((error) => {
                    console.error(error);
                });
        })();
    };

    const stocksCall = (stocksIds, stocksPosArr) => {
        const options = {
            method: 'GET',
            url:
                'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
            params: { region: 'US', symbols: stocksIds },
            headers: {
                'x-rapidapi-key':
                    '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            },
        };

        axios
            .request(options)
            .then(function (response) {
                setStockData(response.data.quoteResponse.result);
                CalcStocks(response.data.quoteResponse.result, stocksPosArr);
            })
            .catch(function (error) {
                console.error(error);
            });
    };

    return null;
};

export default FetchUserAssets;
