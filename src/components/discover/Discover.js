import React from 'react';
import MockGetMoversEU from '../../api/Mock/MockGetMoversEU.json';
import MockGetMoversUS from '../../api/Mock/MockGetMoversUS.json';
import MockWatchList from '../../api/Mock/MockWatchList.json';
import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import StockCard from '../shared/card/stock-card/StockCard';

import { ContentWrapper, StockWrapper } from './DiscoverElements';

const Discover = () => {
    console.log(MockGetTickers);
    let array = MockGetTickers.finance.result[0].quotes;
    console.log(array);

    return (
        <>
            <ContentWrapper>
                <div>
                    <h2>Stonks Region: {array[0].region} </h2>
                </div>
                {array.map((item, index) => {
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
                            stocksList={array}
                        />
                    );
                })}
            </ContentWrapper>
        </>
    );
};

export default Discover;
