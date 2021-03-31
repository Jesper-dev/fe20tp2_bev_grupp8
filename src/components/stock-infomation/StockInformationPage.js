import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import LineChart from '../charts/InfopageLinechart';
import { useSelector } from 'react-redux';
import 'firebase/database';
import { FirebaseContext } from '../firebase/context';
import BackButton from '../shared/button/back-button/BackButton';

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

    const [stockData, setStockData] = useState({})
    const [loading, setLoading] = useState(true);
    const [didMount, setDidMount] = useState(false);
    const [stockIncludes, setStockIncludes] = useState(false)

    const firebase = useContext(FirebaseContext);
    const { id } = useParams();

    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        setDidMount(true);

    /* const options = {
      method: 'GET',
      url: 'https://alpha-vantage.p.rapidapi.com/query',
      params: { function: 'GLOBAL_QUOTE', symbol: id },
      headers: {
          'x-rapidapi-key':
              '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
          'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
      },
    };

        axios
      .request(options)
      .then(function (response) {
          console.log(response.data);
      })
      .catch(function (error) {
          console.error(error);
      }); */

    //     const options = {
    //       method: 'GET',
    //       url: 'https://apidojo-yahoo-finance-v1.p.rapidapi.com/stock/v2/get-summary',
    //       params: { symbol: id, region: 'US' },
    //       headers: {
    //           'x-rapidapi-key':
    //               '70d9b752c8mshe5814dbaa3e86c2p180291jsn0d7793015c2f',
    //           'x-rapidapi-host': 'apidojo-yahoo-finance-v1.p.rapidapi.com',
    //       },
    //   };


    //   (async () => {
    //     await axios.request(options)
    //     .then((response) => {
    //         setStockData(response.data);
    //         setLoading(false);
    //     })
    //     .catch(function (error) {
    //         console.error(error);
    //     });
    //   })()

    setLoading(false);

       //*Gets the data for following stocks
    firebase
        .user(user.uid)
        .child('/followingStocks/array')
        .on('value', (snapshot) => {
            const data = snapshot.val();
            if (!data) return;

                // data.forEach((item) => {
                //     if (item.symbol === chosenShare[0].symbol) {
                //         setChecked(true);
                //     } else if (!item.symbol === chosenShare[0].symbol) {
                //         setChecked(false);
                //     }
                // });

         });

         return () => {
            setDidMount(false);
          };
    }, [didMount]);

    const checkIfFollowed = () => {
        let stocks = []
        firebase.user(user.uid).child('/followingStocks').once('value', (snapshot) => {
            const data = snapshot.val()

            for (const key in data) {
                stocks.push({ ...data[key] });
            }
            console.log(stocks)
            stocks.forEach((item) => {
                if(item.symbol === 'test') {
                    setStockIncludes(true)
                    return;
                } else {
                    setStockIncludes(false)
                }
            })
        })
    }

    //*When you follow a stock
    const onFollow = () => {
        console.log("hej")
        checkIfFollowed()

        if(stockIncludes === true) {
            firebase.user(user.uid).child('/followingStocks/test').remove()
        } else {
            firebase.user(user.uid).child('/followingStocks').update({
                test: {
                    symbol: 'test',
                    regularMarketPrice: 20,
                    regularMarketChangePercent: 20,
                    shortName: 'test',
                }
            })
        }
        // firebase.user(user.uid).child('/followingStocks').update({
        //     [stockData.symbol]: {
        //         symbol: stockData.symbol,
        //         regularMarketPrice: chosenShare[0].regularMarketPrice,
        //         regularMarketChangePercent: stockData.price.regularMarketChangePercent.fmt,
        //         shortName: stockData.quoteType.shortName ? stockData.quoteType.shortName : stockData.quoteType.longName,
        //     }
        // })


    }



    const onChange = () => setChecked(!checked);


    return (
        <>
        {loading ? (
            <p>Loading...</p>
        ) : (
            <ContentWrapper>
            <BackButton />
                    <div className="stockinfo-map-wrapper">
                        {/* <h1>
                            {stockData.quoteType.shortName
                                ? stockData.quoteType.shortName
                                : stockData.quoteType.longName}
                        </h1> */}
                        <div className="chart-topbar-wrapper">
                            <TradeBtns to="/trade">TRADE</TradeBtns>
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
                            {/* <p>{stockData.symbol}</p> */}
                      {/*       <p>
                                Market price:{' '}
                                {item.regularMarketPrice
                                    ? item.regularMarketPrice
                                    : 200}{' '}
                                $
                            </p> */}
                       {/*      <p>
                                Reg market change:{' '}
                                {item.regularMarketChange
                                    ? item.regularMarketChange.toFixed(2)
                                    : 200}
                                %
                            </p> */}
                            {/* <p>
                                Market change percent:{' '}
                                {stockData.price.regularMarketChangePercent.raw
                                    ? stockData.price.regularMarketChangePercent.fmt
                                    : 2}
                            </p>
                            <p>
                                {stockData.summaryProfile.longBusinessSummary}
                            </p> */}
                                {/*  <p className="holds-in-share">Your holding in this share is: {clickedStock.amount ? clickedStock.amount : 0}</p> */}
                        </div>
                    </div>

        </ContentWrapper>
        )}

        </>
        // <ContentWrapper>
        //     <BackButton />
        //     {chosenShare.map((item, index) => {
        //         return (
        //             <div className="stockinfo-map-wrapper" key={index}>
        //                 <h1>{item.shortName ? item.shortName : item.name}</h1>
        //                 <div className="chart-topbar-wrapper">
        //                     <TradeBtns to="/trade">TRADE</TradeBtns>
        //                     <WatchStockButton
        //                         eyecolor={
        //                             checked
        //                                 ? 'var(--secondary)'
        //                                 : 'var(--body-fourth)'
        //                         }
        //                         onClick={onFollow}
        //                         onChange={onChange}
        //                     >
        //                         <i className="far fa-eye"></i>
        //                     </WatchStockButton>
        //                 </div>

        //                 <LineChart />

        //                 <div className="informationContainer">
        //                     <p>{item.symbol}</p>
        //                     <p>
        //                         Market price:{' '}
        //                         {item.regularMarketPrice
        //                             ? item.regularMarketPrice
        //                             : 200}{' '}
        //                         $
        //                     </p>
        //                     <p>
        //                         Reg market change:{' '}
        //                         {item.regularMarketChange
        //                             ? item.regularMarketChange.toFixed(2)
        //                             : 200}
        //                         %
        //                     </p>
        //                     <p>
        //                         Market change percent:{' '}
        //                         {item.regularMarketChangePercent
        //                             ? item.regularMarketChangePercent.toFixed(2)
        //                             : 2}
        //                         %
        //                     </p>
        //                     {/*      <p className="holds-in-share">Your holding in this share is: {clickedStock.amount ? clickedStock.amount : 0}</p> */}
        //                 </div>
        //             </div>
        //         );
        //     })}
        // </ContentWrapper>

    );
};

export default StockInformationPage;
