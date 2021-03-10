import React, { useState, useEffect } from 'react';
import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { setFollowing, setCurrency, setStocks } from '../../redux/actions';
import { useDispatch } from 'react-redux';

import { ContentWrapper } from './CryptoInformationPageElements';

let following = [];
let holdingArray = [];

const CryptoInformationPage = () => {
    // const [checked, setChecked] = useState(false);
    // const [buy, setBuy] = useState(false);
    // const [sell, setSell] = useState(false);
    // const [holding, setHolding] = useState(0)
    // const [numOfStocks, setNumOfStocks] = useState(0)
    // const dispatch = useDispatch();
    const chosenCrypto = useSelector((state) => state.ChosenCrypto);
    // const followingArr = useSelector((state) => state.Following);
    // const Currency = useSelector((state) => state.Currency);
    // const Stocks = useSelector((state) => state.Stocks)

    // useEffect(() => {
    //     if (followingArr.includes(chosenShare[0])) {
    //         setChecked(true);
    //     } else {
    //         setChecked(false);
    //     }
    //     holdingArray = []
    //     checkHolding()
    // }, []);

    // const checkHolding = () => {
    //     if(Stocks.includes(chosenShare[0])) {
    //         for(let i = 0; i < Stocks.length; i++){
    //             if(Stocks[i].symbol === chosenShare[0].symbol) {
    //                 holdingArray.push(i)
    //             }
    //         }
    //         setHolding(holdingArray.length)
    //     }
    // }

    // const onFollow = () => {
    //     if (followingArr.includes(chosenShare[0])) {
    //         let name = chosenShare[0].symbol;
    //         setChecked(false);
    //         let index = followingArr.findIndex((x) => x.symbol === name);
    //         followingArr.splice(index, 1);
    //         dispatch(setFollowing(followingArr));
    //     } else {
    //         following.push(chosenShare[0]);
    //         dispatch(setFollowing(following));
    //         setChecked(true);
    //     }
    // };
    // const onChange = (e) => {
    //     setChecked(!checked);
    // };

    // //*Function for when we buy a share
    // const onBuy = (numOfStocks) => {
    //     if(buy === false) {
    //         setBuy(true)
    //         setSell(false)
    //     } else if (buy === true) {

    //         let newCurrency = Currency - chosenShare[0].regularMarketPrice * numOfStocks;
    //         if (newCurrency < 0) {
    //             console.log("Insufficient funds");
    //             return;
    //         }
    //         dispatch(setCurrency(newCurrency));
    //         for(let i = 0; i < numOfStocks; i++) {
    //             Stocks.push(chosenShare[0])
    //         }
    //         dispatch(setStocks(Stocks));
    //         setBuy(false)
    //         setNumOfStocks(0)
    //     }
    // }

    // const onSell = (numOfStocks) => {
    //     if(sell === false){
    //         setSell(true)
    //         setBuy(false)
    //     } else if(sell === true){
    //         if(numOfStocks > holding) {
    //             console.log("You cant sell more than you have")
    //             return;
    //         }
    //         if(Stocks.includes(chosenShare[0])) {
    //             for(let i = 0; i < numOfStocks; i++) {
    //                 let newCurrency = Currency + chosenShare[0].regularMarketPrice * numOfStocks;
    //                 dispatch(setCurrency(newCurrency));
    //                 let symbol = chosenShare[0].symbol;
    //                 let index = Stocks.findIndex(x => x.symbol === symbol)
    //                 Stocks.splice(index, 1)
    //                 dispatch(setStocks(Stocks));
    //             }
    //         }
    //         setSell(false)
    //     }

    // }


    // const onButtonClick = (e) => {

    //     if(e.target.innerText === "BUY") {
    //         onBuy(numOfStocks)
    //     } else if(e.target.innerText === "SELL") {
    //         onSell(numOfStocks)
    //     }
    // };



    return (
        <ContentWrapper>
            {chosenCrypto.map((item, index) => {
                return (
                    <div key={index}>
                        <h1>{item.name}</h1>
                        <div className="imgWrapper">
                            <img src={item.image}/>
                        </div>
                        <div className="buttonWrapper">
                            <button
                                style={{ backgroundColor: 'green' }}
                                // onClick={onButtonClick}
                            >
                                BUY
                            </button>

                            <input
                                type="number"
                                // style={buy ? {display: "block"} : {display: "none"}}
                                // onChange={(e) => setNumOfStocks(e.target.value)}
                            />
                             <input
                                type="number"
                                // style={sell ? {display: "block"} : {display: "none"}}
                                // onChange={(e) => setNumOfStocks(e.target.value)}
                            />
                            <button
                                style={{ backgroundColor: 'red' }}
                                // onClick={onButtonClick}
                            >
                                SELL
                            </button>

                        </div>
                        <span>⭐</span>
                        <label>
                            <input
                                type="checkbox"
                                // onClick={onFollow}
                                // checked={checked}
                                // onChange={onChange}
                            />
                            FOLLOW {/* <span>FOLLOW</span> */}
                        </label>
                        <p>Current Price: {item.current_price}$</p>
                        <p>Total Volume: {item.total_volume.toLocaleString()}</p>
                        <p>Price Change 24h: {item.price_change_percentage_24h.toFixed(2)}%</p>
                        <p>Total Supply: {item.total_supply.toLocaleString()}</p>
                        <p>Market Cap Rank: {item.market_cap_rank}</p>
                    </div>
                )
            })}
        </ContentWrapper>
    );
};

export default CryptoInformationPage;
