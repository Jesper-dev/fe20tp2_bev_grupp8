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
                data: [currency, 12000, 13000],
                backgroundColor: [
                    '#9BC53D',
                    '#5BC0EB',
                    '#FDE74C'
                ],
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
            <h2>Possesion distribution</h2>
            <Pie data={data} options={options} />
        </ContentWrapper>
    );
};

export default DistributionPortfolioChart;
