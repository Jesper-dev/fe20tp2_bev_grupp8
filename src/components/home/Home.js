import React from 'react';
import StockCard from '../shared/card/stock-card/StockCard';
import { ContentWrapper } from './HomeElements';
import Recommendations from '../../api/recommendations/Recommendations';
import Following from '../shared/homepage-custom-sections/FollowingHome';
import RecommendationHome from '../shared/homepage-custom-sections/RecommendationHome';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';
import Mock from '../../api/Mock.json';
import MockData from '../../api/MockData.json';
import MockGetTickers from '../../api/MockGetTickers.json';

import { useSelector } from 'react-redux';

const Home = () => {
    const stocksList = useSelector((state) => state.RecommendationReducer);
    const following = useSelector((state) => state.Following);

    let array = MockGetTickers.finance.result[0].quotes;
    console.log(array);

    return (
        <>
            <ContentWrapper>
                <h2>PORTFOLIO</h2>

                <PortfolioOverview
                    total={218249.0}
                    difference={20000}
                    percent={2.5}
                />
                <Following array={following} />
                <RecommendationHome MockData={MockData} />
            </ContentWrapper>
            {/* <Recommendations /> */}
        </>
    );
};

export default Home;
