import React, { useState, useEffect } from 'react'
import axios from 'axios'

import MockCrypto from '../../../api/Mock/MockCrypto.json';

import CryptoCard from '../../shared/card/crypto-card/CryptoCard';

import { CryptoListElement } from './DiscoverCryptoListElements'

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
        <CryptoListElement>
            <h1>Cryptocurrencies</h1>
            {cryptoApi.length ? cryptoApi.map((item, index) => {
                return (
                    <CryptoCard
                        key={index}
                        name={item.name}
                        id={item.id}
                        price={item.current_price}
                        img={item.image}
                        symbol={item.symbol}
                        percent={item.price_change_percentage_24h}
                        cryptoList={MockCrypto}
                    />
                );
            }) : <p>Loading...</p>}
        </CryptoListElement>
    );

}

export default DiscoverCryptoList
