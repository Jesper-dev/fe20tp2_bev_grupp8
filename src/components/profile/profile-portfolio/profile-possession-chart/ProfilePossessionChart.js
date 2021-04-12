import React, { useEffect } from 'react';
import { Doughnut } from 'react-chartjs-2'; //changed!
import { useSelector } from 'react-redux';

import { ContentWrapper } from './ProfilePossessionChartElements.js';

const DistributionPortfolioChart = ({ currency }) => {
    const TotalStocks = useSelector((state) => state.TotalStocks);
    const TotalCrypto = useSelector((state) => state.TotalCrypto);

    let data = {
        labels: ['available cash', 'Securities', 'cryptocurrencies'],
        datasets: [
            {
                label: 'Total assets',
                data: [currency, TotalStocks, TotalCrypto],
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
        <>
            <ContentWrapper>
                <h1>Possesion distribution</h1>
                <Doughnut data={data} options={options} />
            </ContentWrapper>
        </>
    );
};

export default DistributionPortfolioChart;
