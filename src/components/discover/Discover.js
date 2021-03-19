import React, { useState } from 'react';
// import MockGetMoversEU from '../../api/Mock/MockGetMoversEU.json';
// import MockGetMoversUS from '../../api/Mock/MockGetMoversUS.json';
// import MockWatchList from '../../api/Mock/MockWatchList.json';
import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import StockCard from '../shared/card/stock-card/StockCard';
import CryptoCard from '../shared/card/crypto-card/CryptoCard';
import MockCrypto from '../../api/Mock/MockCrypto.json';

import UsFlag from '../svgs/flags/America';

import SearchBar from '../shared/search-bar/SearchBar';
import { ContentWrapper } from './DiscoverElements';
import { ContentWrapper as AnotherWrapper } from '../shared/homepage-custom-sections/HomepageComponentsElements';
import { ShowCryptoBtn } from '../shared/button/ButtonElements';
// import { useSelector } from 'react-redux';

const Discover = () => {
    const [show, setShow] = useState(false);
    let array = MockGetTickers.finance.result[0].quotes;
    // const followingArray = useSelector((state) => state.Following)
    // const StocksArray = useSelector((state) => state.Stocks)

    const checkForFlag = () => {
        if (array[0].region === 'US') return <UsFlag />;
    };

    let flag = checkForFlag();

    return (
        <>
            <SearchBar />
            <ContentWrapper>
                <header>
                    <h1>Stonks Region: {flag}</h1>
                </header>
                <AnotherWrapper>
                    {array.map((item, index) => {
                        return (
                            <StockCard
                                key={index}
                                name={
                                    item.symbol ? item.symbol : item.shortName
                                }
                                percent={
                                    item.regularMarketChangePercent
                                        ? item.regularMarketChangePercent
                                        : 0
                                }
                                cost={
                                    item.regularMarketPrice
                                        ? item.regularMarketPrice
                                        : 0
                                }
                                stocksList={array}
                            />
                        );
                    })}
                </AnotherWrapper>
                <AnotherWrapper>
                    <h2>Cryptocurrencies</h2>
                    <ShowCryptoBtn onClick={() => setShow(!show)}>
                        {show
                            ? 'Hide Cryptocurrencies'
                            : 'Show Cryptocurrencies'}
                    </ShowCryptoBtn>
                    {MockCrypto.map((item, index) => {
                        return (
                            <div
                                style={
                                    show
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                }
                                key={index}
                            >
                                <CryptoCard
                                    name={item.name}
                                    price={item.current_price}
                                    img={item.image}
                                    percent={item.ath_change_percentage}
                                    cryptoList={MockCrypto}
                                />
                            </div>
                        );
                    })}
                </AnotherWrapper>
            </ContentWrapper>
        </>
    );
};

export default Discover;
