import React, { useState } from 'react';
import {
    PortOverviewWrapper,
    PortfolioTopbarWrapper,
} from './PortfolioOverviewCardElements';

import DistributionPortfolioChart from '../../../profile/profile-portfolio/profile-possession-chart/ProfilePossessionChart'
// import { ContentWrapper as AnotherWrapper } from '../../homepage-custom-sections/HomepageComponentsElements.js';
import { useSelector } from 'react-redux';

const PortfolioOverviewCard = ({ total, difference, percent }) => {
    const TotalStocks = useSelector((state) => state.TotalStocks);
    const TotalCrypto = useSelector((state) => state.TotalCrypto);

    const [toggleOpen, setToggleOpen] = useState(false);

    let totalAssets = (
        parseFloat(total) +
        parseFloat(TotalCrypto) +
        parseFloat(TotalStocks)
    ).toFixed(2);

    return (
        <PortOverviewWrapper>
            <summary>
                <h1>Wallet<i className="fas fa-chevron-right"></i></h1>
                <div>
                    <article>
                        <h2>Total assets</h2>
                        <h3>{totalAssets}$</h3>
                    </article>
                    <article>
                        <h2>Change</h2>
                        <h3
                            style={
                                percent >= 0
                                ? { color: 'var(--lighter-green)' }
                                : { color: 'var(--lighter-red)' }
                            }
                            >
                            {/* {!Infinity ? 'Loading' : change.toFixed(2)}% */}
                            {15}%
                        </h3>
                    </article>
                    <article>
                        <h2 title="Return of investment (ROI)">Return</h2>
                        <h3>{2550}$</h3>
                    </article>
                </div>
            </summary>
            <DistributionPortfolioChart />
        </PortOverviewWrapper>

    );
};

export default PortfolioOverviewCard;
