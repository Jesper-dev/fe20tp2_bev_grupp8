import RecommendationReducer from './RecommendationReducer.js';
import ChosenShare from './ChosenShare';
import Following from './Following.js';
import Currency from './Currency.js';
import Stocks from './Stocks'

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    RecommendationReducer,
    ChosenShare,
    Following,
    Currency,
    Stocks
});

export default allReducers;
