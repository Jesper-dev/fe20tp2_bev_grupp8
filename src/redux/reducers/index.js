import RecommendationReducer from './RecommendationReducer.js';
import ChosenShare from './ChosenShare'
import Following from './Following.js'

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    RecommendationReducer,
    ChosenShare,
    Following
});

export default allReducers;
