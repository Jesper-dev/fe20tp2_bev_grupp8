import RecommendationReducer from './RecommendationReducer.js';
import ChosenShare from './ChosenShare';
import Following from './Following.js';
import FollowingCrypto from './FollowingCrypto';
import Currency from './Currency.js';
import Stocks from './Stocks';
import ChosenCrypto from './ChosenCrypto';
import SeeRecommendations from './SeeRecommendations';
import SeeFollowing from './SeeFollowing';
import SeeNews from './SeeNews';

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    RecommendationReducer,
    ChosenShare,
    ChosenCrypto,
    Following,
    FollowingCrypto,
    Currency,
    Stocks,
    SeeRecommendations,
    SeeFollowing,
    SeeNews,
});

export default allReducers;
