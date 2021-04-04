import React, { useEffect, useContext, useState } from 'react';
import CryptoCard from '../../../shared/card/crypto-card/CryptoCard';
import { ContentWrapper } from './PossessionElements';
import { FirebaseContext } from '../../../firebase/context';

const PossessionCrypto = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [cryptoPossesionState, setCryptoPossesionState] = useState([]);

    useEffect(() => {
        let possessioList = [];
        firebase
            .user(user.uid)
            .child('/possessionCrypto')
            .on('value', (snapshot) => {
                const possessionData = snapshot.val();
                if (!possessionData) return;
                for (const key in possessionData) {
                    possessioList.push({ ...possessionData[key] });
                }
                setCryptoPossesionState(possessioList);
            });
    }, [firebase, user.uid]);

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
