import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { useSelector } from 'react-redux';

const TotalStockAssets = () => {
    const OrganizationData = useSelector((state) => state.OrganizationData);

    const [stockData, setStockData] = useState(null);
    const [stockValues, setStockValues] = useState(0);
    const [amountArray, setAmountArray] = useState([]);

    useEffect(() => {
        let unique = MakeSymbolsArray(OrganizationData);
        MakeSymbolsWithAmountArray(OrganizationData);

        unique.splice(0, 1).join();

        let symbols = unique.join();
        /* 
            const options = {
            method: 'GET',
            url:
                'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
            params: { region: 'US', symbols: symbols },
            headers: {
                'x-rapidapi-key':
                    '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            },
        };

        axios
            .request(options)
            .then(function (response) {
                console.log(response.data);
                setStockData(response.data.quoteResponse.result);
            })
            .catch(function (error) {
                console.error(error);
            }); */

        return () => {};
    }, []);

    useEffect(() => {
        let total = 0;

        amountArray.forEach((item, i) => {
            /*      let index = stockData.findIndex((x) => x.symbol == item.symbol); */
            return (total += stockData[i].regularMarketPrice * item.amount);
        });

        setStockValues(total.toFixed(2));

        return () => {};
    }, [stockData]);

    const ReduceFunc = (arr) => {
        let result = [];
        arr.forEach(function (a) {
            if (!this[a.symbol]) {
                this[a.symbol] = { symbol: a.symbol, amount: 0 };
                result.push(this[a.symbol]);
            }
            this[a.symbol].amount += a.amount;
        }, Object.create(null));
        return result;
    };

    const MakeSymbolsArray = (arr) => {
        let orgStockPossessionArr = [];
        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].possessionStocks);
            if (arr[j].possessionStocks[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgStockPossessionArr.push(
                    arr[j].possessionStocks[keys[i]].symbol
                );
                i++;
            }
        }
        let uniq = [...new Set(orgStockPossessionArr)];
        return uniq;
    };

    const MakeSymbolsWithAmountArray = (arr) => {
        let orgStockPossessionArr = [];
        let j = 0;
        let i = 0;
        while (j < arr.length) {
            let keys = Object.keys(arr[j].possessionStocks);
            if (arr[j].possessionStocks[keys[i]] === undefined) {
                i = 0;
                j++;
            } else {
                orgStockPossessionArr.push({
                    symbol: arr[j].possessionStocks[keys[i]].symbol,
                    amount: arr[j].possessionStocks[keys[i]].amount,
                });
                i++;
            }
        }
        let reducedArray = ReduceFunc(orgStockPossessionArr);
        reducedArray.splice(0, 1);
        setAmountArray(reducedArray);
    };

    return (
        <article>
            <h2>Stocks value</h2>
            <h3>{stockValues}$</h3>
        </article>
    );
};

export default TotalStockAssets;
