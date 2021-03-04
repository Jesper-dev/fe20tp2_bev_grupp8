import React from 'react'
import { PortOverviewWrapper } from './PortfolioOverviewCardElements'

const PortfolioOverviewCard = ({total, difference, percent}) => {
    return (
        
        <PortOverviewWrapper>
            <h1>Total: {total} Anton-valuta</h1>
            <p>Return share <span>{difference} USD</span> <span>({percent}%)</span></p>
        </PortOverviewWrapper>
    )
}

export default PortfolioOverviewCard
