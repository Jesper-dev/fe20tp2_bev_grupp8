import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom'
import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
import 'firebase/database';
import { FirebaseContext } from '../firebase/context'
import BackButton from '../shared/button/back-button/BackButton'

import { setFollowing, setCurrency, setStocks } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import {
    ContentWrapper,
    WatchStockButton,
    TradeBtns,
} from './StockInfromationElements';

const StockInformationPage = () => {
    // const [userData, setUserData] = useState(null)
    const [checked, setChecked] = useState(false);
    //*Redux stuff :)
    const dispatch = useDispatch();
    const chosenShare = useSelector((state) => state.ChosenShare);
    const followingArr = useSelector((state) => state.Following);
    const Currency = useSelector((state) => state.Currency);
    const Stocks = useSelector((state) => state.Stocks);

    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        firebase.user(user.uid).child('/followingStocks/array').on('value', (snapshot) => {
            const data = snapshot.val()
            if(!data) return


            data.forEach((item) => {
                if (item.symbol === chosenShare[0].symbol) {
                    setChecked(true);
                } else if (!item.symbol === chosenShare[0].symbol) {
                    setChecked(false);
                }
            });
        })

        return () => {
            // unsubscribe()
        }
    }, []);

    const updateUserCurrency = (userId, currency, org) => {
        if(org == true) {
            firebase.organization(user.organization).child(`${userId}/currency`).update({
                currency
            })
        } else {
            firebase.user(userId).child(`/currency`).update({
                currency
            })
        }
    };

    const updateUserDB = (userId, array, directory, org) => {
        if(org == true){
            firebase.organization(user.organization).child(`${userId}/${directory}`).set({
                array
            })
        } else {
            firebase.user(userId).child(`/${directory}`).set({
                array
            })
        }
    }

    //*Checks the holding of your stock

    //*When you follow a stock
    const onFollow = () => {
        firebase.user(user.uid).child('/followingStocks/array').on('value', (snapshot) => {
            const followingDb = snapshot.val();
            if (followingDb === null) {
                return;
            }
            let name = chosenShare[0].symbol;
            let index = followingDb.findIndex((x) => x.symbol === name);
            if (index > -1) {
                followingDb.splice(index, 1);
                setChecked(false);
            } else {
                const followingObj = {
                    symbol: chosenShare[0].symbol,
                    regularMarketPrice: chosenShare[0].regularMarketPrice,
                    regularMarketChangePercent: chosenShare[0].regularMarketChangePercent,
                    shortName: chosenShare[0].shortName,
                };
                followingDb.push(followingObj);
                setChecked(true);
            }

            updateUserDB(user.uid, followingDb, '/followingStocks', false)
            if(user.organization){
                updateUserDB(user.uid, followingDb, '/followingStocks', true)
            }
            dispatch(setFollowing(followingDb));
        })
    };

    const onChange = () => setChecked(!checked);



    return (
        <ContentWrapper>
            <BackButton />
            {chosenShare.map((item, index) => {
                return (
                    <div className="stockinfo-map-wrapper" key={index}>
                        <h1>{item.shortName ? item.shortName : item.name}</h1>
                        <div className="chart-topbar-wrapper">
                            <TradeBtns to="/trade">BUY</TradeBtns>
                            <TradeBtns to="/trade">SELL</TradeBtns>
                            <WatchStockButton
                                eyecolor={
                                    checked
                                        ? 'var(--secondary)'
                                        : 'var(--body-fourth)'
                                }
                                onClick={onFollow}
                                onChange={onChange}
                            >
                                <i className="far fa-eye"></i>
                            </WatchStockButton>
                        </div>

                        <LineChart />

                        <div className="informationContainer">
                            <p>{item.symbol}</p>
                            <p>
                                Market price:{' '}
                                {item.regularMarketPrice
                                    ? item.regularMarketPrice
                                    : 200}{' '}
                                $
                            </p>
                            <p>
                                Reg market change:{' '}
                                {item.regularMarketChange
                                    ? item.regularMarketChange.toFixed(2)
                                    : 200}
                                %
                            </p>
                            <p>
                                Market change percent:{' '}
                                {item.regularMarketChangePercent
                                    ? item.regularMarketChangePercent.toFixed(2)
                                    : 2}
                                %
                            </p>
                            {/*      <p className="holds-in-share">Your holding in this share is: {clickedStock.amount ? clickedStock.amount : 0}</p> */}
                        </div>
                    </div>
                );
            })}
        </ContentWrapper>
    );
};

export default StockInformationPage;
