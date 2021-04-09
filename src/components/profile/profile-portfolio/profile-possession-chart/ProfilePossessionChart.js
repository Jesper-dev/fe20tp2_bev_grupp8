import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2'; //changed!
import { useSelector, useDispatch } from 'react-redux';

import { setFetchedCryptos, setFetchedStocks } from '../../../../redux/actions';

import { ContentWrapper } from './ProfilePossessionChartElements.js';

const DistributionPortfolioChart = ({
    stocksPossesionState,
    cryptoPossesionState,
    currency,
}) => {
    const dispatch = useDispatch();

    const [stockData, setStockData] = useState(null);
    const [cryptoData, setCryptoData] = useState(null);
    const [currentCryptoValue, setCurrentCryptoValue] = useState(250);
    const [currentStockValue, setCurrentStockValue] = useState(250);

    const PossessionStocks = useSelector((state) => state.PossessionStocks);
    const PossessionCrypto = useSelector((state) => state.PossessionCrypto);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cryptoIds = '';

        cryptoPossesionState.forEach((item) => {
            if (item.name == 'lets-vest-CrY') return;
            cryptoIds += item.name + ',';
        });

        if (cryptoIds) {
            (async () => {
                await axios
                    .get(
                        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                    )
                    .then((response) => {
                        setCryptoData(response.data);
                        console.log(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })();
        }

        return () => {};
    }, [cryptoPossesionState, PossessionCrypto]);

    useEffect(() => {
        let stocksIds = '';

        stocksPossesionState.forEach((item) => {
            if (item.symbol == 'LV') return;
            stocksIds += item.symbol + ',';
        });

        console.log(stocksIds);

        /*         return; */
        if (stocksIds) {
            const options = {
                method: 'GET',
                url:
                    'https://apidojo-yahoo-finance-v1.p.rapidapi.com/market/v2/get-quotes',
                params: { region: 'US', symbols: stocksIds },
                headers: {
                    'x-rapidapi-key':
                        '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
                    'x-rapidapi-host':
                        'apidojo-yahoo-finance-v1.p.rapidapi.com',
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
                });
        }

        return () => {};
    }, [stocksPossesionState, PossessionStocks]);

    useEffect(() => {
        if (!stockData || !PossessionStocks) return;
        let stockDataArray = [];

        for (let i = 0; i < PossessionStocks.length; i++) {
            if (PossessionStocks[i].symbol == 'LV') continue;
            let index = stockData.findIndex(
                (x) => x.symbol == PossessionStocks[i].symbol
            );
            stockData[index]['amount'] = PossessionStocks[i].amount;
            stockData[index]['name'] = PossessionStocks[i].symbol;
        }
        console.log(stockData);
        for (const key in stockData) {
            stockDataArray.push({ ...stockData[key] });
        }

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
        stockDataArray.unshift(letsVestObj);

        let totalStockAssets = 0;

        for (let i = 0; i < stockDataArray.length; i++) {
            totalStockAssets =
                totalStockAssets +
                stockDataArray[i].amount * stockDataArray[i].regularMarketPrice;
        }
        dispatch(setFetchedStocks(stockDataArray));
        setCurrentStockValue(totalStockAssets.toFixed(2));

        return () => {};
    }, [stockData]);

    useEffect(() => {
        if (!cryptoData || !PossessionCrypto) return;

        let cryptoDataArray = [];

        for (let i = 0; i < PossessionCrypto.length; i++) {
            if (PossessionCrypto[i].name == 'lets-vest-CrY') continue;
            cryptoData[PossessionCrypto[i].name]['amount'] =
                PossessionCrypto[i].amount;
            cryptoData[PossessionCrypto[i].name]['name'] =
                PossessionCrypto[i].name;
            cryptoData[PossessionCrypto[i].name]['image'] =
                PossessionCrypto[i].image;
        }

        for (const key in cryptoData) {
            cryptoDataArray.push({ ...cryptoData[key] });
        }

        const getRandomInt = (max) => {
            return Math.floor(Math.random() * max);
        };

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
        setCurrentCryptoValue(totalCryptoValue.toFixed(2));

        return () => {};
    }, [cryptoData]);

    let data = {
        labels: ['available cash', 'Securities', 'cryptocurrencies'],
        datasets: [
            {
                label: 'Total assets',
                data: [currency, currentStockValue, currentCryptoValue],
                backgroundColor: ['#9BC53D', '#5BC0EB', '#FDE74C'],
                minBarLength: 50,
                hoverOffset: 1,
            },
        ],
    };

    let options = {
        maintainAspectRatio: false,
        legend: {
            display: true,
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        beginAtZero: true,
                    },
                },
            ],
        },
    };

    return (
        <ContentWrapper>
            <h1>Possesion distribution</h1>
            <Pie data={data} options={options} />
        </ContentWrapper>
    );
};

export default DistributionPortfolioChart;
