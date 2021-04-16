import { useEffect, useState, useContext } from 'react';
import axios from 'axios';

import { setFetchedCryptos, setTotalCrypto } from '../../redux/actions';
import { useDispatch } from 'react-redux';
import { FirebaseContext } from '../../components/firebase/context';
import { fetchUserSnapshotArray } from '../../components/shared/functions/firebase-functions';

const FetchUserCrypto = () => {
    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));
    const dispatch = useDispatch();

    const [cryptoData, setCryptoData] = useState(null);

    const getRandomInt = (max) => {
        return Math.floor(Math.random() * max);
    };

    const CalcCrypto = (cryptoDataProp, cryptoPosArr) => {
        let cryptoDataArray = [];

        for (let i = 0; i < cryptoPosArr.length; i++) {
            if (cryptoPosArr[i].name == 'lets-vest-CrY') continue;
            cryptoDataProp[cryptoPosArr[i].name]['amount'] =
                cryptoPosArr[i].amount;
            cryptoDataProp[cryptoPosArr[i].name]['name'] = cryptoPosArr[i].name;
            cryptoDataProp[cryptoPosArr[i].name]['image'] =
                cryptoPosArr[i].image;
     /*        cryptoDataProp[cryptoPosArr[i].id]['id'] =
                cryptoPosArr[i].id; */
        }

        for (const key in cryptoDataProp) {
            cryptoDataArray.push({ ...cryptoDataProp[key] });
        }
        let letsVestObj = {
            image: 'LV-CrY',
            name: 'lets-vest-CrY',
            usd: getRandomInt(350),
            usd_24h_change: getRandomInt(100),
            amount: 1,
        };

        cryptoDataArray.unshift(letsVestObj);

        let totalCryptoValue = 0;

        for (let i = 0; i < cryptoDataArray.length; i++) {
            totalCryptoValue =
                totalCryptoValue +
                cryptoDataArray[i].amount * cryptoDataArray[i].usd;
        }

        dispatch(setFetchedCryptos(cryptoDataArray));

        dispatch(setTotalCrypto(totalCryptoValue.toFixed(2)));
    };

    useEffect(() => {
        fetchUserSnapshotArray(
            firebase,
            user.uid,
            '/possessionCrypto',
            setCryptoData
        );
    }, []);

    useEffect(() => {
        if (!cryptoData) return;
        let ids = '';

        cryptoData.forEach((item) => {
            if (item.name == 'lets-vest-CrY') return;
            ids += item.name + ',';
        });

        const cryptoCall = () => {
            (async () => {
                await axios
                    .get(
                        `https://api.coingecko.com/api/v3/simple/price?ids=${ids}&vs_currencies=usd&include_market_cap=true&include_24hr_vol=true&include_24hr_change=true&include_last_updated_at=true`
                    )
                    .then((response) => {
                        CalcCrypto(response.data, cryptoData);
                    })
                    .catch((error) => {
                        console.error(error);
                    });
            })();
        };
        cryptoCall();
    }, [cryptoData]);

    return null;
};

export default FetchUserCrypto;
