import React, { useEffect, useContext, useState } from 'react';
// import StockCard from '../shared/card/stock-card/StockCard';
import { ContentWrapper } from './HomeElements';
// import Recommendations from '../../api/recommendations/Recommendations';
import Following from '../shared/homepage-custom-sections/FollowingHome';
import RecommendationHome from '../shared/homepage-custom-sections/RecommendationHome';
import PortfolioOverview from '../shared/card/portfolio-overview/PortfolioOverviewCard';
// import Mock from '../../api/Mock/Mock.json';
import MockData from '../../api/Mock/MockData.json';
// import MockGetTickers from '../../api/Mock/MockGetTickers.json';
import News from '../shared/homepage-custom-sections/NewsCardSection';
import MockNewsList from '../../api/Mock/MockNewsList.json';
import { withAuthorization } from '../session'; //must be logged in to see content

//import { useSelector } from 'react-redux';
/* import firebase from 'firebase' */
import { FirebaseContext } from '../firebase/context';
import { setFollowing, setCurrency } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Home = () => {
    // const stocksList = useSelector((state) => state.RecommendationReducer);
    /*     const following = useSelector((state) => state.Following); */
    const [totalCurrency, setTotalCurrency] = useState(0);
    //const followingCrypto = useSelector((state) => state.FollowingCrypto); //remove?
    // const Currency = useSelector((state) => state.Currency);
    const firebase = useContext(FirebaseContext);
    const [followingArr, setFollowingArr] = useState([]);
    const [followingArrCrypto, setFollowingArrCrypto] = useState([]);
    const dispatch = useDispatch();

    // let array = MockGetTickers.finance.result[0].quotes;
    const user = JSON.parse(localStorage.getItem('authUser'));

    useEffect(() => {
        let followingDb = []; 
        let followingDbCrypto = [];
        let data;
        let dataCrypto;
        let currencyData;
        //* Gets a list of users in our database
        let stocks = firebase.db.ref(
            'users/' + user.uid + '/followingStocks/array'
        );
        if (stocks === null) {
            return;
        }

        stocks.on('value', (snapshot) => {
            data = snapshot.val();
            if (data == null) {
                return;
            }

            for (let i = 0; i < data; i++) {
                followingDb.push(data[i]);
            }
            data.forEach((item) => followingDb.push(item));
            setFollowingArr(followingDb);
            dispatch(setFollowing(followingDb));
        });

        let cryptos = firebase.db.ref( 'users/' + user.uid + '/followingCrypto/array');

        if (cryptos === null) {
            return;
        }

        cryptos.on('value', (snapshot) => {
            dataCrypto = snapshot.val();
            console.log(dataCrypto)
            if (dataCrypto == null) {
                return;
            }

            for (let i = 0; i < dataCrypto; i++) {
                followingDbCrypto.push(dataCrypto[i]);
            }
            dataCrypto.forEach((item) => followingDbCrypto.push(item));
            setFollowingArrCrypto(followingDbCrypto);
            // dispatch(setFollowing(followingDbCrypto));
        });

        firebase.user(user.uid).child('/currency').on('value', (snapshot) => {
            currencyData = snapshot.val();
            if (currencyData == null) {
                return;
            }
            setTotalCurrency(currencyData);
            dispatch(setCurrency(currencyData)); //behöver
        })
    }, []);

    return (
        <>
            <ContentWrapper>
                <PortfolioOverview
                    total={totalCurrency.toLocaleString()}
                    difference={0}
                    percent={0}
                />

                <News array={MockNewsList.items.result.slice(0, 1)} />

                <Following array={followingArr} cryptoList={followingArrCrypto} />
                <RecommendationHome MockData={MockData}  />
            </ContentWrapper>
            {/* <Recommendations /> */}
        </>
    );
};

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Home); //check to see if you are signed in
