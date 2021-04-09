import React from 'react';
import StockCard from '../card/stock-card/StockCard';

import { ContentWrapper } from './CustomComponentsElements';

import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

const FollowingHome = ({ array }) => {
    let LabelsArr = ['region', 'symbol', 'price', 'change 24h ▾'];
    return (
        <>
            <ContentWrapper>
                <h3>Watching Securitys</h3>
                <SectionDataIndicator LabelsArr={LabelsArr} />
                {array.length === 0 ? (
                    <p>
                        You are not following any stocks or cryptocurrencies at
                        the moment! Use the Discover page to find stocks and
                        cryptocurrencies of your interest.
                    </p>
                ) : (
                    ''
                )}
                {array.slice(0, 3).map((item, index) => {
                    return (
                        <StockCard
                            stocksList={array}
                            key={index}
                            name={item.symbol}
                            cost={item.regularMarketPrice.raw}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })}
            </ContentWrapper>
        </>
    );
};

export default FollowingHome;
