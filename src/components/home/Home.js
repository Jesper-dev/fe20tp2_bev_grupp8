import React, { useEffect, useContext, useState } from 'react';
// import StockCard from '../shared/card/stock-card/StockCard';

import { MainWrapper } from './HomeElements';

import ContentWrapper from '../shared/wrappers/ContentWrapper';

// import Recommendations from '../../api/recommendations/Recommendations';
import WatchingStocks from '../shared/custom-sections/WatchingStocks';
import WatchingCrypto from '../shared/custom-sections/WatchingCrypto';
import RecommendationHome from '../shared/custom-sections/Recommendation';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';

import MostBougthStocks from '../shared/custom-sections/MostBoughtStocks';
import MostBougthCrypto from '../shared/custom-sections/MostBoughtCrypto';
// import Mock from '../../api/Mock/Mock.json';
import MockData from '../../api/Mock/MockData.json';
// import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import News from '../shared/custom-sections/NewsCardSection';
import MockNewsList from '../../api/Mock/MockNewsList.json';
import { withAuthorization } from '../session'; //must be logged in to see content

//import { useSelector } from 'react-redux';
/* import firebase from 'firebase' */
import { FirebaseContext } from '../firebase/context';
import { snapshotUserpath } from '../shared/functions/firebase-functions';

import {
    setCryptoPossession,
    setStockPossession,
    setFollowingCrypto,
    setCurrency,
} from '../../redux/actions';
import { useDispatch } from 'react-redux';

import FetchUserAssets from '../../api//user-api-components/FetchUserAssets';
import { setOrgColor } from '../shared/functions/colorTheme';

const Home = () => {
    const [totalCurrency, setTotalCurrency] = useState(0);
    const [followingArr, setFollowingArr] = useState([]);
    const [followingArrCrypto, setFollowingArrCrypto] = useState([]);
    const [stocksPossessionState, setStocksPossesionState] = useState([]);
    const [cryptoPossessionState, setCryptoPossesionState] = useState([]);

    const [rec, setRec] = useState(true);
    const [watchingCryptos, setWatchingCryptos] = useState(true);
    const [watchingSecuritys, setWatchingSecuritys] = useState(true);
    const [news, setNews] = useState(true);

    const dispatch = useDispatch();
    const [didMount, setDidMount] = useState(false);
    const [loading, setLoading] = useState(true);

    const firebase = useContext(FirebaseContext);
    const user = JSON.parse(localStorage.getItem('authUser'));

    const getFollowInfo = (dir, arr) => {
        firebase
            .user(user.uid)
            .child(dir)
            .once('value', (snapshot) => {
                let data = snapshot.val();
                for (const key in data) {
                    arr.push({ ...data[key] });
                }
                return arr;
            });
    };

    const getUserSettings = () => {
        firebase
            .user(user.uid)
            .child('/userSettings/settings')
            .once('value', (snapshot) => {
                const data = snapshot.val();
                data.watchingCryptos
                    ? setWatchingCryptos(true)
                    : setWatchingCryptos(false);
                data.watchingSecuritys
                    ? setWatchingSecuritys(true)
                    : setWatchingSecuritys(false);
                data.news ? setNews(true) : setNews(false);
                data.recommended ? setRec(true) : setRec(false);
            });
    };

    useEffect(() => {
        setDidMount(true);
        getUserSettings();
        let followingStocksList = [];
        let followingCryptoList = [];
        let currencyData;
        getFollowInfo('/followingStocks', followingStocksList);
        dispatch(setFollowingCrypto(followingCryptoList));
        getFollowInfo('/followingCrypto', followingCryptoList);
        setFollowingArr(followingStocksList);
        setFollowingArrCrypto(followingCryptoList);

        let stocksPossession = [];
        let cryptoPossession = [];

        getFollowInfo('/possessionStocks', stocksPossession);
        getFollowInfo('/possessionCrypto', cryptoPossession);

        dispatch(setCryptoPossession(cryptoPossession));
        dispatch(setStockPossession(stocksPossession));
        setStocksPossesionState(stocksPossession);
        setCryptoPossesionState(cryptoPossession);

        if (user && user.organization) {
            setOrgColor(firebase, user);
        }

        firebase
            .user(user.uid)
            .child('/currency')
            .once('value', (snapshot) => {
                currencyData = snapshot.val();
                if (currencyData == null) {
                    return;
                }
                setTotalCurrency(currencyData.currency);
                dispatch(setCurrency(currencyData)); //behöver
                console.log(currencyData.currency);
            });

        setLoading(false);

        return () => {
            setDidMount(false);
        };
    }, [didMount, dispatch, firebase, user.uid]); //changed!

    return (
        <>
            <FetchUserAssets
                stocksPossessionState={stocksPossessionState}
                cryptoPossessionState={cryptoPossessionState}
                currency={totalCurrency}
            />

            <ContentWrapper>
                <MainWrapper>
                    <section>
                        <PortfolioOverview total={totalCurrency} />
                    </section>
                    <MostBougthCrypto />
                    <MostBougthStocks />

                    {news ? (
                        <News
                            News
                            array={MockNewsList.items.result.slice(0, 1)}
                        />
                    ) : (
                        ''
                    )}
                    {watchingCryptos ? (
                        <WatchingCrypto
                            gap="0.5rem"
                            cryptoList={followingArrCrypto.slice(0, 3)}
                        />
                    ) : (
                        ''
                    )}
                    {watchingSecuritys ? (
                        <WatchingStocks
                            stockscardsmall={false}
                            gap="0.5rem"
                            array={followingArr}
                        />
                    ) : null}

                    {rec ? (
                        <RecommendationHome gap="0.5rem" MockData={MockData} />
                    ) : (
                        ''
                    )}
                </MainWrapper>
            </ContentWrapper>
        </>
    );
};

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Home); //check to see if you are signed in
