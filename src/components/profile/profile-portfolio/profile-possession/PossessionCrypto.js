import React from 'react';
import CryptoCard from '../../../shared/card/crypto-card/CryptoCard';
import { ContentWrapper } from './PossessionElements';

const PossessionCrypto = ({ cryptoPossesionState }) => {
    return (
        <>
            <ContentWrapper>
                <h1>Possession cryptocurrencies</h1>
                {cryptoPossesionState.length > 0 ? (
                    cryptoPossesionState.map((item, index) => {
                        return (
                            <CryptoCard
                                key={index}
                                img={item.image}
                                amount={item.amount}
                                name={item.name}
                                percent={item.percent}
                                price={item.price}
                                cost={item.price * item.amount}
                                cryptoList={cryptoPossesionState}
                            />
                        );
                    })
                ) : (
                    <p>Loading...</p>
                )}
            </ContentWrapper>
        </>
    );
};

export default PossessionCrypto;
