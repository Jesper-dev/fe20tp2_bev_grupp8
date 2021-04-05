import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Pie } from 'react-chartjs-2'; //changed!

import { ContentWrapper } from './ProfilePossessionChartElements';

const DistributionPortfolioChart = ({
    stocksPossesionState,
    cryptoPossesionState,
    currency,
}) => {
    const [cryptoData, setCryptoData] = useState({});
    const [currentCryptoValue, setCurrentCryptoValue] = useState(0);

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
    }, [cryptoPossesionState]);

    useEffect(() => {
        let cryptoDataArray = [];
        cryptoDataArray.push(cryptoData);

        /*    cryptoDataArray.forEach((item) => {
            currentCryptoValue + item.usd;
            setCurrentCryptoValue();
        }); */

        return () => {};
    }, [cryptoData]);

    let data = {
        labels: ['available cash', 'Securities', 'cryptocurrencies'],
        datasets: [
            {
                label: 'Most followed stocks',
                data: [currency, 2000, 3000],
                backgroundColor: [
                    '#3e95cd',
                    '#8e5ea2',
                    '#3cba9f',
                    '#e8c3b9',
                    '#c45850',
                    '#3DAD9C',
                    '#4BFADF',
                    '#F964FA',
                    '#FADF7C',
                    '#AD34AD',
                ],
                minBarLength: 50,
                hoverOffset: 1,
            },
        ],
    };

    let options = {
        maintainAspectRatio: false,
        legend: {
            display: false,
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
            <Pie data={data} options={options} />
        </ContentWrapper>
    );
};

export default DistributionPortfolioChart;
