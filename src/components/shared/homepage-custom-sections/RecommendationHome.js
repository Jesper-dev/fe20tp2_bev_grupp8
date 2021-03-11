import React from 'react';
import StockCard from '../card/stock-card/StockCard';
import { ContentWrapper } from './HomepageComponentsElements';
import { useSelector } from 'react-redux';

const RecommendationHome = ({ MockData }) => {
    const SeeRecRedux = useSelector((state) => state.SeeRecommendations);
    return (
        <>
            <ContentWrapper
                style={SeeRecRedux ? { display: 'flex' } : { display: 'none' }}
            >
                <h3>Recommendations</h3>
                {MockData.finance.result[0].quotes.map((item, index) => {
                    return (
                        <StockCard
                            stocksList={MockData.finance.result[0].quotes}
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

export default RecommendationHome;
