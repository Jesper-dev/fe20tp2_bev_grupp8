import React from 'react';
import { PortOverviewWrapper } from './PortfolioOverviewCardElements';
// import { ContentWrapper as AnotherWrapper } from '../../homepage-custom-sections/HomepageComponentsElements.js';

const PortfolioOverviewCard = ({
    total,
    difference,
    percent,
    stockvalue,
    cryptovalue,
}) => {
    console.log(stockvalue);
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
                    {/*   Cash: <span>{total}$</span> */}
                    {/*        Crypto: <span>{cryptovalue.toFixed(2)}$</span>
                    Securities: <span>{stockvalue.toFixed(2)}$</span> */}
                    Total assets:{' '}
                    <span>
                        {(parseFloat(total) + cryptovalue + stockvalue).toFixed(
                            2
                        )}
                        $
                    </span>
                </span>
            </header>
        </PortOverviewWrapper>
    );
};

export default PortfolioOverviewCard;
