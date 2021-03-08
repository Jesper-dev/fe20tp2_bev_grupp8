import React from 'react';
import StockCard from '../shared/card/stock-card/StockCard';
import { ContentWrapper } from './HomeElements';
import Recommendations from '../../api/recommendations/Recommendations';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';
import Mock from '../../api/Mock.json';
import MockData from '../../api/MockData.json';

import { useSelector } from 'react-redux';

const Home = () => {
    const stocksList = useSelector((state) => state.RecommendationReducer);
    const following = useSelector((state) => state.Following)
    return (
        <>
            <ContentWrapper>
                <h2>PORTFOLIO</h2>
                <PortfolioOverview
                    total={218249.0}
                    difference={20000}
                    percent={2.5}
                />

                {/* {MockData.finance.result[0].quotes.map((item, index) => {
                    return (
                        <StockCard
                            stocksList={MockData.finance.result[0].quotes}
                            key={index}
                            name={item.symbol}
                            cost={item.regularMarketPrice}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })} */}

                 {following.map((item, index) => {
                    return (
                        <StockCard
                            stocksList={following}
                            key={index}
                            name={item.symbol}
                            cost={item.regularMarketPrice}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })}


            </ContentWrapper>
            {/*        <Recommendations /> */}
        </>
    );
};

export default Home;