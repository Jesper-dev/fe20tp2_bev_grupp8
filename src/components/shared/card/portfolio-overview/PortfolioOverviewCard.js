import React from 'react';
import { PortOverviewWrapper } from './PortfolioOverviewCardElements';
// import { ContentWrapper as AnotherWrapper } from '../../homepage-custom-sections/HomepageComponentsElements.js';

const PortfolioOverviewCard = ({ total, difference, percent }) => {
    return (
        <PortOverviewWrapper>
            <header>
                <h2>
                    <i className="fas fa-wallet"></i> My Wallet
                    <span
                        className="percent"
                        style={
                            percent > 0
                                ? { color: '#58D7AC' }
                                : { color: '#DD577D' }
                        }
                    >
                        {percent}%
                    </span>
                </h2>
                <span className="total">
                    Total: <span>{total}$</span>
                </span>
            </header>
        </PortOverviewWrapper>
    );
};

export default PortfolioOverviewCard;
