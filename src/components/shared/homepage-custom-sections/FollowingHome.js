import React from 'react';
import StockCard from '../card/stock-card/StockCard';
import CryptoCard from '../card/crypto-card/CryptoCard';

import { ContentWrapper } from './HomepageComponentsElements';
import MockCrypto from '../../../api/Mock/MockCrypto.json';
import { useSelector } from 'react-redux';

const FollowingHome = ({ array, cryptoList }) => {
    const SeeFollowingRedux = useSelector((state) => state.SeeFollowing);
    console.log(cryptoList)

    console.log(array)
    return (
        <>
            <ContentWrapper
                style={
                    SeeFollowingRedux
                        ? { display: 'flex' }
                        : { display: 'none' }
                }
            >
                <h3>Watching</h3>
                {array.length === 0 && cryptoList.length === 0 ? (
                    <p>
                        You are not following any stocks or cryptocurrencies at
                        the moment! Use the Discover page to find stocks and
                        cryptocurrencies of your interest.
                    </p>
                ) : (
                    ''
                )}
                {array.map((item, index) => {
                    return (
                        <StockCard
                            stocksList={array}
                            key={index}
                            name={item.symbol}
                            cost={item.regularMarketPrice}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })}
                {cryptoList.map((item, index) => {
                    return (
                        <CryptoCard
                            cryptoList={MockCrypto}
                            key={index}
                            img={item.image}
                            name={item.shortName}
                            price={item.regularMarketPrice}
                            percent={item.regularMarketChangePercent}
                        />
                    );
                })}
            </ContentWrapper>
        </>
    );
};

export default FollowingHome;
