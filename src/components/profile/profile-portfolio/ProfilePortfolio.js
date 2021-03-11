import React from 'react';
import { useSelector } from 'react-redux';

import { ContentWrapper } from './ProfilePortfolioElements';
import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';

const ProfilePortfolio = () => {
    const Currency = useSelector((state) => state.Currency);
    return (
        <ContentWrapper>
            <h2>My Finance</h2>
            <PortfolioOverview total={Currency.toLocaleString()} />
        </ContentWrapper>
    );
};

export default ProfilePortfolio;
