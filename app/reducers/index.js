import {combineReducers} from 'redux';
import releases from './releases';
import releasesByCategory from './releasesByCategory';
import favorites from './favorites';
import visited from './visited';
import country from './country';

const rootReducer = combineReducers({
    releases,
    releasesByCategory,
    favorites,
    visited,
    country,
});

export default rootReducer;
