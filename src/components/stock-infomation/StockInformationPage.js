import React, { useState, useEffect, useContext, useCallback } from 'react';
import LineChart from '../charts/InfopageLinechart';
import 'firebase/database';
import { FirebaseContext } from '../firebase/context';
import BackButton from '../shared/button/back-button/BackButton';
import {
    ContentWrapper,
    WatchStockButton,
    TradeBtns,
} from './StockInfromationElements';

const StockInformationPage = () => {
    const [checked, setChecked] = useState(false);
    //*Redux stuff :)
    const [
        loading,
        setLoading,
    ] = useState(true);
    const [didMount, setDidMount] = useState(false);
    const [stockIncludes, setStockIncludes] = useState(false);

    const firebase = useContext(FirebaseContext);
    //const { id } = useParams(); //remove?

    const user = JSON.parse(localStorage.getItem('authUser'));

    const checkIfFollowed = useCallback(() => {
        let stocks = [];
        firebase
            .user(user.uid)
            .child('/followingStocks')
            .once('value', (snapshot) => {
                const data = snapshot.val();

                for (const key in data) {
                    stocks.push({ ...data[key] });
                }
                stocks.forEach((item) => {
                    if (item.symbol === 'test') {
                        setStockIncludes(true);
                        setChecked(true);
                        return;
                    } else {
                        setStockIncludes(false);
                        setChecked(false);
                    }
                });
            });
    }, [firebase, user.uid]);

    useEffect(() => {
        setDidMount(true);
        checkIfFollowed();

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
        return () => {
            setDidMount(false);
        };
    }, [didMount, user.uid, firebase, checkIfFollowed]);

    //*When you follow a stock
    const onFollow = () => {
        checkIfFollowed();

        if (stockIncludes === true) {
            firebase.user(user.uid).child('/followingStocks/test').remove();
            if (user.organization) {
                firebase
                    .organization(user.organization)
                    .child(`/users/${user.uid}/followingStocks/test`)
                    .remove();
                setChecked(false)
            }
        } else {
            firebase
                .user(user.uid)
                .child('/followingStocks')
                .update({
                    test: {
                        symbol: 'test',
                        regularMarketPrice: 20,
                        regularMarketChangePercent: 20,
                        shortName: 'test',
                    },
                });
            if (user.organization) {
                firebase
                    .organization(user.organization)
                    .child(`/users/${user.uid}/followingStocks`)
                    .update({
                        test: {
                            symbol: 'test',
                            regularMarketPrice: 20,
                            regularMarketChangePercent: 20,
                            shortName: 'test',
                        },
                    });
            }

            setChecked(true)
        }
    };

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
    );
};

export default StockInformationPage;
