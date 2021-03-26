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
        let followingDB = firebase.db.ref('users/' + user.uid + '/followingStocks/array')
        followingDB.on('value', (snapshot) => {
            const data = snapshot.val()
            console.log(data)

            if(!data) return;
            data.forEach((item) => {
                // if(!item || !item.symbol) return
                if (item.symbol === chosenShare[0].symbol) {
                    setChecked(true);
                } else if (!item.symbol === chosenShare[0].symbol) {
                    setChecked(false);
                }
            });
        })

        checkHolding();
    }, []);

    const updateUser = (userId, array) => {
        firebase.db.ref('users/' + userId + '/followingStocks').set({
            array,
        });
    };

    const updateUserOrg = (userId, array) => {
        firebase.db.ref('organizations/' + user.organization + '/users/' + userId + '/followingStocks').set({
            array,
        });
    };

    const updateUserCurrency = (userId, currency) => {
        firebase.db.ref('users/' + userId + '/currency').set({
            currency,
        });
    };

    const updateUserPossesion = (userId, array) => {
        firebase.db.ref('users/' + userId + '/possessionStocks').set({
            array,
        });
    };

    const updateUserPossesionOrg = (userId, array) => {
        firebase.db.ref('organizations/' + user.organization + '/users/' + userId + '/possessionStocks').set({
            array,
        });
    };

    const updateUserCurrencyOrg = (userId, currency) => {
        firebase.db.ref('organizations/' + user.organization + '/users/' + userId + '/currency').set({
            currency,
        });
    };

    //*Checks the holding of your stock
    const checkHolding = () => {
        let dataDB;
        let possessionDb = firebase.db.ref('users/' + user.uid + '/possessionStocks/array');
        possessionDb.on('value', (snapshot) => {
            dataDB = snapshot.val()
        })
        if(dataDB === undefined) return
        for(let i = 0; i < dataDB.length; i++){
            if(dataDB[i].symbol === chosenShare[0].symbol){
                setClickedStock(dataDB[i])
                setHolding(dataDB[i].amount)
            }
        }
    };
    //*When you follow a stock
    const onFollow = () => {
        let stocks = firebase.db.ref('users/' + user.uid + '/followingStocks/array');
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
                regularMarketChangePercent: chosenShare[0].regularMarketChangePercent,
                shortName: chosenShare[0].shortName,
            };
            followingDb.push(followingObj);
            setChecked(true);
        }

        updateUser(user.uid, followingDb);
        if(user.organization){
            updateUserOrg(user.uid, followingDb);
        }
        dispatch(setFollowing(followingDb));
    };

    const onChange = () => setChecked(!checked);

    //*When we buy a stock
    //TODO Check if the stock has been bought before and therefore already exist in the array / DB,
    //TODO If true, only add amount on the same stock.
    let stockIncludesVar = false

    const onBuy = (numOfStocks) => {
        if (buy === false) {
            setBuy(true);
            setSell(false);
        } else if (buy === true && numOfStocks !== 0) {
            let array;
            let possessionDb = firebase.db.ref('users/' + user.uid + '/possessionStocks/array');
            possessionDb.on('value', (snapshot) => {
                array = snapshot.val()
            })

            if(array == null) return
            let newCurrency =
                Currency - chosenShare[0].regularMarketPrice * numOfStocks;
            if (newCurrency <= 0) {
                alert('Insufficient funds')
                return;
            }
            checkIfStockIncludes(array, chosenShare[0].symbol, numOfStocks)

            dispatch(setCurrency(newCurrency));
            let currencyFixed = newCurrency.toFixed(2)
            let currencyNumber = parseInt(currencyFixed)

            updateUserCurrency(user.uid, currencyNumber);
            if(stockIncludesVar == false ){
                console.log('Hit kommer vi, false')
                let amountOfStocks = parseInt(numOfStocks)
                let percent = parseInt(chosenShare[0].regularMarketChangePercent)
                let price = parseInt(chosenShare[0].regularMarketPrice)
                const stockObj = {
                    name: chosenShare[0].shortName ? chosenShare[0].shortName : '',
                    symbol: chosenShare[0].symbol ? chosenShare[0].symbol : '',
                    price: price,
                    amount: amountOfStocks,
                    region: chosenShare[0].region,
                    regMarketChangePercent: percent
                }
                array.push(stockObj)
                updateUserPossesion(user.uid, array)
                if(user.organization){
                    updateUserPossesionOrg(user.uid, array)
                    updateUserCurrencyOrg(user.uid, currencyNumber);
                }
            } else if(stockIncludesVar == true) {
                console.log("Hit kommer vi, true")
                updateUserPossesion(user.uid, array)
                if(user.organization){
                    updateUserPossesionOrg(user.uid, array)
                    updateUserCurrencyOrg(user.uid, currencyNumber);
                }
            }
            checkHolding()
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
        console.log("Jag körs")
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

                // i = arr.length;
                return;
            }
        }
    }


    const SnapshotFirebase = (direction) => {
            let dataDB;
            let possessionDb = firebase.db.ref('users/' + user.uid + direction);
            possessionDb.on('value', (snapshot) => {
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
            let snapshot = SnapshotFirebase('/possessionStocks/array')
            let currency = SnapshotFirebase('/currency/currency')

            if (numOfStocks > holding || numOfStocks <= -1) {
                console.log('You cant sell more than you have');
                return;
            }
                let newCurrency;

                    // dispatch(setCurrency(newCurrency));

                    // let symbol = chosenShare[0].symbol;
                    // let index = Stocks.findIndex((x) => x.symbol === symbol);
                    // Stocks.splice(index, 1);
                    // dispatch(setStocks(Stocks));

                newCurrency = currency + chosenShare[0].regularMarketPrice * numOfStocks;

                sellStockFB(snapshot, chosenShare[0].symbol, numOfStocks)
                updateUserCurrency(user.uid, newCurrency);
                updateUserPossesion(user.uid, snapshot)
                if(user.organization){
                    updateUserPossesionOrg(user.uid, snapshot)
                    updateUserCurrencyOrg(user.uid, newCurrency);
                }

            checkHolding()
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
                    <div key={index}>
                        <h1>{item.shortName ? item.shortName : item.name}</h1>
                        <div className="followWrapper">
                            <label>watch</label>
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
