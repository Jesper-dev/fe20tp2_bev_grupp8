import React from 'react';
// import StockCard from '../shared/card/stock-card/StockCard';
import { ContentWrapper } from './HomeElements';
// import Recommendations from '../../api/recommendations/Recommendations';
import Following from '../shared/homepage-custom-sections/FollowingHome';
import RecommendationHome from '../shared/homepage-custom-sections/RecommendationHome';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';
// import Mock from '../../api/Mock/Mock.json';
import MockData from '../../api/Mock/MockData.json';
// import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import News from '../shared/homepage-custom-sections/NewsCardSection';
import MockNewsList from '../../api/Mock/MockNewsList.json';
import { withAuthorization } from '../session'; //must be logged in to see content

import { useSelector } from 'react-redux';

const Home = () => {
    // const stocksList = useSelector((state) => state.RecommendationReducer);
    const following = useSelector((state) => state.Following);
    const followingCrypto = useSelector((state) => state.FollowingCrypto);
    const Currency = useSelector((state) => state.Currency);

    // let array = MockGetTickers.finance.result[0].quotes;

    return (
        <>
            <ContentWrapper>
                <h2>PORTFOLIO</h2>
                <PortfolioOverview
                    total={Currency.toLocaleString()}
                    difference={0}
                    percent={0}
                />

                <News array={MockNewsList.items.result.slice(0, 1)} />

                <Following array={following} cryptoList={followingCrypto} />
                <RecommendationHome MockData={MockData} />
            </ContentWrapper>
            {/* <Recommendations /> */}
        </>
    );
};

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Home); //check to see if you are signed in
