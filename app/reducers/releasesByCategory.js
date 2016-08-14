import {
    REQUEST_RELEASES,
    RECEIVE_RELEASES,
    INVALIDATE_RELEASES
} from '../actions/releases';


function category(state={
    isFetching: false,
    lastUpdated: -1,
    next: null,
    ids: []
}, action) {
    switch(action.type) {
        case INVALIDATE_RELEASES:
            return Object.assign({}, state, {
                lastUpdated: -1,
                next: null,
                ids: [],
            })

        case REQUEST_RELEASES:
            return Object.assign({}, state, {
                isFetching: true
            })

        case RECEIVE_RELEASES:
            let ids = action.releases.map((item) => item.slug);

            return Object.assign({}, state, {
                isFetching: false,
                lastUpdated: action.receivedAt,
                next: action.meta.next,
                ids: state.ids.concat(ids)
            })

        default:
            return state;
    }
}

function releasesByCategory(state={
    latest: {
        isFetching: false,
        lastUpdated: -1,
        ids: [],
        next: null,
    },
    popular: {
        isFetching: false,
        lastUpdated: -1,
        ids: [],
        next: null,
    },
    editorial: {
        isFetching: false,
        lastUpdated: -1,
        ids: [],
        next: null,
    },
}, action) {
    switch(action.type) {
        case INVALIDATE_RELEASES:
        case REQUEST_RELEASES:
        case RECEIVE_RELEASES:
            return Object.assign({}, state, {
                [action.category]: category(state[action.category], action)
            });

        default:
            return state;
    }
}

export default releasesByCategory;
