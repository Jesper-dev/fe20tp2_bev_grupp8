import React from 'react';
import ShareCard from '../shared/card/ShareCard';
import { ContentWrapper } from './HomeElements';
import Recommendations from "../../api/recommendations/Recommendations"
import Mock from "../../api/Mock.json"

import { useSelector } from 'react-redux';

const Home = () => {

    const stocksList = useSelector((state) => state.RecommendationReducer);
    return (
        <>
        <ContentWrapper>
            <h1>FLOW</h1>

            <h2>PORTFOLIO</h2>

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
