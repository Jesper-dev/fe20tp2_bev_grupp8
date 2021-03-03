import React from 'react';
import ShareCard from '../shared/card/ShareCard';
import { ContentWrapper } from './HomeElements';
import Recommendations from "../../api/recommendations/Recommendations"

import { useSelector } from 'react-redux';

const Home = () => {

    const stocksList = useSelector((state) => state.RecommendationReducer);

    return (
        <>
        <ContentWrapper>
            <h1>Portfolio</h1>

            {stocksList.map((item, index) => {
                return (
                    <ShareCard
                        key={index}
                        name={item.symbol}
                        cost={item.regularMarketPrice}
                        percent={item.regularMarketChangePercent}
                    />
                );
            })}
        </ContentWrapper>
        <Recommendations />
        </>
    );
};

export default Home;
