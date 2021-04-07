import React, { useEffect, useContext, useState } from 'react';
// import StockCard from '../shared/card/stock-card/StockCard';

import { MainWrapper } from './HomeElements';

import ContentWrapper from '../shared/wrappers/ContentWrapper';

// import Recommendations from '../../api/recommendations/Recommendations';
import WatchingStocks from '../shared/custom-sections/WatchingStocks';
import WatchingCrypto from '../shared/custom-sections/WatchingCrypto';
import RecommendationHome from '../shared/custom-sections/Recommendation';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';
// import Mock from '../../api/Mock/Mock.json';
import MockData from '../../api/Mock/MockData.json';
// import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import News from '../shared/custom-sections/NewsCardSection';
import MockNewsList from '../../api/Mock/MockNewsList.json';
import { withAuthorization } from '../session'; //must be logged in to see content

//import { useSelector } from 'react-redux';
/* import firebase from 'firebase' */
import { FirebaseContext } from '../firebase/context';
import {
    setFollowing,
    setFollowingCrypto,
    setCurrency,
} from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Home = () => {
    const [totalCurrency, setTotalCurrency] = useState(0);
    const [followingArr, setFollowingArr] = useState([]);
    const [followingArrCrypto, setFollowingArrCrypto] = useState([]);

    const [rec, setRec] = useState(true);
    const [watching, setWatching] = useState(true);
    const [news, setNews] = useState(true);

    const dispatch = useDispatch();
    const [didMount, setDidMount] = useState(false);

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
                data.watching ? setWatching(true) : setWatching(false);
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
            });

        return () => {
            setDidMount(false);
        };
    }, [didMount, dispatch, firebase, user.uid]); //changed!

    return (
        <>
            <ContentWrapper>
                <MainWrapper>
                    <PortfolioOverview
                        total={totalCurrency.toLocaleString()}
                        difference={0}
                        percent={0}
                    />
                    {news ? (
                        <News
                            News
                            array={MockNewsList.items.result.slice(0, 1)}
                        />
                    ) : (
                        ''
                    )}
                    {watching ? (
                        <WatchingCrypto cryptoList={followingArrCrypto} />
                    ) : ''}
                    {watching ? <WatchingStocks array={followingArr} /> : null}

                    {rec ? <RecommendationHome MockData={MockData} /> : ''}
                </MainWrapper>
            </ContentWrapper>
        </>
    );
};

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Home); //check to see if you are signed in
