import {combineReducers} from 'redux';
import releases from './releases';
import releasesByCategory from './releasesByCategory';

const rootReducer = combineReducers({
    releases,
    releasesByCategory
});

export default rootReducer;
