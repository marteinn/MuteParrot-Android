import {REQUEST_COUNTRIES, RECEIVE_COUNTRIES} from '../actions/countries';

function countries(state=[], action) {
    switch(action.type) {
        case RECEIVE_COUNTRIES:
            return action.countries;

        default:
            return state;
    }
}


export default countries
