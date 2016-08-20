import {MARK_RELEASE_AS_VISITED} from '../actions/visited';

const visited = (state=[], action) => {
    switch(action.type) {
        case MARK_RELEASE_AS_VISITED:
            return [
                action.id,
                ...state
            ];

        default:
            return state;
    }
}

export default visited;
