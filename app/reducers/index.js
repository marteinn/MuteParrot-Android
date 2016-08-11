import {combineReducers} from 'redux';
import releases from './releases';
import releasesByCategory from './releasesByCategory';
import favorites from './favorites';

const rootReducer = combineReducers({
    releases,
    releasesByCategory,
    favorites
});

export default rootReducer;
