import React from 'react';
import StockCard from '../card/stock-card/StockCard';

import { ContentWrapper } from './HomepageComponentsElements';

const FollowingHome = ({ array }) => {
    return (
        <>
            <ContentWrapper>
                <h3>Following</h3>
                <p>
                    {array.length == 0
                        ? 'You are not following any stocks at the moment! Use the discover page to find stocks of your interest'
                        : ''}
                </p>
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
            </ContentWrapper>
        </>
    );
};

export default FollowingHome;
