import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2'; //changed!
import { useSelector, useDispatch } from 'react-redux';

import { setFetchedCryptos } from '../../../../redux/actions';

import { ContentWrapper } from './DistributionPortfilioChartElements.js.js';

const DistributionPortfolioChart = ({
    stocksPossesionState,
    cryptoPossesionState,
    currency,
}) => {
    const dispatch = useDispatch();

    const [cryptoData, setCryptoData] = useState(null);
    const [currentCryptoValue, setCurrentCryptoValue] = useState(250);

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
    }, [cryptoData, PossessionCrypto]);

    let data = {
        labels: ['available cash', 'Securities', 'cryptocurrencies'],
        datasets: [
            {
                label: 'Most followed stocks',
                data: [currency, 12000, currentCryptoValue],
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
