import {combineReducers} from 'redux';
import releases from './releases';
import releasesByCategory from './releasesByCategory';
import favorites from './favorites';
import visited from './visited';
import country from './country';
import countries from './countries';
import settings from './settings';

const rootReducer = combineReducers({
    releases,
    releasesByCategory,
    favorites,
    visited,
    country,
    countries,
    settings,
});

export default rootReducer;
