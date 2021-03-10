import React from 'react';
import StockCard from '../card/stock-card/StockCard';

const FollowingHome = ({ array }) => {
    return (
        <>
            <h3>Following</h3>
            {array.map((item, index) => {
                return (
                    <StockCard
                        stocksList={array}
                        key={index}
                        name={item.symbol}
                        cost={item.regularMarketPrice}
                        percent={item.regularMarketChangePercent}
                    />
                );
            })}
        </>
    );
};

export default FollowingHome;
