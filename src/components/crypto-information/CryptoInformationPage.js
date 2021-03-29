import React, { useState, useEffect, useContext } from 'react';
// import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';

import CryptoChart from './crypto-chart/CryptoChart'

import axios from 'axios' // remove?

import { setFollowingCrypto } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { ContentWrapper } from './CryptoInformationPageElements';
import { FirebaseContext } from '../firebase/context';

//let following = []; // remove?

const CryptoInformationPage = () => {
    const [checked, setChecked] = useState(false);//remove?
    const dispatch = useDispatch();
    const chosenCrypto = useSelector((state) => state.ChosenCrypto);
    const followingArr = useSelector((state) => state.FollowingCrypto); //remove?

    const firebase = useContext(FirebaseContext);
// check out https://stackoverflow.com/a/60029676/12683933
// use the unsubscribe pattern
/*
users : { jfdslkfjdslkjf: {
    followingCrypto: {
        'uni': {
            regularMarketPrice: 34
        },
        'flow': {
            regularMarketPrice: 29
        }
    }
}}
se sid 141&142 i boken firebasepdf

*/


useEffect(() => {
        /*
        let followingDB = firebase.db.ref('users/' + user.uid + '/followingCrypto/array')
        followingDB.on('value', (snapshot) => {
           */
          firebase.user(user.uid).child('/followingCrypto/array').on('value', (snapshot) => {
           
            const data = snapshot.val()
            console.log(data)

            if(!data) return;


            //re-write this function
            data.forEach((item) => {
                // if(!item || !item.symbol) return
                if (item.symbol === chosenCrypto[0].symbol) {
                    setChecked(true);
                    return
                } else if (!item.symbol === chosenCrypto[0].symbol) {
                    setChecked(false);
                }
            });
        })
    }, []);

    const user = JSON.parse(localStorage.getItem('authUser'));

    const updateUserDB = (userId, array, directory, org) => {
        if(org === true){ //changed! == to ===
            firebase.organization(user.organization).child(`${userId}/${directory}`).set({
                array
            })
        } else {
            firebase.user(userId).child(`${directory}`).set({
                array
            })
        }

    }

    const onFollow = () => { //todo: fix
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
    const onChange = () => {
        // https://stackoverflow.com/a/55826376/12683933
        //setChecked(!checked);
        setChecked(prevState => !prevState); //changed!
    };

    return (
        <ContentWrapper>
            
            <CryptoChart
                id={chosenCrypto[0] ? chosenCrypto[0].id : 'bitcoin'}
                img={chosenCrypto[0] ? chosenCrypto[0].image : ''}
                name={chosenCrypto[0] ? chosenCrypto[0].name : ''}
                onFollow={onFollow}
                /* onChange={onChange}
                checked={checked} */
            />
            {chosenCrypto.map((item, index) => {
                return (
                    <div className="information-wrapper" key={index}>
                        {/* <h1>{item.name}</h1>
                        <div className="imgWrapper">
                            <img src={item.image} alt="logo of the crypto" />
                        </div> */}
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
