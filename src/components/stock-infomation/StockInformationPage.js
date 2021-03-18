import React, { useState, useEffect, useContext } from 'react';
import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import 'firebase/database';
// import { AuthUserContext } from '../session/index';
// import firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase/context';

import { setFollowing, setCurrency, setStocks } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { ContentWrapper, WatchStockButton } from './StockInfromationElements';
let holdingArray = [];

const StockInformationPage = () => {
    // const [userData, setUserData] = useState(null)
    const [checked, setChecked] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [holding, setHolding] = useState(0);
    const [numOfStocks, setNumOfStocks] = useState(0);
    //*Redux stuff :)
    const dispatch = useDispatch();
    const chosenShare = useSelector((state) => state.ChosenShare);
    const followingArr = useSelector((state) => state.Following);
    const Currency = useSelector((state) => state.Currency);
    const Stocks = useSelector((state) => state.Stocks);

    const firebase = useContext(FirebaseContext);

    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        followingArr.forEach((item) => {
            if (item.symbol === chosenShare[0].symbol) {
                setChecked(true);
            } else if (!item.symbol === chosenShare[0].symbol) {
                setChecked(false);
            }
        });

        holdingArray = [];
        checkHolding();
    }, []);

    const updateUser = (userId, array) => {
        firebase.db.ref('users/' + userId + '/followingStocks').set({
            array,
        });
    };

    const updateUserCurrency = (userId, currency) => {
        firebase.db.ref('users/' + userId + '/currency').set({
            currency,
        });
    };

    const checkHolding = () => {
        if (Stocks.includes(chosenShare[0])) {
            for (let i = 0; i < Stocks.length; i++) {
                if (Stocks[i].symbol === chosenShare[0].symbol) {
                    holdingArray.push(i);
                }
            }
            setHolding(holdingArray.length);
        }
    };

    const onFollow = () => {
        let stocks = firebase.db.ref(
            'users/' + user.uid + '/followingStocks/array'
        );
        let followingDb;
        stocks.on('value', (snapshot) => {
            followingDb = snapshot.val();
        });

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
                regularMarketChangePercent:
                    chosenShare[0].regularMarketChangePercent,
                shortName: chosenShare[0].shortName,
            };
            followingDb.push(followingObj);
            setChecked(true);
        }

        updateUser(user.uid, followingDb);
        dispatch(setFollowing(followingDb));
    };

    const onChange = () => setChecked(!checked);

    //*Function for when we buy a share
    const onBuy = (numOfStocks) => {
        if (buy === false) {
            setBuy(true);
            setSell(false);
        } else if (buy === true) {
            let newCurrency =
                Currency - chosenShare[0].regularMarketPrice * numOfStocks;
            if (newCurrency <= 0) {
                console.log('Insufficient funds');
                return;
            }
            dispatch(setCurrency(newCurrency));
            for (let i = 0; i < numOfStocks; i++) {
                Stocks.push(chosenShare[0]);
            }
            updateUserCurrency(user.uid, newCurrency);
            dispatch(setStocks(Stocks));
            setBuy(false);
            setNumOfStocks(0);
        }
    };

    const onSell = (numOfStocks) => {
        if (sell === false) {
            setSell(true);
            setBuy(false);
        } else if (sell === true) {
            if (numOfStocks > holding) {
                console.log('You cant sell more than you have');
                return;
            }
            if (Stocks.includes(chosenShare[0])) {
                for (let i = 0; i < numOfStocks; i++) {
                    let newCurrency =
                        Currency +
                        chosenShare[0].regularMarketPrice * numOfStocks;
                    dispatch(setCurrency(newCurrency));
                    let symbol = chosenShare[0].symbol;
                    let index = Stocks.findIndex((x) => x.symbol === symbol);
                    Stocks.splice(index, 1);
                    dispatch(setStocks(Stocks));
                }
            }
            setSell(false);
        }
    };

    const onButtonClick = (e) => {
        if (e.target.innerText === 'BUY') {
            onBuy(numOfStocks);
        } else if (e.target.innerText === 'SELL') {
            onSell(numOfStocks);
        }
    };

    return (
        <ContentWrapper>
            {chosenShare.map((item, index) => {
                return (
                    <div key={index}>
                        <h1>{item.shortName}</h1>
                        <div className="followWrapper">
                            <label>watch</label>
                            <WatchStockButton
                                eyecolor={
                                    checked
                                        ? 'var(--secondary)'
                                        : 'var(--body-fourth)'
                                }
                                onClick={onFollow}
                                /* checked={checked} */
                                onChange={onChange}
                            >
                                <i className="far fa-eye"></i>
                            </WatchStockButton>
                            {/*      <input
                                type="checkbox"
                                onClick={onFollow}
                                checked={checked}
                                onChange={onChange}
                            /> */}
                        </div>
                        <LineChart />
                        <div className="buttonWrapper">
                            <button
                                style={{ backgroundColor: 'green' }}
                                onClick={onButtonClick}
                            >
                                BUY
                            </button>

                            <input
                                type="number"
                                style={
                                    buy
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                }
                                onChange={(e) => setNumOfStocks(e.target.value)}
                            />
                            <input
                                type="number"
                                style={
                                    sell
                                        ? { display: 'block' }
                                        : { display: 'none' }
                                }
                                onChange={(e) => setNumOfStocks(e.target.value)}
                            />
                            <button
                                style={{ backgroundColor: 'red' }}
                                onClick={onButtonClick}
                            >
                                SELL
                            </button>
                        </div>
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
                        <p>Your holding in this share is: {holding}</p>
                    </div>
                );
            })}
        </ContentWrapper>
    );
};

export default StockInformationPage;
