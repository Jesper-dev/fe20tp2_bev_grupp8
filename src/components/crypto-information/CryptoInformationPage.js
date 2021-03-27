import React, { useState, useEffect, useContext } from 'react';
// import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import CryptoChart from './crypto-chart/CryptoChart'

import axios from 'axios'

import { setFollowingCrypto } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { ContentWrapper } from './CryptoInformationPageElements';
import { FirebaseContext } from '../firebase/context';

let following = [];

const CryptoInformationPage = () => {
    const [checked, setChecked] = useState(false);
    const dispatch = useDispatch();
    const chosenCrypto = useSelector((state) => state.ChosenCrypto);
    const followingArr = useSelector((state) => state.FollowingCrypto);

    const firebase = useContext(FirebaseContext);

    useEffect(() => {
        let followingDB = firebase.db.ref('users/' + user.uid + '/followingCrypto/array')
        followingDB.on('value', (snapshot) => {
            const data = snapshot.val()
            console.log(data)

            if(!data) return;
            data.forEach((item) => {
                // if(!item || !item.symbol) return
                if (item.symbol === chosenCrypto[0].symbol) {
                    setChecked(true);
                } else if (!item.symbol === chosenCrypto[0].symbol) {
                    setChecked(false);
                }
            });
        })
    }, []);

    const user = JSON.parse(localStorage.getItem('authUser'));

    const updateUser = (userId) => {
        firebase.db.ref('users/' + userId + '/followingStocks').set({
            followingArr,
        });
    };

    const updateUserDB = (userId, array, directory, org) => {
        if(org == true){
            firebase.db.ref('organizations/' + user.organization + '/users/' + userId + directory).set({
                array,
            });
        } else {
            firebase.db.ref('users/' + userId + directory).set({
                array,
            });
        }

    }

    const onFollow = () => {
        let cryptos = firebase.db.ref('users/' + user.uid + '/followingCrypto/array');
        let followingDb;
        cryptos.on('value', (snapshot) => {
            followingDb = snapshot.val();
        });
        if (followingDb === null) {
            return;
        }
        let name = chosenCrypto[0].symbol;
        let index = followingDb.findIndex((x) => x.symbol === name);
        if (index > -1) {
            followingDb.splice(index, 1);
            setChecked(false);
        } else {
            const followingObj = {
                symbol: chosenCrypto[0].symbol,
                regularMarketPrice: chosenCrypto[0].current_price,
                regularMarketChangePercent: chosenCrypto[0].price_change_percentage_24h,
                shortName: chosenCrypto[0].name,
                image: chosenCrypto[0].image
            };
            followingDb.push(followingObj);
            setChecked(true);
        }
        updateUserDB(user.uid, followingDb, '/followingCrypto', false)
        if(user.organization) {
            updateUserDB(user.uid, followingDb, '/followingCrypto', true)
        }
        dispatch(setFollowingCrypto(followingDb));
        setChecked(true);

    };
    const onChange = (e) => {
        setChecked(!checked);
    };

    return (
        <ContentWrapper>
            <CryptoChart
                id={chosenCrypto[0] ? chosenCrypto[0].id : 'bitcoin'}
                img={chosenCrypto[0] ? chosenCrypto[0].image : ''}
                name={chosenCrypto[0] ? chosenCrypto[0].name : ''}
            />
            {chosenCrypto.map((item, index) => {
                return (
                    <div key={index}>
                        {/* <h1>{item.name}</h1>
                        <div className="imgWrapper">
                            <img src={item.image} alt="logo of the crypto" />
                        </div> */}
                        <div className="followWrapper">
                            <label> watch </label>
                            <input
                                type="checkbox"
                                onClick={onFollow}
                                checked={checked}
                                onChange={onChange}
                            />
                        </div>
                        <p>Current Price: {item.current_price.toLocaleString()}$</p>
                        <p>
                            Total Volume: {item.total_volume.toLocaleString()}
                        </p>
                        <p>
                            Price Change 24h:{' '}
                            {item.price_change_percentage_24h.toFixed(2)}%
                        </p>
                        <p>
                            Total Supply:{' '}
                            {item.total_supply
                                ? item.total_supply.toLocaleString()
                                : 0}
                        </p>
                        <p>Market Cap Rank: {item.market_cap_rank}</p>
                    </div>
                );
            })}
        </ContentWrapper>
    );
};

export default CryptoInformationPage;
