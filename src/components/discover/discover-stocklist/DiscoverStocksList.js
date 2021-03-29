import React from 'react'

/* import MockGetTickers from '../../../api/Mock/MockGetTickers.json'; */
import MockGetTickers from '../../../api/Mock/MockGetTickers.json';

import StockCard from '../../shared/card/stock-card/StockCard'
import UsFlag from '../../svgs/flags/America';

import { ContentWrapper } from './DiscoverStocksListElements'

const DiscoverStocksList = () => {
    
    let array = MockGetTickers.finance.result[0].quotes;

      const checkForFlag = () => {
          if (array[0].region === 'US') return <UsFlag />;
      };

      let flag = checkForFlag();


    return (
        <ContentWrapper>
            <header>
                <h1>stockmarket - region: {flag}</h1>
                
            </header>
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
    );
}

export default DiscoverStocksList
