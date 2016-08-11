import {combineReducers} from 'redux';
import releases from './releases';
import releasesByCategory from './releasesByCategory';
import favorites from './favorites';
import visited from './visited';

const rootReducer = combineReducers({
    releases,
    releasesByCategory,
    favorites,
    visited
});

export default rootReducer;
