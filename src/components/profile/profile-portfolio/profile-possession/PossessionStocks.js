import React from 'react';
import StockCard from '../../../shared/card/stock-card/StockCard';
import { ContentWrapper } from './PossessionElements';

const Possession = ({ stocksPossesionState }) => {
    return (
        <ContentWrapper>
            <h1>Possession Stocks</h1>
            {stocksPossesionState.length > 0 ? (
                stocksPossesionState.map((item, index) => {
                    return (
                        <StockCard
                            key={index}
                            amount={item.amount}
                            name={item.symbol ? item.symbol : item.shortName}
                            percent={item.percent}
                            cost={item.price * item.amount}
                            stocksList={stocksPossesionState}
                        />
                    );
                })
            ) : (
                <p>Loading...</p>
            )}
        </ContentWrapper>
    );
};

export default Possession;
