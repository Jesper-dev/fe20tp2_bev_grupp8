import React, { useEffect, useState } from 'react';
import axios from 'axios';

/* import MockGetTickers from '../../../api/Mock/MockGetTickers.json'; */
import MockGetTickers from '../../../api/Mock/MockGetTickers.json';

import StockCard from '../../shared/card/stock-card/StockCard';
import UsFlag from '../../svgs/flags/America';

import { StockListElement } from './DiscoverStocksListElements';

const DiscoverStocksList = () => {
    const [stocks, setStocks] = useState([]);
    const [mounted, setMounted] = useState(false);
    useEffect(() => {
        setMounted(false);
        const options = {
            method: 'GET',
            url:
                'https://yahoo-finance-low-latency.p.rapidapi.com/ws/screeners/v1/finance/screener/predefined/saved',
            params: { scrIds: 'day_gainers', count: '25' },
            headers: {
                'x-rapidapi-key':
                    '9e8ddf2821msh4c4f74e49206ee9p1302d4jsn143cd2ada6f1',
                'x-rapidapi-host': 'yahoo-finance-low-latency.p.rapidapi.com',
            },
        };

        axios
            .request(options)
            .then(function (response) {
                setStocks(response.data.finance.result[0].quotes);
            })
            .catch(function (error) {
                console.error(error);
            });

        return () => {
            setMounted(true);
        };
    }, [mounted]);
    /*
    const checkForFlag = (array) => {
        if (array[0].region === 'US') return <UsFlag />;
    }; */

    return (
        <StockListElement>
            <h1>
                Stockmarket <UsFlag />
            </h1>
            {stocks.length ? stocks.map((item, index) => {
                return (
                    <StockCard
                        key={index}
                        name={item.symbol ? item.symbol : item.shortName}
                        percent={
                            item.regularMarketChangePercent
                                ? item.regularMarketChangePercent
                                : 0
                        }
                        cost={
                            item.regularMarketPrice
                                ? item.regularMarketPrice
                                : 0
                        }
                        stocksList={stocks}
                    />
                );
            }) : <p>Loading...</p>}
        </StockListElement>
    );
};

export default DiscoverStocksList;
