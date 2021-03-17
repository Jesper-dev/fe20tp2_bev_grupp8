import React from 'react';
import StockCard from '../card/stock-card/StockCard';
import CryptoCard from '../card/crypto-card/CryptoCard';

import { ContentWrapper } from './HomepageComponentsElements';
import MockCrypto from '../../../api/Mock/MockCrypto.json';
import { useSelector } from 'react-redux';

const FollowingHome = ({ array, cryptoList }) => {
    const SeeFollowingRedux = useSelector((state) => state.SeeFollowing);
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
                <p>
                    {array.length === 0 && cryptoList.length === 0
                        ? 'You are not following any stocks or crypto currency at the moment! Use the discover page to find stocks and crypto currency of your interest'
                        : ''}
                </p>
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
                            name={item.name}
                            price={item.current_price}
                            percent={item.price_change_percentage_24h}
                        />
                    );
                })}
            </ContentWrapper>
        </>
    );
};

export default FollowingHome;
