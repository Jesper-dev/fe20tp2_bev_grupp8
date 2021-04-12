import React, { useState } from 'react';
import {
    PortOverviewWrapper,
    PortfolioTopbarWrapper,
} from './PortfolioOverviewCardElements';

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
        <>
            <PortOverviewWrapper>
                <header>
                    <h2>
                        <i className="fas fa-wallet"></i> My Wallet
                    </h2>
                    {/*       <article>
                        <h2>Aviable cash</h2>
                        <h3>{total}$</h3>
                    </article> */}
                    <span className="total">
                        {/*            <span
                            className="percent"
                            style={
                                15 > 0
                                    ? { color: '#58D7AC' }
                                    : { color: '#DD577D' }
                            }
                        >
                            {15}%
                        </span> */}
                        <i
                            className="fas fa-chevron-down"
                            onClick={() => setToggleOpen(!toggleOpen)}
                        ></i>
                    </span>

                    {/*            {toggleOpen ? (
                        <>
                            <article>
                                <h2>Total assets</h2>
                                <h3>{994545}$</h3>
                            </article>

                            <article>
                                <h2>Crypto value</h2>
                                <h3>{994545}$</h3>
                            </article>

                            <article>
                                <h2>Security value</h2>
                                <h3>{994545}$</h3>
                            </article>
                        </>
                    ) : null} */}

                    {/*   Cash: <span>{total}$</span> */}
                    {/*        Crypto: <span>{cryptovalue.toFixed(2)}$</span>
                    Securities: <span>{stockvalue.toFixed(2)}$</span> */}
                    {/*  Total assets: <span>{totalAssets}$</span> */}
                </header>
            </PortOverviewWrapper>
            <PortfolioTopbarWrapper>
                <div className="quick-cards-wrapper">
                    <article>
                        <h2>Total assets</h2>
                        <h3>{totalAssets}$</h3>
                    </article>
                    {/*           <article>
                        <h2>Crypto value</h2>
                        <h3>{TotalCrypto}$</h3>
                    </article>
                    <article>
                        <h2>Security value</h2>
                        <h3>{TotalStocks}$</h3>
                    </article> */}
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
            </PortfolioTopbarWrapper>
        </>
    );
};

export default PortfolioOverviewCard;
