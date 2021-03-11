import React from 'react';
import { useSelector } from 'react-redux';

import PortfolioOverview from '../../shared/card/portfolio-overview/PortfolioOverviewCard';

const ProfilePortfolio = () => {
    const Currency = useSelector((state) => state.Currency);
    return (
        <div>
            <h2>My Finance</h2>
            <PortfolioOverview total={Currency.toLocaleString()} />
        </div>
    );
};

export default ProfilePortfolio;
