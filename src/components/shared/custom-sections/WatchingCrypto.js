import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import CryptoCard from '../card/crypto-card/CryptoCard';
import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';
import { fetchUserSnapshotArray } from '../functions/firebase-functions';

import { FirebaseContext } from '../../firebase/context';

import { ContentWrapper } from './CustomComponentsElements';

const WatchingCrypto = ({ cryptoList, gap }) => {
    let LabelsArr = ['icon', 'name', 'price', 'change 24h ▾', 'info'];
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [cryptoData, setCryptoData] = useState(null);
    const [loading, setLoading] = useState(false);
    // const [num, setNum] = useState(0);
    const [watching, setWatching] = useState([]);
    const [listTwo, setListTwo] = useState([]);
    const FollowingCrypto = useSelector((state) => state.FollowingCrypto);

    let cryptoIds = '';
    let num = 0;

    useEffect(() => {
    //     console.log(watching)
        loadCryptos()
    //     setListTwo(list)
    //     console.log(list)
            
        //  (async () => {
        //         await axios
        //             .get(
        //                 `https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
        //             )
        //             .then((response) => {
        //                 setCryptoData(response.data);
        //             console.log('hey')
        //                 setLoading(false);
        //             })
        //             .catch((error) => {
        //                 console.error(error);
        //             });
        //     })();
        // return () => {
        //     setLoading(false)
        // }
    }, []);

    const loadCryptos = () => {
        firebase.user(user.uid).child('/followingCrypto').once('value', (snapshot) => {
            const data = snapshot.val()
            console.log(data)
            let arr = []
            let newList = []
            for (const key in data) {
                arr.push({ ...data[key] });
            }
            if(arr.length == num) {
                num += 0
            }
            let list = arr;
            num += 2
            
            console.log(arr)
            console.log(num)

            newList = list.splice(0, num);
            console.log(newList)
            setWatching(newList)
        })
        
    };



    const createCryptoIdList = (cryptoList) => {
        for (let i = 0; i < cryptoList.length; i++) {
            if (cryptoList[i].name == 'lets-vest-Cry') continue;
            /*      setCryptoListIDs(cryptoListIDs + cryptoList[i].name + ',') */
        }
    };

    return (
        <ContentWrapper gap={gap}>
            <h3>Watching Cryptocurrencies </h3>
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
            <button onClick={() => loadCryptos()}>Show more</button>
        </ContentWrapper>
    );
};

export default WatchingCrypto;
