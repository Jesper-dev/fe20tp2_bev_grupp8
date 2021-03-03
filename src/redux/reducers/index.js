import RecommendationReducer from './RecommendationReducer.js';
import ChosenShare from './ChosenShare'

import { combineReducers } from 'redux';

const allReducers = combineReducers({
    RecommendationReducer,
    ChosenShare
});

export default allReducers;
