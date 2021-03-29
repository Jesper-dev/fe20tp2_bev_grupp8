import React,{ useState, useEffect } from 'react'
import axios from 'axios'

import MockCrypto from '../../../api/Mock/MockCrypto.json';

import CryptoCard from '../../shared/card/crypto-card/CryptoCard';

import { ContentWrapper } from './DiscoverCryptoListElements'

const DiscoverCryptoList = () => {
        const [cryptoApi, setCryptoApi] = useState([]);

        useEffect(() => {
            const getCryptoInfo = async () => {
                await axios
                    .get(
                        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false'
                    )
                    .then((res) => setCryptoApi(res.data))
                    .catch((err) => console.log(err));
            };
            getCryptoInfo();

            return () => {
                setCryptoApi([]);
            };
        }, []);
    return (
        <>
            <ContentWrapper>
                <header>
                    <h1>cryptocurrency</h1>
                </header>
                {cryptoApi.map((item, index) => {
                    return (
                        <CryptoCard
                            key={index}
                            name={item.name}
                            price={item.current_price}
                            img={item.image}
                            percent={item.price_change_percentage_24h}
                            cryptoList={MockCrypto}
                        />
                    );
                })}
            </ContentWrapper>
        </>
    );

}

export default DiscoverCryptoList
