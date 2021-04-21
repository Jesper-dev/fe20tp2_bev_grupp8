import React from 'react';
import StockCard from '../../../shared/card/stock-card/StockCard';
import { ContentWrapper } from './PossessionElements';

import { sortArrayOfObjByLargetsNumber } from '../../../shared/functions/ArrayManipulationFuncs'


const Possession = ({ stocksPossesionState }) => {

    sortArrayOfObjByLargetsNumber(stocksPossesionState, 'amount')
    return (
        <ContentWrapper>
            <h1>Possession Stocks</h1>
            <div>
            {stocksPossesionState.length > 0 ? (
                stocksPossesionState.reverse().slice(0,10).map((item, index) => {
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
            </div>
        </ContentWrapper>
    );
};

export default Possession;
