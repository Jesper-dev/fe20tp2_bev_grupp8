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
import ProfileImgReducer from './ProfileImgReducer';
import OrgLogoReducer from './OrgLogoReducer';
import Users from './Users';
import FilteredUsers from './FilteredUsers';
import OrganizationData from './OrganizationData';
import Searching from './Searching';
import PossessionCrypto from './PossessionCrypto';
import PossessionStocks from './PossessionStocks';
import FetchedCryptoValues from './FetchedCryptoValues';
import FetchedStockValues from './FetchedStockValues';

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
    OrgLogoReducer,
    Users,
    FilteredUsers,
    OrganizationData,
    Searching,
    PossessionCrypto,
    PossessionStocks,
    FetchedCryptoValues,
    FetchedStockValues,
    ProfileImgReducer,
});

export default allReducers;
