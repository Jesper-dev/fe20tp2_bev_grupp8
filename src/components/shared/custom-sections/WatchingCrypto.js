import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

import CryptoCard from '../card/crypto-card/CryptoCard';
import SectionDataIndicator from '../card/section-data-indicator/SectionDataIndicator';
import { fetchUserSnapshotArray } from '../functions/firebase-functions';

import { FirebaseContext } from '../../firebase/context';

import { GenericVestBtn } from '../button/ButtonElements'

import { ContentWrapper } from './CustomComponentsElements';

const WatchingCrypto = ({ cryptoList, gap }) => {
    let LabelsArr = ['icon', 'name', 'price', 'change 24h ▾', 'info'];
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const [cryptoData, setCryptoData] = useState(null);
    const [loadmore, setLoadmore] = useState(true);
    const [watching, setWatching] = useState([]);
    const [initArr, setInitArr] = useState([]);
    const [firstArr, setFirstArr] = useState([]);
    const [list, setList] = useState([]);
    const FollowingCrypto = useSelector((state) => state.FollowingCrypto);

    useEffect(() => {
    loadCryptosInit()

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

    const loadCryptosInit = () => {

        firebase.user(user.uid).child('/followingCrypto').once('value', (snapshot) => {
            const data = snapshot.val()
            if(!data) return;
            let arr = []
            let newList = []
            for (const key in data) {
                arr.push({ ...data[key] });
            }
            if(arr.length == 1 || arr.length == 2) {
                for(let i = 0; i < 1; i++) {
                    newList.push(arr[i])

                }
                setInitArr(newList)
                setWatching(newList)
                setFirstArr(newList)
                return;
            }
            setInitArr(arr)
            for(let i = 0; i < 3; i++) {
                newList.push(arr[i])
            }
            setWatching(newList)
            setFirstArr(newList)
        })
    };

    const loadCryptos = (init, first) => {

        let newList = []
        if(loadmore == true) {
            setWatching(init)
        } else {
            setWatching(first)
        }
        console.log(newList)
        setLoadmore(!loadmore)


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
            {watching.map((item, index) => {
                return (
                    <CryptoCard
                        key={index}
                        img={item.image}
                        id={item.id}
                        name={item.name}
                        price={item.regularMarketPrice}
                        percent={item.regularMarketChangePercent}
                    />
                );
            })}
            <GenericVestBtn
            onClick={() => loadCryptos(initArr, firstArr)}
            pad='8px'
            border='1px solid black'
            br='10px'
            bg='var(---clr-primary)'
            co='var(---clr-secondary)'
            wid='10%'
            fz='0.9rem'
            >
                {loadmore ? 'Show more' : 'Show Less'}
            </GenericVestBtn>
        </ContentWrapper>
    );
};

export default WatchingCrypto;
