import React, {useEffect, useContext, useState} from 'react';
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

import { useSelector } from 'react-redux';
import firebase from 'firebase'
import { FirebaseContext } from '../firebase/context'
import { setFollowing } from '../../redux/actions';
import { useDispatch } from 'react-redux';

const Home = () => {
    // const stocksList = useSelector((state) => state.RecommendationReducer);
    const following = useSelector((state) => state.Following);
    const followingCrypto = useSelector((state) => state.FollowingCrypto);
    const Currency = useSelector((state) => state.Currency);
    const firebase = useContext(FirebaseContext)
    const [followingArr, setFollowingArr] = useState([])
    const dispatch = useDispatch()

    // let array = MockGetTickers.finance.result[0].quotes;
    const user = JSON.parse(localStorage.getItem('authUser'))
    let followingDb = []
    let stocks = []
    useEffect(() => {
        followingDb = []
        let data;
        //* Gets a list of users in our database
        stocks = firebase.db.ref('users/' + user.uid + '/followingStocks/followingArr');
        if(stocks === null) {
            return;
        }

        stocks.on('value', (snapshot) => {
            data = snapshot.val();
            if(data == null) {
                return;
            }

            console.log(data)
            for(let i = 0; i < data; i++){
                followingDb.push(data[i])
            }
            data.forEach(item => followingDb.push(item))
            setFollowingArr(followingDb)
            dispatch(setFollowing(followingDb));
        });
    }, [])

    return (
        <>
            <ContentWrapper>
                <h2>PORTFOLIO</h2>
                <PortfolioOverview
                    total={Currency.toLocaleString()}
                    difference={0}
                    percent={0}
                />

                <News array={MockNewsList.items.result.slice(0, 1)} />

                <Following array={followingArr} cryptoList={followingCrypto} />
                <RecommendationHome MockData={MockData} />
            </ContentWrapper>
            {/* <Recommendations /> */}
        </>
    );
};

const condition = (authUser) => !!authUser; //if logged in is not true, send user to sign in page

export default withAuthorization(condition)(Home); //check to see if you are signed in
