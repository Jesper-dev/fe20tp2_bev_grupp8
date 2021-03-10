import React from 'react';
import { PortOverviewWrapper } from './PortfolioOverviewCardElements';

const PortfolioOverviewCard = ({ total, difference, percent }) => {
    return (
        <PortOverviewWrapper>
            <h6>Total</h6>
            <h1>{total} $</h1>
            <p>
                Return share <span>{difference} USD</span>{' '}
                <span>({percent}%)</span>
            </p>
        </PortOverviewWrapper>
    );
};

export default PortfolioOverviewCard;
