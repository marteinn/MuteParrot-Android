import {WRITE_SETTING} from '../actions/settings';

const visited = (state={
    firstOpening: true,
}, action) => {
    switch(action.type) {
        case WRITE_SETTING:
            return Object.assign({}, state, {
                [action.id]: action.value
            });

        default:
            return state;
    }
}

export default visited;
