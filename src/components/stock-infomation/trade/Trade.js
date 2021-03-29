import React, { useState, useEffect, useContext } from 'react'
import { useSelector } from 'react-redux';
import 'firebase/database';
import { FirebaseContext } from '../../firebase/context';
import { SearchBarElement } from '../../shared/search-bar/SearchBarElements';

const Trade = () => {

    const user = JSON.parse(localStorage.getItem('authUser'));

    const [sell, setSell] = useState(false);
    const [numOfStocks, setNumOfStocks] = useState(0);
    const [clickedStock, setClickedStock] = useState({});
    const [stockIncludes, setStockIncludes] = useState(false)
    const [buy, setBuy] = useState(false);
    const [holding, setHolding] = useState(0);

    const [userData, setUserData] = useState({})
    /* let userDataVariable = {} */


    const chosenShare = useSelector((state) => state.ChosenShare);
    const firebase = useContext(FirebaseContext);

    useEffect(() => {
            firebase.user(user.uid).on('value', (snapshot) => {
                const data = snapshot.val()
                if(!data) return;
                setUserData(data)

                console.log(userData.currency)
                // console.log(data)
                // if (typeof data === "undefined" || data === null) {
                //     setUserData({})
                // } else {
                //     setUserData(data)
                // }
            })


    }, [])


/*     console.log(userData.currency.currency) */

    const onButtonClick = (e) => {
        console.log("Hej")
        if (e.target.innerText == 'BUY') {
            console.log("Inner text is buy")
            onBuy(numOfStocks);
        } else if (e.target.innerText == 'SELL') {
            onSell(numOfStocks);
        }
    };

    //*Checks if clicked stock has been bought before and if true display how many
    // const checkHolding = async () => {
    //     await firebase.user(user.uid).child('/possessionStocks/array').on('value', (snapshot) => {
    //         let dataDB = snapshot.val()
    //         if(dataDB == undefined) return;
    //         dataDB.forEach(item => {
    //             if (item.symbol === chosenShare[0].symbol) {
    //                 setHolding(item.amount)
    //                 // setClickedStock(item);
    //             }
    //         });
    //     })
    // };

    const addToRecentlyBought = (objc) => {
        firebase.organization(user.organization).child('/recentlyBought/').update({
            objc
        })
    }

    const updateUserCurrency = (buy, currency1, currency2, number ) => {
        let currency = 0;
        let num = parseInt(number)
        if(buy === true) {
            currency = currency1 - currency2.toFixed(2) * num;
        }

        firebase.user(user.uid).child('/currency').set({
            currency
        })
    }

    let stockIncludesVar = false
    const onBuy = (numOfStocks) => {

        if (buy === false) {
            setBuy(true);
            setSell(false);
        } else if (buy === true) {
            firebase.user(user.uid).on('value', (snapshot) => {
                let data = snapshot.val()
                if(data == null) return
                let currency = data.currency;
                updateUserCurrency(true, currency, chosenShare[0].regularMarketPrice, numOfStocks)
                console.log('Userdata :', data)
            })

            // if (newCurrency <= 0) {
            //     alert('Insufficient funds')
            //     return;
            // }
            // checkIfStockIncludes(array, chosenShare[0].symbol, numOfStocks)

            // dispatch(setCurrency(newCurrency));
            // let currencyFixed = newCurrency.toFixed(2)
            // let currencyNumber = parseInt(currencyFixed)


            // updateUserCurrency(user.uid, currencyNumber, false);
            // if(stockIncludesVar == false ){
            //     let amountOfStocks = parseInt(numOfStocks)
            //     let percent = parseInt(chosenShare[0].regularMarketChangePercent ? chosenShare[0].regularMarketChangePercent : chosenShare[0].regMarketChangePercent)
            //     let price = parseInt(chosenShare[0].regularMarketPrice ? chosenShare[0].regularMarketPrice : chosenShare[0].price)
            //     const stockObj = {
            //         name: chosenShare[0].shortName ? chosenShare[0].shortName : chosenShare[0].name,
            //         symbol: chosenShare[0].symbol ? chosenShare[0].symbol : '',
            //         price: price,
            //         amount: amountOfStocks,
            //         region: chosenShare[0].region,
            //         regMarketChangePercent: percent
            //     }
            //     array.push(stockObj)
            //     updateUserDB(user.uid, array, '/possessionStocks', false )
            // if(user.organization){
            //     updateUserDB(user.uid, array, '/possessionStocks', true )
            //     updateUserCurrency(user.uid, currencyNumber, true);
            // }
            // } else if(stockIncludesVar == true) {
            //     updateUserDB(user.uid, array, '/possessionStocks', false )
            //     if(user.organization){
            //         updateUserDB(user.uid, array, '/possessionStocks', true )
            //         updateUserCurrency(user.uid, currencyNumber, true);
            //     }
            // }

            // const recentlyBoughtObjc = {
            //     amount: numOfStocks,
            //     symbol: chosenShare[0].symbol ? chosenShare[0].symbol : '',
            //     user: user.username
            // }

            // // addToRecentlyBought(recentlyBoughtObjc)
            // // checkHolding()
            // setNumOfStocks(0);
            // setBuy(false);
            // setStockIncludes(false)
        }
    };

    //*When we sell a stock
    const onSell = (numOfStocks) => {
      /*   if (sell === false) {
            setSell(true);
            setBuy(false);
        } else if (sell === true) {
            let snapshot = snapshotFirebase('/possessionStocks/array')
            let currency = snapshotFirebase('/currency')

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
        } */

    };

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
        }
    }

    console.log(userData)
    return (
        <SearchBarElement>
            {/* <p>{userData ? userData : ''}</p> */}
       {/*      <span>Wallet { userData }</span> */}
            <input type="number" />
            <div className="buttonWrapper">
                <button
                    className="buy-sell-btn"
                    style={{
                        backgroundColor: 'var(--primary)',
                        color: 'white',
                    }}
                    onClick={onButtonClick}
                >
                    BUY
                </button>

                <input
                    type="number"
                    style={buy ? { display: 'block' } : { display: 'none' }}
                    onChange={(e) => setNumOfStocks(e.target.value)}
                />
                <input
                    type="number"
                    style={sell ? { display: 'block' } : { display: 'none' }}
                    onChange={(e) => console.log(e.target.value)}
                />
                <button
                    className="buy-sell-btn"
                    style={{
                        background: 'none',
                        borderColor: 'var(--primary)',
                        color: 'var(--primary)',
                    }}
                    onClick={onButtonClick}
                >
                    SELL
                </button>
            </div>
        </SearchBarElement>
    );
}

export default Trade