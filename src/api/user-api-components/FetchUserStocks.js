import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { setFetchedStocks, setTotalStocks } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from '../../components/firebase/context';
import { fetchUserSnapshotArray } from '../../components/shared/functions/firebase-functions';

const FetchUserStocks = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const dispatch = useDispatch();

    const [stockData, setStockData] = useState(null);

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
    };

    useEffect(() => {
        fetchUserSnapshotArray(
            firebase,
            user.uid,
            '/possessionStocks',
            setStockData
        );
    }, []);

    useEffect(() => {
        if (!stockData) return;
        let ids = '';

        stockData.forEach((item) => {
            if (item.symbol == 'LV') return;
            ids += item.symbol + ',';
        });

        const options = {
            method: 'GET',
            url:
                'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
            params: { region: 'US', symbols: ids },
            headers: {
                'x-rapidapi-key':
                    '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
            },
        };

        const stockCall = () => {
            (async () => {
                await axios
                    .request(options)
                    .then(function (response) {
                        CalcStocks(
                            response.data.quoteResponse.result,
                            stockData
                        );
                    })
                    .catch(function (error) {
                        console.error(error);
                    });
            })();
        };

        stockCall();
    }, [stockData]);

    return null;
};

export default FetchUserStocks;
