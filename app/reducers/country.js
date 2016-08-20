import {
    WRITE_COUNTRY,
    REQUEST_COUNTRY,
    RECEIVE_COUNTRY
} from '../actions/country';

function country(state={code: null}, action) {
    switch(action.type) {
        case WRITE_COUNTRY:
        case RECEIVE_COUNTRY:
            return {
                code: action.code,
            };

        default:
            return state;
    }
}


export default country;
