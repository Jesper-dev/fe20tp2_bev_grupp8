import React from 'react';
import { PortOverviewWrapper } from './PortfolioOverviewCardElements';
import { ContentWrapper as AnotherWrapper } from '../../homepage-custom-sections/HomepageComponentsElements.js';

const PortfolioOverviewCard = ({ total, difference, percent }) => {
    return (
        <AnotherWrapper>
            <PortOverviewWrapper>
                <header>
                    <h1>
                         <i className="fas fa-wallet"></i> My Wallet{' '}
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
                    </h1>
                    <p className="total">
                        Total: <span>{total}$</span>
                    </p>
                </header>
            </PortOverviewWrapper>
        </AnotherWrapper>
    );
};

export default PortfolioOverviewCard;
