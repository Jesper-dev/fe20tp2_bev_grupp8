import React, { useEffect, useState } from 'react';
import axios from 'axios';

import CryptoCard from '../card/crypto-card/CryptoCard';
import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

import { ContentWrapper } from './CustomComponentsElements';

const WatchingCrypto = ({ cryptoList }) => {
    let LabelsArr = ['icon', 'name', 'price', 'change 24h ▾', 'info'];
    const [cryptoData, setCryptoData] = useState(null);
    const [loading, setLoading] = useState(true);

    let cryptoIds = '';

    const createCryptoArray = (data) => {
        let cryptoDataArray = [];
        for (let i = 0; i < cryptoList.length; i++) {
            if (cryptoList[i].name == 'lets-vest-Cry') continue;
            data[cryptoList[i].name]['name'] = cryptoList[i].name;
            data[cryptoList[i].name]['image'] = cryptoList[i].image;
        }
        for (const key in data) {
            cryptoDataArray.push({ ...data[key] });
        }
        console.log(cryptoDataArray);
    };

    const createCryptoIdList = (cryptoList) => {
        for (let i = 0; i < cryptoList.length; i++) {
            if (cryptoList[i].name == 'lets-vest-Cry') continue;
            cryptoIds += cryptoList[i].name + ',';
        }
    };

    useEffect(() => {
        console.log(cryptoList);
        /*     cryptoList.forEach((item) => {
            if (item.name == 'lets-vest-Cry') return;
            cryptoIds += item.name + ',';
        }); */

        createCryptoIdList(cryptoList);

        console.log(cryptoIds);

        if (cryptoIds) {
            (async () => {
                await axios
                    .get(
                        `https://api.coingecko.com/api/v3/simple/price?ids=${cryptoIds}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                    )
                    .then((response) => {
                        setCryptoData(response.data);
                        createCryptoArray(response.data);
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })();
        }

        return () => {};
    }, [cryptoList]);

    return (
        <ContentWrapper>
            <h3>Watching Cryptocurrencies</h3>
            <SectionDataIndicator LabelsArr={LabelsArr} />
            {cryptoList.map((item, index) => {
                return (
                    <CryptoCard
                        key={index}
                        img={item.image}
                        name={item.name}
                        price={item.regularMarketPrice}
                        percent={item.regularMarketChangePercent}
                    />
                );
            })}
        </ContentWrapper>
    );
};

export default WatchingCrypto;
