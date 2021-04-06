import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Pie } from 'react-chartjs-2'; //changed!
import { useSelector } from 'react-redux'

import { ContentWrapper } from './ProfilePossessionChartElements';


const DistributionPortfolioChart = ({
    stocksPossesionState,
    cryptoPossesionState,
    currency,
}) => {
    const [cryptoData, setCryptoData] = useState({});
    const [cryptoDataSpliced, setCryptoDataSpliced] = useState([]);
    const [currentCryptoValue, setCurrentCryptoValue] = useState(0);

    const PossessionStocks = useSelector(state => state.PossessionStocks)
    const PossessionCrypto = useSelector(state => state.PossessionCrypto)
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        let cryptoIds = '';
        let splicedArr = cryptoPossesionState.splice(0,1)

        setCryptoDataSpliced(splicedArr)

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
          for (const key in cryptoData) {
                cryptoDataArray.push({ ...cryptoData[key] });
            }
               /* console.log(cryptoDataArray) */

           cryptoDataArray.forEach((item, i) => {
               console.log(cryptoDataSpliced)
               console.log(item.usd)

    /*         setCurrentCryptoValue(currentCryptoValue + (item.usd * cryptoDataSpliced[i].amount)) */
 /*            console.log(currentCryptoValue) */
   /*          setCurrentCryptoValue(currentCryptoValue + item.usd); */
        });
        console.log(currentCryptoValue)

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
            <h1>Possesion distribution</h1>
            <Pie data={data} options={options} />
        </ContentWrapper>
    );
};

export default DistributionPortfolioChart;
