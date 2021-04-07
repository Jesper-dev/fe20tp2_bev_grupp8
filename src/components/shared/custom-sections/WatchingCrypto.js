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

    /*     const [cryptoIds, setCryptoIds] = useState(''); */
    let followingCryptoList = [];

    const FollowingCrypto = useSelector((state) => state.FollowingCrypto);

    let cryptoIds = '';

    /*     const getFollowInfo = (dir, arr) => {
        firebase
            .user(user.uid)
            .child(dir)
            .once('value', (snapshot) => {
                let data = snapshot.val();
                for (const key in data) {
                    arr.push({ ...data[key] });
                }
                return arr;
            });
    }; */

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
            /*  setCryptoIds(cryptoIds + cryptoList[i].name + ','); */
            cryptoIds += cryptoList[i].name + ',';
        }
    };

    useEffect(() => {
        /*         getFollowInfo('/followingCrypto', followingCryptoList); */

        console.log(FollowingCrypto);
        /*     cryptoList.forEach((item) => {
            if (item.name == 'lets-vest-Cry') return;
            cryptoIds += item.name + ',';
        }); */

        createCryptoIdList(FollowingCrypto);

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
    }, [FollowingCrypto]);

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
