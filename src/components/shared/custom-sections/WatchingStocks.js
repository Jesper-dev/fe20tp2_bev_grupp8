import React from 'react';
import StockCard from '../card/stock-card/StockCard';
import StockCardSmall from '../card/stock-card-small/StockCardSmall';

import { ContentWrapper } from './CustomComponentsElements';

import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

const FollowingHome = ({ array, gap, stockscardsmall }) => {
    let LabelsArr = [
        <i className="fas fa-globe"></i>,
        'symbol',
        'price',
        'change 24h ▾',
    ];
    return (
        <>
            <ContentWrapper gap={gap}>
                <h3>Watching Securities</h3>
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
                {stockscardsmall ? (
                    <>
                        {array.slice(0, 3).map((item, index) => {
                            return (
                                <StockCardSmall
                                    stocksList={array}
                                    key={index}
                                    name={item.symbol}
                                    cost={item.regularMarketPrice.raw}
                                    percent={item.regularMarketChangePercent}
                                />
                            );
                        })}
                    </>
                ) : (
                    <>
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
                    </>
                )}

                {/*       {array.slice(0, 3).map((item, index) => {
                    return (
                        <StockCard
                            stocksList={array}
                            key={index}
                            name={item.symbol}
                            cost={item.regularMarketPrice.raw}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })} */}
            </ContentWrapper>
        </>
    );
};

export default FollowingHome;
