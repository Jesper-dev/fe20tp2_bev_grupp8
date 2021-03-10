import React from 'react';
import StockCard from '../shared/card/stock-card/StockCard';
import { ContentWrapper } from './HomeElements';
import Recommendations from '../../api/recommendations/Recommendations';
import Following from '../shared/homepage-custom-sections/FollowingHome';
import RecommendationHome from '../shared/homepage-custom-sections/RecommendationHome';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';
import Mock from '../../api/Mock/Mock.json';
import MockData from '../../api/Mock/MockData.json';
import MockGetTickers from '../../api/Mock/MockGetTickers.json';

import { useSelector } from 'react-redux';

const Home = () => {
    const stocksList = useSelector((state) => state.RecommendationReducer);
    const following = useSelector((state) => state.Following);
    const Currency = useSelector((state) => state.Currency);

    let array = MockGetTickers.finance.result[0].quotes;

    return (
        <>
            <ContentWrapper>
                <h2>PORTFOLIO</h2>

                <PortfolioOverview
                    total={Currency.toLocaleString()}
                    difference={0}
                    percent={0}
                />
                <Following array={following} />
                <RecommendationHome MockData={MockData} />
            </ContentWrapper>
            {/* <Recommendations /> */}
        </>
    );
};

export default Home;
