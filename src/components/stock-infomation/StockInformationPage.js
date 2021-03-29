import React, { useState, useEffect, useContext } from 'react';
import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
// import { Link } from 'react-router-dom';
import 'firebase/database';
// import { AuthUserContext } from '../session/index';
// import firebase from '../firebase/firebase'
import { FirebaseContext } from '../firebase/context'
import BackButton from '../shared/button/back-button/BackButton'

import { setFollowing, setCurrency, setStocks } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { ContentWrapper, WatchStockButton } from './StockInfromationElements';

const StockInformationPage = () => {
    // const [userData, setUserData] = useState(null)
    const [checked, setChecked] = useState(false);
    const [buy, setBuy] = useState(false);
    const [sell, setSell] = useState(false);
    const [holding, setHolding] = useState(0);
    const [numOfStocks, setNumOfStocks] = useState(0);
    const [clickedStock, setClickedStock] = useState({});
    const [stockIncludes, setStockIncludes] = useState(false)
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
            if(!data) return;
            data.forEach((item) => {
                if (item.symbol === chosenShare[0].symbol) {
                    setChecked(true);
                } else if (!item.symbol === chosenShare[0].symbol) {
                    setChecked(false);
                }
            });
        })
        checkHolding();

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
    const checkHolding = () => {
        let dataDB;
        firebase.user(user.uid).child('/possessionStocks/array').on('value', (snapshot) => {
            dataDB = snapshot.val()
            if(dataDB === undefined) return
            for(let i = 0; i < dataDB.length; i++){
                if(dataDB[i].symbol === chosenShare[0].symbol){
                    setClickedStock(dataDB[i])
                    setHolding(dataDB[i].amount)
                }
            }
        })
    };
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

    // const addToRecentlyBought = ({objc}) => {
    //     // let array;
    //     // let recentlyBought = firebase.db.ref('organizations/' + user.organization + '/recentlyBought/');
    //     // recentlyBought.on('value', (snapshot) => {
    //     //     array = snapshot.val()
    //     //     console.log(array)
    //     // })
    //     firebase.db.ref('organizations/' + user.organization + '/recentlyBought').update({
    //         objc,
    //     });
    // }

    //*When we buy a stock
    let stockIncludesVar = false
    const onBuy = (numOfStocks) => {
        if (buy === false) {
            setBuy(true);
            setSell(false);
        } else if (buy === true && numOfStocks !== 0) {
            let array;
            firebase.user(user.uid).child('/possessionStocks/array').on('value', (snapshot) => {
                array = snapshot.val()
            })
            let currency = snapshotFirebase('/currency/currency')
            // firebase.user(user.uid).child('/currency/currency').on('value', (snapshot) => {
            //     currency = snapshot.val()
            // })
            

                if(array == null) return
                let newCurrency;
                if(chosenShare[0].regularMarketPrice) {
                    newCurrency =
                    currency - chosenShare[0].regularMarketPrice * numOfStocks;
                } else if(chosenShare[0].price) {
                    newCurrency =
                    currency - chosenShare[0].price * numOfStocks;
                }

                if (newCurrency <= 0) {
                    alert('Insufficient funds')
                    return;
                }
                checkIfStockIncludes(array, chosenShare[0].symbol, numOfStocks)

                dispatch(setCurrency(newCurrency));
                let currencyFixed = newCurrency.toFixed(2)
                let currencyNumber = parseInt(currencyFixed)
                const recentlyBoughtObjc = {
                    amount: numOfStocks,
                    symbol: chosenShare[0].symbol ? chosenShare[0].symbol : '',
                    user: user.username
                }

            updateUserCurrency(user.uid, currencyNumber, false);
            if(stockIncludesVar == false ){
                let amountOfStocks = parseInt(numOfStocks)
                let percent = parseInt(chosenShare[0].regularMarketChangePercent ? chosenShare[0].regularMarketChangePercent : chosenShare[0].regMarketChangePercent)
                let price = parseInt(chosenShare[0].regularMarketPrice ? chosenShare[0].regularMarketPrice : chosenShare[0].price)
                const stockObj = {
                    name: chosenShare[0].shortName ? chosenShare[0].shortName : chosenShare[0].name,
                    symbol: chosenShare[0].symbol ? chosenShare[0].symbol : '',
                    price: price,
                    amount: amountOfStocks,
                    region: chosenShare[0].region,
                    regMarketChangePercent: percent
                }
                array.push(stockObj)
                updateUserDB(user.uid, array, '/possessionStocks', false )
                if(user.organization){
                    updateUserDB(user.uid, array, '/possessionStocks', true )
                    updateUserCurrency(user.uid, currencyNumber, true);
                }
            } else if(stockIncludesVar == true) {
                updateUserDB(user.uid, array, '/possessionStocks', false )
                if(user.organization){
                    updateUserDB(user.uid, array, '/possessionStocks', true )
                    updateUserCurrency(user.uid, currencyNumber, true);
                }
            }

            
            // addToRecentlyBought(recentlyBoughtObjc)
            // checkHolding()
            setNumOfStocks(0);
            setBuy(false);
            setStockIncludes(false)
            
        }
    };

    const checkIfStockIncludes = (arr, symbol, num) => {
        stockIncludesVar = false;
        for(let i = 0; i < arr.length; i++){
            if(arr[i].symbol == symbol) {
                stockIncludesVar = true
                let index = arr.findIndex(x => x.symbol == symbol)
                console.log(index)
                let number = parseInt(num)
                let newNumber = arr[index].amount += number
                arr[index].amount = newNumber
                i = arr.length;
                return;
            } else {
                stockIncludesVar = false
            }
            console.log(stockIncludes)
        }
    }

    const sellStockFB = (arr, symbol, num) => {
        for(let i = 0; i < arr.length; i++){
            if(arr[i].symbol == symbol) {
                let index = arr.findIndex(x => x.symbol == symbol)
                let number = parseInt(num)
                let newNumber = arr[index].amount -= number
                if(newNumber <= 0){
                    arr.splice(index, 1)
                } else {
                    arr[index].amount = newNumber
                }
                return;
            }
        }
    }


    const snapshotFirebase = (directory) => {
        let dataDB;
        firebase.user(user.uid).child(directory).on('value', (snapshot) => {
            dataDB = snapshot.val()
            
        })
        return dataDB;
    }

    //*When we sell a stock
    const onSell = (numOfStocks) => {
        if (sell === false) {
            setSell(true);
            setBuy(false);
        } else if (sell === true) {
            let snapshot = snapshotFirebase('/possessionStocks/array')
            let currency = snapshotFirebase('/currency/currency')

            if (numOfStocks > holding || numOfStocks <= -1) {
                console.log('You cant sell more than you have');
                return;
            }

                let newCurrency;
                if(chosenShare[0].regularMarketPrice) {
                    newCurrency = currency + chosenShare[0].regularMarketPrice * numOfStocks;
                } else if(chosenShare[0].price) {
                    newCurrency = currency + chosenShare[0].price * numOfStocks;
                }
                sellStockFB(snapshot, chosenShare[0].symbol, numOfStocks)
                updateUserCurrency(user.uid, newCurrency, false);
                updateUserDB(user.uid, snapshot, '/possessionStocks', false )
                if(user.organization){
                    updateUserDB(user.uid, snapshot, '/possessionStocks', true )
                    updateUserCurrency(user.uid, newCurrency, true);
                }
            // checkHolding()
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
            <BackButton />
            {chosenShare.map((item, index) => {
                return (
                    <div className="stockinfo-map-wrapper" key={index}>
                        <h1>{item.shortName ? item.shortName : item.name}</h1>
                        <div className="chart-topbar-wrapper">
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
                        <div className="buttonWrapper">
                            <button
                                className="buy-sell-btn"
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
                                className="buy-sell-btn"
                                style={{ backgroundColor: 'red' }}
                                onClick={onButtonClick}
                            >
                                SELL
                            </button>
                        </div>
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
                            <p className="holds-in-share">Your holding in this share is: {clickedStock.amount ? clickedStock.amount : 0}</p>
                        </div>
                    </div>
                );
            })}
        </ContentWrapper>
    );
};

export default StockInformationPage;
