import RecommendationReducer from './RecommendationReducer.js';
import ChosenShare from './ChosenShare';
import Following from './Following.js';
import Currency from './Currency.js';
import Stocks from './Stocks'
import ChosenCrypto from "./ChosenCrypto"

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    RecommendationReducer,
    ChosenShare,
    ChosenCrypto,
    Following,
    Currency,
    Stocks,
});

export default allReducers;
