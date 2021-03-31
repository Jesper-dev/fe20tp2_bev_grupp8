import React from 'react';
import { useSelector } from 'react-redux';

// import { ContentWrapper } from './ProfilePortfolioElements'; //remove?
import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';
import Possession from './profile-possession/Possession.js'

const ProfilePortfolio = () => {
    const Currency = useSelector((state) => state.Currency);
    return (
        <>
            <PortfolioOverview total={Currency.toLocaleString()} />
            <Possession />
        </>
    );
};

export default ProfilePortfolio;
