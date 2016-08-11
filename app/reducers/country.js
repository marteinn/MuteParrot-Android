import {REQUEST_COUNTRY, RECEIVE_COUNTRY} from '../actions/country';

function country(state={code: null}, action) {
    switch(action.type) {
        case RECEIVE_COUNTRY:
            console.log(action);
            return {
                code: action.code,
            };

        default:
            return state;
    }
}


export default country;