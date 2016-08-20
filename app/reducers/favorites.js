import {
    TOGGLE_FAVORITE,
    ADD_FAVORITE,
    REMOVE_FAVORITE
} from '../actions/favorites';

const favorites = (state=[], action) => {
    switch(action.type) {
        case ADD_FAVORITE:
            return [
                action.id,
                ...state
            ];

        case REMOVE_FAVORITE:
            let index = state.indexOf(action.id);

            return [
                ...state.slice(0, index),
                ...state.slice(index+1)
            ];

        case TOGGLE_FAVORITE:
            let exists = state.includes(action.id);

            if (! exists) {
                return favorites(state, {
                    id: action.id,
                    type: ADD_FAVORITE,
                });
            } else {
                return favorites(state, {
                    id: action.id,
                    type: REMOVE_FAVORITE,
                });
            }

        default:
            return state;
    }
}

export default favorites;
