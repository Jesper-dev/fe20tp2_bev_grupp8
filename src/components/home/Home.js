import React from 'react';
import ShareCard from '../shared/card/stock-card/StockCard';
import { ContentWrapper } from './HomeElements';
import Recommendations from "../../api/recommendations/Recommendations"
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard'
import Mock from "../../api/Mock.json"

import { useSelector } from 'react-redux';

const Home = () => {

    const stocksList = useSelector((state) => state.RecommendationReducer);
    return (
        <>
        <ContentWrapper>
            <h2>PORTFOLIO</h2>
            <PortfolioOverview total={198249.00} difference={20000} percent={1.8}/>

            {Mock.finance.result[0].quotes.map((item, index) => {
                return (
                    <ShareCard
                        stocksList={Mock.finance.result[0].quotes}
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
