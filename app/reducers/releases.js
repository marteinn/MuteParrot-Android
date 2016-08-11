import {REQUEST_RELEASES, RECEIVE_RELEASES} from '../actions/releases';

function releases(state={}, action) {
    switch(action.type) {
        case RECEIVE_RELEASES:
            let formattedReleases = {};
            action.releases.map((item) => {
                formattedReleases[item.slug] = item;
            });
            return Object.assign({}, state, formattedReleases);

        default:
            return state;
    }
}


export default releases;
