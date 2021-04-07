import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import CryptoCard from '../card/crypto-card/CryptoCard';
import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';

import { ContentWrapper } from './CustomComponentsElements';

const WatchingCrypto = ({ cryptoList }) => {
    let LabelsArr = ['icon', 'name', 'price', 'change 24h ▾', 'info'];

    const [cryptoData, setCryptoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const FollowingCrypto = useSelector((state) => state.FollowingCrypto);

    let cryptoIds = '';

    const createCryptoIdList = (cryptoList) => {
        for (let i = 0; i < cryptoList.length; i++) {
            if (cryptoList[i].name == 'lets-vest-Cry') continue;
     /*      setCryptoListIDs(cryptoListIDs + cryptoList[i].name + ',') */
        }
    };
/*
    useEffect(() => {
         (async () => {
                await axios
                    .get(
                        `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                    )
                    .then((response) => {
                        setCryptoData(response.data);
                    console.log('hey')
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })();
    }, [cryptoList]) */


useEffect(() => {
      if (!FollowingCrypto || cryptoList) return;

      console.log(FollowingCrypto)
      console.log(cryptoList)

        FollowingCrypto.forEach((item) => {
            if (item.name == 'lets-vest-CrY') return;
            cryptoIds += item.name + ',';
        });
        return () => {

    }
}, [FollowingCrypto, cryptoList])





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
